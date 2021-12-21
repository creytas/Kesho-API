const {
  DB_NAME,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_CONNECTION_TIMEOUT,
} = require("./index");
module.exports = {
  test: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      options: {
        requestTimeout: DB_CONNECTION_TIMEOUT,
      },
    },
  },
  production: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      options: {
        requestTimeout: DB_CONNECTION_TIMEOUT,
      },
    },
  },
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: "mysql",
    dialectOptions: {
      options: {
        requestTimeout: DB_CONNECTION_TIMEOUT,
      },
    },
  },
};
