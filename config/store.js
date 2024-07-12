const config = {
    dbUrl: process.env.DBURL || "mongodb://localhost/store-db",
    port: process.env.PORT || 2000,
    env: process.env.NODE_ENV || "development",
    logDir: process.env.LOGDIR || "logs",
    viewEngine: process.env.VIEW_ENGINE || "html"
  };

  module.exports = config;
  