
const app = require("./app");
const {PORT} = require("./config");
//const swaggerDocs = require('./utils/swagger');

app.listen(PORT, () => {
  console.log(`Serveur sur le port ${PORT}`);
});
//swaggerDocs(app, PORT)