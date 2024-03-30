const { RefBanks } = require('./refBanks.class');
const createModel = require('../../models/refBanks.model');
const hooks = require('./refBanks.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/refBanks', new RefBanks(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('refBanks');

  service.hooks(hooks);
};