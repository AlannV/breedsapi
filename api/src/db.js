require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const fs = require("fs");
const path = require("path");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, API_KEY } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false,
    native: false,
    dialect: API_KEY,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Breed, Country, Temperament, Group } = sequelize.models;

Breed.belongsToMany(Temperament, { through: "BreedTemperament" });
Temperament.belongsToMany(Breed, { through: "BreedTemperament" });
Breed.belongsToMany(Group, { through: "BreedGroup" });
Group.belongsToMany(Breed, { through: "BreedGroup" });
Breed.belongsToMany(Country, { through: "BreedCountry" });
Country.belongsToMany(Breed, { through: "BreedCountry" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
  Op,
};
