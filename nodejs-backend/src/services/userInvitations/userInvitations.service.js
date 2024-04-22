const { UserInvitations } = require('./userInvitations.class');
const createModel = require('../../models/userInvitations.model');
const hooks = require('./userInvitations.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/userInvitations', new UserInvitations(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('userInvitations');

  service.hooks(hooks);
};