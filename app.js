const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./routes/login.route");
const userRoute = require("./routes/user.route");
const routerReset = require("./routes/user.reset.route");
const anthropometriqueRoute = require("./routes/anthropometrique.route");
const patientRoute = require("./routes/patient.route");
const { getAllPatient } = require("./controllers/patient.controller");
const routeReporting = require("./routes/reporting");
const passport = require("passport");

const corsOptions = {
  origin: ["http://localhost:3000",  /.{5,6}\/\/kesho-congo-1-.{8,}/],
  credentials: true,
  optionSuccessStatus: 200,
};
const corsOptions1 = {
  origin: false,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};
// app.use(cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require("./auth/passport");

app.get("/", (req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});

// Only for test request
app.use(function (req, res, next) {
  console.log(req.method + " " + req.url + " HTTP/" + req.httpVersion);
  Object.keys(req.headers).forEach(function (field) {
    console.log(field + ": " + req.headers[field]);
  });

  next();
});

app.use("/auth", authRoute);
app.use("/user/reset", routerReset);
app.use("/user", passport.authenticate("jwt", { session: false }), userRoute);

app.use(
  "/anthropometrique",
  passport.authenticate("jwt", { session: false }),
  anthropometriqueRoute
);
app.use(
  "/patient",
  passport.authenticate("jwt", { session: false }),
  patientRoute
);

//Route Reporting

app.use("/reporting", routeReporting);

module.exports = app;
