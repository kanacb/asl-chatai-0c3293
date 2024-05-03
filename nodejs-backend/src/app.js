const path = require("path");
const favicon = require("serve-favicon");
const compress = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("./logger");

const feathers = require("@feathersjs/feathers");
const configuration = require("@feathersjs/configuration");
const express = require("@feathersjs/express");
const socketio = require("@feathersjs/socketio");
const middleware = require("./middleware");
const services = require("./services");
const appHooks = require("./app.hooks");
const channels = require("./channels");
const authentication = require("./authentication");
const mongoose = require("./mongoose");
const app = express(feathers());
const claude3Haiku = require("./routes/genAi/claude3Haiku");
const claude3sonnet = require("./routes/genAi/claude3sonnet");
const claude3Opus = require("./routes/genAi/claude3Opus");

// Load app socketio
app.configure(socketio());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(cors());
app.use(compress());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get("public"), "favicon.ico")));
// Host the public folder
app.use("/", express.static(app.get("public")));

// Set up Plugins and providers
app.configure(express.rest());

app.configure(mongoose);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);
// claude3haiku
app.post(
  "/claude3haiku",
  express.raw({ type: "application/json" }),
  claude3Haiku,
);
// claude3sonnet
app.post(
  "/claude3sonnet",
  express.raw({ type: "application/json" }),
  claude3sonnet,
);
// claude3Opus
app.post(
  "/claude3Opus",
  express.raw({ type: "application/json" }),
  claude3Opus,
);


// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
