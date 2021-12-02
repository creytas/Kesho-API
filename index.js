const app = require("./app");
const {PORT} = require("./config")

app.listen(PORT, () => {
  console.log(`Serveur sur le port ${PORT}`);
});