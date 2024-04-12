module.exports = function (app) {
  const modelName = "user_profile";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;

  // Define the schema for user_profile
  const schema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, ref: "users" },
      uId: { type: String },
      provider: { type: String },
      imageUrl: { type: String },
    },
    {
      timestamps: true,
    },
  );

  // This is necessary to avoid model compilation errors in watch mode
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }

  // Return the model for user_profile
  return mongooseClient.model(modelName, schema);
};
