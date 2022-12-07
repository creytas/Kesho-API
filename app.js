const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const app = express();
const cors = require("cors");
const authRoute = require("./routes/login.route");
const attendanceRoute = require("./routes/attendance.routes");
const userRoute = require("./routes/user.route");
const matiereRoute = require("./routes/matiere.routes");
const produitRoute = require("./routes/produit.routes");
const operationRoute = require("./routes/operation.routes");
const routerReset = require("./routes/user.reset.route");
const anthropometriqueRoute = require("./routes/anthropometrique.route");
const patientRoute = require("./routes/patient.route");
const { getAllPatient } = require("./controllers/patient.controller");
const routeReporting = require("./routes/reporting");
const passport = require("passport");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Kesho Congo API's Library",
      version: "1.0.0",
      description: "This is the kesho congo's api documentation",
      contact: {
        name: "Randy BUHENDWA",
        email: "randy.buhendwa@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:7000/",
        description: "Local Server",
      },
      {
        url: "https://kesho-api.onrender.com/",
        description: "Online Server",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpecs = swaggerJsDoc(swaggerOptions);
const corsOptions = {
  //origin: "*",
  origin: ["http://localhost:3000", /.{5,6}\/\/kesho-cntes.{8,}/],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
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
  res.json({
    message:
      "Welcome on the Kesho Congo's API!!! Your connexion was successful!!!",
  });
});

// Only for test request
app.use(function (req, res, next) {
  console.log(req.method + " " + req.url + " HTTP/" + req.httpVersion);
  Object.keys(req.headers).forEach(function (field) {
    console.log(field + ": " + req.headers[field]);
  });

  next();
});

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpecs, { explorer: true })
);
app.use("/auth", authRoute);
app.use("/user/reset", routerReset);
app.use("/user", passport.authenticate("jwt", { session: false }), userRoute);

//Route Presence
app.use(
  "/presence",
  passport.authenticate("jwt", { session: false }),
  attendanceRoute
);

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

app.use(
  "/reporting",
  passport.authenticate("jwt", { session: false }),
  routeReporting
);
//Route Stock
app.use(
  "/matiere",
  passport.authenticate("jwt", { session: false }),
  matiereRoute
);
app.use(
  "/produit",
  passport.authenticate("jwt", { session: false }),
  produitRoute
);
app.use(
  "/operation",
  passport.authenticate("jwt", { session: false }),
  operationRoute
);

module.exports = app;
