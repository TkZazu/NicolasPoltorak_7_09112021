const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

const db = require("./models/index");
db.sequelize.sync({ force: false })
  .then(() => {
  console.log("Synchronisation de la base de données");
  });

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "images")));

require("./routes/user")(app);
require("./routes/post")(app);

module.exports = app;
