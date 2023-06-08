require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;

/* const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/database`,
  {
    logging: false,
    native: false,
  }
); */

const sequelize = new Sequelize(DB_DEPLOY, {
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // You may need to set this to true depending on your setup
    },
  },
});

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

const { Recipe } = sequelize.models;
const { Diet } = sequelize.models;
console.log(sequelize.models);

Recipe.belongsToMany(Diet, { through: "recipediet" });
Diet.belongsToMany(Recipe, { through: "recipediet" });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};
