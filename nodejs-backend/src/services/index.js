const users = require("./users/users.service.js");
const sessions = require("./sessions/sessions.service.js");
const chatai = require("./chatai/chatai.service.js");
const config = require("./config/config.service.js");
const prompts = require("./prompts/prompts.service.js");
const userPromptsSaved = require("./userPromptsSaved/userPromptsSaved.service.js");
const samplePrompts = require("./samplePrompts/samplePrompts.service.js");
const refConfig = require("./refConfig/refConfig.service.js");
const refFaDocs = require("./refFaDocs/refFaDocs.service.js");
const refBanks = require("./refBanks/refBanks.service.js");
const refFacilities = require("./refFacilities/refFacilities.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(sessions);
  app.configure(chatai);
  app.configure(config);
  app.configure(prompts);
  app.configure(userPromptsSaved);
  app.configure(samplePrompts);
  app.configure(refConfig);
  app.configure(refFaDocs);
  app.configure(refBanks);
  app.configure(refFacilities);
  // ~cb-add-configure-service-name~
};
