    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'userPromptsSaved';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   chataiid: { type: Schema.Types.ObjectId, ref: "chatai" },
       saveduserid: { type: Schema.Types.ObjectId, ref: "users", required: true },
       configid: { type: Schema.Types.ObjectId, ref: "config", required: true },
       prompt: { type: String, required: true, unique: false, lowercase: false, default: '' },
       others: { type: String, unique: false, lowercase: false, default: '' },

            
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