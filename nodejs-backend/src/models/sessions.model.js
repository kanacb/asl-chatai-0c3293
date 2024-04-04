module.exports = function (app) {
  const modelName = "sessions";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      loginSession: {
        type: String,
        required: true,
        unique: true,
        lowercase: false,
        default: "",
      },
      userid: { type: Schema.Types.ObjectId, ref: "users", required: true },

      createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
      updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
    },
    {
      timestamps: true,
    },
  );

  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
