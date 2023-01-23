const server = require("./src/app.js");
const { fillGroups } = require("./src/controllers/groupController.js");
const {
  fillTemperaments,
} = require("./src/controllers/temperamentController.js");
const { fillCountries } = require("./src/controllers/countryController.js");
const { conn } = require("./src/db.js");
const { fillBreeds } = require("./src/Controllers/breedController.js");
require("dotenv").config();

conn.sync({ force: true }).then(() => {
  console.log("Connected to the DataBase");

  fillTemperaments();
  fillGroups();
  fillCountries();
  fillBreeds();
  server.listen(3001, () => {
    console.log("listening at port: 3001");
  });
});
