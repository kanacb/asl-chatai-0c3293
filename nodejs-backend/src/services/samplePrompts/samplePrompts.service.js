const { SamplePrompts } = require('./samplePrompts.class');
const createModel = require('../../models/samplePrompts.model');
const hooks = require('./samplePrompts.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/samplePrompts', new SamplePrompts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('samplePrompts');

  service.hooks(hooks);
};