const server = require("./src/app.js");
const { fillGroups } = require("./src/Controlle/groupController.js");
const {
  fillTemperaments,
} = require("./src/Controlle/temperamentController.js");
const { fillCountries } = require("./src/Controlle/countryController.js");
const { conn } = require("./src/db.js");
const { fillBreeds } = require("./src/Controlle/breedController.js");
require("dotenv").config();
const { PORT } = process.env;

conn.sync({ force: true }).then(() => {
  console.log("Connected to the DataBase");

  fillTemperaments();
  fillGroups();
  fillCountries();
  fillBreeds();
  server.listen(PORT || 8080, () => {
    console.log(`listening at port: ${PORT}`);
  });
});
