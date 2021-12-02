const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const { user }= require("../models");

passport.use(
  new StrategyJwt(
    {
      // Ici nous creons une strategie nous demandons a passportjs d'aller extraire le TokenJwt
      // Qui ce trouve dans le header (le localstorage) de la requête Post Jwt sign in
      // et de verifier la clé secrètede notre variable environnement JWT_SECRET_KEY
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },

    // Ici JwtPayload contient des données des requetes post et get
    function (jwtPayload, done) {
      console.log("payload ", jwtPayload);
      // Ici nous allons chercher dans la base de données la clé primaire du user
       user.findOne({ where: { id: jwtPayload.id } })
        .then((user) => {
          // Ici nous vérifions que le user existe et nous le retournons
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
