const { RefFacilities } = require("./refFacilities.class");
const createModel = require("../../models/refFacilities.model");
const hooks = require("./refFacilities.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    whitelist: ["$populate"],
  };

  // Initialize our service with any options it requires
  app.use("/refFacilities", new RefFacilities(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("refFacilities");

  service.hooks(hooks);
};
