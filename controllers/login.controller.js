const { user, sequelize } = require("../models");
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    try {
      const result = await sequelize.transaction(async (t) => {
        const email = res.newMail,
          password = res.newPass;
        const userWithEmail = await user.findOne({ where: { email } });
        if (!userWithEmail) {
          return res.status(400).json({ message: "L'utlisateur n'existe pas" });
        }
        const isPasswordValid = await compare(password, userWithEmail.password);

        if (!userWithEmail && !isPasswordValid) {
          return res
            .status(400)
            .json({ message: "Email and password does not valid" });
        } else if (userWithEmail && !isPasswordValid) {
          return res.status(400).json({ message: "Password not valid" });
        } else if (!userWithEmail && isPasswordValid) {
          return res.status(400).json({ message: "Email not valid" });
        } else {
          const jwtToken = jwt.sign(
            { id: userWithEmail.id, email: userWithEmail.email },
            process.env.JWT_SECRET,
            {
              expiresIn: 10, // 9 hours = 32400 //
            }
          );
          res.status(200).json({
            message: "Welcome Back!",
            token: jwtToken,
            name: `${userWithEmail.nom_user} ${userWithEmail.prenom_user}`,
            isAdmin: ` ${userWithEmail.is_admin}`,
            id_user: `${userWithEmail.id_user}`,
            status: `${userWithEmail.statut}`,
          });
        }
      });
    } catch (error) {}
  },
};
