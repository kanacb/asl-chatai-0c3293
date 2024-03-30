    // See http://mongoosejs.com/docs/models.html
    // for more of what you can do here.
    module.exports = function (app) {
        const modelName = 'refFaDocs';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
                   filename: { type: String, required: true, unique: false, lowercase: false, default: '' },
       bankId: { type: Schema.Types.ObjectId, ref: "refBanks", required: true },
       facilityid: { type: Schema.Types.ObjectId, ref: "refFacilities", required: true },
       startDate: { type: Date },
       endDate: { type: Date },
       version: { type: Number },
       s3Link: { type: String, required: false, unique: false, lowercase: false, default: '' },

            
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