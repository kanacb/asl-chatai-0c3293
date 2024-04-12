const { User_Profile } = require("./userProfile.class");
const createModel = require("../../models/usersProfile.model");
const hooks = require("./userProfile.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    whitelist: ["$populate"],
  };

  // Initialize our service with any options it requires
  app.use("/usersProfile", new User_Profile(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("usersProfile");

  service.hooks(hooks);
};
