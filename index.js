const server = require("./src/app.js");
const { fillGroups } = require("./src/controllers/groupController.js");
const {
  fillTemperaments,
} = require("./src/controllers/temperamentController.js");
const { fillCountries } = require("./src/controllers/countryController.js");
const { conn } = require("./src/db.js");
const { fillBreeds } = require("./src/controllers/breedController.js");
require("dotenv").config();
const { PORT } = process.env;

conn.sync({ force: false }).then(() => {
  console.log("Connected to the DataBase");

  // fillTemperaments();
  // fillGroups();
  // fillCountries();
  // fillBreeds();
  server.listen(PORT || 8080, () => {
    console.log(`listening at port: ${PORT}`);
  });
});
