const express = require("express");
const cors = require("cors");
const authenticateJWT = require("./authenticateJWT");

const env = process.env.NODE_ENV || "development";
const whitelist = ["https://innovtask.com"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

function setupMiddlewares(app) {
  if (env === "production") {
    app.use(cors(corsOptions));
  } else {
    app.use(cors());
  }

  app.use(express.json());
}

module.exports = {
  setupMiddlewares,
  authenticateJWT,
};
