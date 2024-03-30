    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'refConfig';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   chatAiId: { type: Schema.Types.ObjectId, ref: "chatai", required: true, unique: false },
       name: { type: String, unique: false, lowercase: false, default: '' },
       description: { type: String, unique: false, lowercase: false, default: '' },
       bedrockModelId: { type: String, unique: false, lowercase: false, default: '' },
       human: { type: String, unique: false, lowercase: false, default: '' },
       task: { type: String, unique: false, lowercase: false, default: '' },
       noCondition: { type: String, unique: false, lowercase: false, default: '' },
       yesCondition: { type: String, unique: false, lowercase: false, default: '' },
       format: { type: String, unique: false, lowercase: false, default: '' },
       example: { type: String, unique: false, lowercase: false, default: '' },
       preamble: { type: String, unique: false, lowercase: false, default: '' },

            
          },
          {
            timestamps: true
        });
      
        // This is necessary to avoid model compilation errors in watch mode
        // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };