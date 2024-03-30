    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'prompts';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   sessionid: { type: String, unique: false, lowercase: false, default: '' },
       chataiid: { type: Schema.Types.ObjectId, ref: "chatai", required: true },
       configid: { type: Schema.Types.ObjectId, ref: "config", required: true },
       prompt: { type: String, unique: false, lowercase: false, default: '' },
       refDocs: { type: Array, required: false },
       responseText: { type: String, unique: false, lowercase: false, default: '' },
       systemId: { type: String, unique: false, lowercase: false, default: '' },
       type: { type: String, unique: false, lowercase: false, default: '' },
       role: { type: String, unique: false, lowercase: false, default: '' },
       model: { type: String, unique: false, lowercase: false, default: '' },
       stopReason: { type: String, unique: false, lowercase: false, default: '' },
       stopSequence: { type: String, unique: false, lowercase: false, default: '' },
       inputTokens: { type: Number },
       outputTokens: { type: Number },
       cost: { type: Number },
       status: { type: Boolean },
       error: { type: String, unique: false, lowercase: false, default: '' },

            
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