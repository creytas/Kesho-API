const { user, sequelize } = require("../models");
const { compare } = require("bcrypt");
const sendgridMail = require("@sendgrid/mail");
sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const getAllUser = async (req, res) => {
  const userFindAll = await user.findAll({
    attributes: [
      "id",
      "id_user",
      "nom_user",
      "postnom_user",
      "prenom_user",
      "email",
      "sexe_user",
      "is_admin",
      "statut",
    ],
  });
  res.status(200).send(await userFindAll);
};
const getUserById = async (req, res) => {
  const { id } = res;
  const userOne = await user.findOne({
    where: { id: id },
    attributes: [
      "id",
      "id_user",
      "nom_user",
      "postnom_user",
      "prenom_user",
      "email",
      "statut",
      "sexe_user",
      "is_admin",
    ],
  });
  if (userOne) {
    return res.status(200).json(userOne);
  } else {
    return res.status(401).json({
      message: `Le personnel ayant l'identifiant ${id} est introuvable`,
    });
  }
};
const addUser = async (req, res) => {
  if (req.user.is_admin == true) {
    const result = await sequelize.transaction(async (t) => {
      try {
        const alreadyExistsUser = await user.findOne({
          where: { email: req.body.email },
        });
        if (!alreadyExistsUser) {
          const userCreate = await user.create(res);
          const from = `${process.env.SENDGRID_SENDER}`;
          const to = userCreate.email;
          const info = {
            to: to,
            from: from,
            subject: "Kesho Congo - Votre compte utilisateur",
            text: `${userCreate.nom_user} ${userCreate.prenom_user}`,
            html: `Bonjour ${userCreate.prenom_user}.<br/>
            Nous tenons à vous informer qu'un compte utilisateur vous a été attribué.<br/>
            Voici vos identifiants:<br/>
              <ul>
                 <li>
                   Email : <b>${userCreate.email}</b>
                 </li>
                 <li>
                   Password : <b>${res.password_brut}</b>
                 </li>
              </ul><br/>
              Connectez-vous <b><a href= "https://kesho-cntes.netlify.app" target="_blank" rel="noreferrer">ici</a></b><br/>
              Etant donné que ce sont là des informations sensibles, nous vous prions de bien les conserver.
            `,
          };
          const messageSent = await sendgridMail.send(info);
          if (messageSent) {
            return res.status(200).json({ message: "Thanks for registering" });
          }
        } else {
          return res
            .status(400)
            .json({ message: "User with email already exists!" });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ error: `Cannot register user at the moment! : ${error}` });
      }
    });
  } else {
    return res.status(400).send("Access denied. You are not an admin.");
  }
};
const deleteUser = async (req, res) => {
  if (req.user.is_admin !== true)
    return res.status(400).send("Access denied. You are not an admin.");
  try {
    const result = await sequelize.transaction(async (t) => {
      const { id } = res;
      const userFind = await user.findOne({ where: { id } });

      if (userFind) {
        const userDelete = await user.destroy({
          where: {
            id,
          },
        });
        return res.status(200).json({
          message: `${userFind.dataValues.nom_user} ${userFind.dataValues.postnom_user} est supprimé avec succès`,
        });
      } else {
        return res.status(400).json({
          message: `Le personnel ayant l'identifiant ${id} est introuvable`,
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      error: `${error}`,
    });
  }
};
const updateUser = async (req, res) => {
  console.log(`req.user.id = ${req.user.id} et res.id = ${res.id}`);
  if (req.user.id != res.id) {
    return res.status(400).send("Access denied. Can't update another user.");
  }
  const verifyPassword = await compare(res.old_password, req.user.password);
  if (!verifyPassword) {
    return res.status(400).send("password not correct");
  }

  try {
    const result = await sequelize.transaction(async (t) => {
      const { id, nom_user, postnom_user, prenom_user, password } = res;
      const userFind = await user.findOne({ where: { id } });
      if (userFind) {
        const userUpdate = await user.update(
          { nom_user, postnom_user, prenom_user, password },
          {
            where: {
              id,
            },
          }
        );
        return res.status(200).json({
          message: `Mise à jour effectuée avec succès ${userUpdate}`,
        });
      } else {
        return res.status(400).json({
          message: `Le personnel ayant l'identifiant ${id} est introuvable`,
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      message: `Impossible de mettre à jour ce personnel ${userFind.dataValues.nom_user} ${userFind.dataValues.postnom_user} ${Error}`,
    });
  }
};
const resetPassword = async (req, res) => {
  const { email } = res;
  const userFind = await user.findOne({
    where: { email: email },
  });
  if (userFind) {
    try {
      const result = await sequelize.transaction(async (t) => {
        const from = `${process.env.SENDGRID_SENDER}`;
        const to = userFind.email;
        // create reusable transporter object using the default SMTP transport
        // const transporter = nodemailer.createTransport({
        //   service: "gmail",
        //   auth: {
        //     //mail de l'entreprise
        //     user: process.env.MAILNAME || "hbbaye24@gmail.com", // ton mail
        //     pass: process.env.PASSMAIL || "@243Gmail@24@hb", // ton mot de passe
        //   },
        // });
        const password_generate = randomstring.generate(7);
        const info = {
          to: to,
          from: from,
          subject: "Kesho Congo - Reinitialisation de mot de passe",
          text: `${userFind.nom_user} ${userFind.prenom_user}`,
          html: `Bonjour ${userFind.prenom_user}.<br/>
          voici votre nouveau mot de passe : <b>${password_generate}</b><br/>
          Connectez-vous <b><a href= "https://kesho-cntes.netlify.app" target="_blank" rel="noreferrer">ici</a></b><br/>
          Etant donné que ce sont là des informations sensibles, nous vous prions de bien les conserver.
          `,
        };
        const messageSent = await sendgridMail.send(info);

        const passwordSent = await sendgridMail.send(info);
        if (passwordSent) {
          try {
            const result = await sequelize.transaction(async (t) => {
              const password = bcrypt.hashSync(password_generate, 10);
              if (userFind) {
                const userUpdate = await user.update(
                  { password },
                  {
                    where: {
                      id_user: userFind.id_user,
                    },
                  }
                );
                return res.status(200).json({
                  message: `Mise à jour effectuée avec succès`,
                  email: `${userFind.email}`,
                });
              } else {
                return res.status(400).json({
                  message: `Le personnel ayant l'identifiant ${id} est introuvable`,
                });
              }
            });
          } catch (error) {
            return res.status(400).json({
              error: `${error}`,
            });
          }
        }
      });
    } catch (error) {
      res.status(500).json({
        error: ` impossible de faire une mise pour ce personnel ${userFind.nom_user} ${userFind.prenom_user} => ${error}`,
      });
    }
  } else {
    res.status(400).json({
      error: `${email} ce compte n'existe pas`,
    });
  }
};
const updateStatusUser = async (req, res) => {
  const { id, statut } = res;
  console.log(statut);
  if (req.user.is_admin !== true) {
    return res.status(400).send("Access denied. Can't update another user.");
  }
  const userFind = await user.findOne({ where: { id: id } });
  try {
    const result = await sequelize.transaction(async (t) => {
      if (userFind) {
        const userUpdate = await user.update(
          { statut: statut },
          {
            where: {
              id: id,
            },
          }
        );
        return res.status(200).json({
          message: `Mise à jour de ${userFind.id} effectuée avec succès`,
        });
      } else {
        return res.status(400).json({
          message: `Le personnel ayant l'identifiant ${id} est introuvable`,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: `Impossible de mettre à jour ce personnel ${userFind.nom_user} ${userFind.postnom_user} ${Error}`,
    });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  resetPassword,
  updateStatusUser,
};
