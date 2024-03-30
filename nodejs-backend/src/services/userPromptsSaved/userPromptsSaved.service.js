const { UserPromptsSaved } = require('./userPromptsSaved.class');
const createModel = require('../../models/userPromptsSaved.model');
const hooks = require('./userPromptsSaved.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"]
  };

  // Initialize our service with any options it requires
  app.use('/userPromptsSaved', new UserPromptsSaved(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('userPromptsSaved');

  service.hooks(hooks);
};