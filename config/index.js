require("dotenv").config();

if (process.env.NODE_ENV.trim() === "development") {
  console.log("db local");
  module.exports = {
    PORT: process.env.PORTLOCAL,
    DB_HOST: process.env.DB_HOSTLOCAL,
    DB_USER: process.env.DB_USERLOCAL,
    DB_PASS: process.env.DB_PASSLOCAL,
    DB_NAME: process.env.DB_NAMELOCAL,
    DB_PORT: process.env.DB_PORTLOCAL,
    DB_CHARSET: process.env.DB_CHARSETLOCAL,
    DB_CONNECTION_LIMIT: process.env.DB_CONNECTION_LIMITLOCAL,
    DB_CONNECTION_TIMEOUT: process.env.DB_CONNECTION_TIMEOUTLOCAL,
  };
} else {
  console.log("db cloud");
  module.exports = {
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    DB_CHARSET: process.env.DB_CHARSET,
    DB_CONNECTION_LIMIT: process.env.DB_CONNECTION_LIMIT,
    DB_CONNECTION_TIMEOUT: process.env.DB_CONNECTION_TIMEOUT,
  };
}
