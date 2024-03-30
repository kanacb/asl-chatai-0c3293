const { RefFaDocs } = require('./refFaDocs.class');
const createModel = require('../../models/refFaDocs.model');
const hooks = require('./refFaDocs.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/refFaDocs', new RefFaDocs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('refFaDocs');

  service.hooks(hooks);
};