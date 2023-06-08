const axios = require("axios");
const { Diet } = require("../db");
const { YOUR_API_KEY } = process.env;

const url2 = require("../data2");

const getAllDietsController = async () => {
  /* --------------------------- */

  /*
   * Using Api: *
   */

  /* const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`;
  const get = await axios.get(url);
  const data = get.data.results
    .map((element) => element.diets)
    .reduce((acc, val) => acc.concat(val), []);

  console.log(data);
  const uniqueValues = [...new Set(data)];
  console.log(uniqueValues);
  const formattedDietsArray = uniqueValues.map((diets) => {
    return { name: diets };
  });
  console.log(formattedDietsArray); */

  /* --------------------------- */
  /*
   * Using Stored data from Api: *
   */

  const formattedDietsArray = url2;

  /* --------------------------- */

  formattedDietsArray.forEach(async (element) => {
    const dietName = await Diet.findOrCreate({
      where: {
        name: element.name,
      },
    });
  });
  return Diet.findAll();
};

module.exports = {
  getAllDietsController,
};
