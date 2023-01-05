const Sequelize = require("sequelize");

const connection = new Sequelize("DB_NAME", "DB_USER", "DB_PASS", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00"
});

module.exports = connection;
