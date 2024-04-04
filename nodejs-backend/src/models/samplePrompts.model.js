module.exports = function (app) {
  const modelName = "samplePrompts";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      chatAiId: { type: Schema.Types.ObjectId, ref: "chatai", required: true },
      prompts: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        default: "",
      },

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
