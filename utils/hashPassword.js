const bcrypt = require("bcrypt");

const hashPassword = (Pass) => {
  return (async () => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(Pass, salt);
    return hash;
  })();
};
module.exports = hashPassword;
