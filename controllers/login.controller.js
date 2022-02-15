const { user, attendance, sequelize } = require("../models");
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const isToday = (date) => {
  const today = new Date();
  return (
    today.getDate() == date.getDate() &&
    today.getMonth() == date.getMonth() &&
    today.getFullYear() == date.getFullYear()
  );
};

module.exports = {
  login: async (req, res) => {
    const transaction = await sequelize.transaction();
    const email = res.newMail,
      password = res.newPass;
    const current_date = new Date();
    const late_date = new Date();
    late_date.setHours(8, 30, 59);
    const attendance_states =
      isToday(current_date) && current_date > late_date ? "R" : "P";
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
          const attendances = {
            date: current_date,
            user_id: userWithEmail.id,
            attendance_state: attendance_states,
          };
          const user_attendance = await attendance.create(attendances);

          const jwtToken = jwt.sign(
            { id: userWithEmail.id, email: userWithEmail.email },
            process.env.JWT_SECRET,
            {
              expiresIn: 32400, // 9 hours = 32400 //
            }
          );
          res.status(200).json({
            message: "Welcome Back!",
            token: jwtToken,
            name: `${userWithEmail.nom_user} ${userWithEmail.prenom_user}`,
            isAdmin: ` ${userWithEmail.is_admin}`,
            id_user: `${userWithEmail.id_user}`,
            id: `${userWithEmail.id}`,
            status: `${userWithEmail.statut}`,
            attendance: `${user_attendance.attendance_state}`,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
};
