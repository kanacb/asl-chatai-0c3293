module.exports = function (app) {
  const modelName = "user_invitations";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      email: { type: String, required: true, unique: true, lowercase: true },
      accepted: { type: Boolean, default : false },
      sentStatus: { type: Boolean, default : false },
      content: { type: String },
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
