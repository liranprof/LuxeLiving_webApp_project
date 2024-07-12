const config = {
    dbUrl: process.env.DBURL || "mongodb://localhost/password-db",
    port: process.env.PORT || 2001,
    env: process.env.NODE_ENV || "development",
    logDir: process.env.LOGDIR || "logs",
    viewEngine: process.env.VIEW_ENGINE || "html"
  };
  module.exports = config;