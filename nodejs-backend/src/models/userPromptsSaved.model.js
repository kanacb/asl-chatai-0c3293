module.exports = function (app) {
  const modelName = "userPromptsSaved";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      chatAiId: { type: Schema.Types.ObjectId, ref: "chatai" },
      saveduserid: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      configid: { type: Schema.Types.ObjectId, ref: "config", required: true },
      prompt: {
        type: String,
        required: true,
        unique: false,
        lowercase: false,
        default: "",
      },
      others: { type: String, unique: false, lowercase: false, default: "" },

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
