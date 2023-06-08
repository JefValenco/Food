const axios = require("axios");
const db = require("../db");
const { Diet, Recipe } = require("../db");
const { YOUR_API_KEY } = process.env;
const url = require("../data");
const { Op } = require("sequelize");

const cleanArray = (arr) =>
  arr.map((element) => {
    return {
      id: element.id,
      name: element.title,
      score: element.healthScore,
      summary: element.summary,
      diets: element.diets,

      steps: element.analyzedInstructions[0]?.steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
        };
      }),
      image: element.image,
      create: false,
    };
  });

const getAllRecipes = async () => {
  /* 
*paginacion *
const getAllRecipes = async (page, limit) => { */
  /* 
  const dataBaseRecipes = await Recipe.findAll(); */

  const dataDB = await Recipe.findAll({ include: Diet });

  const dataBaseRecipes = dataDB.map((element) => {
    const parsedSteps = JSON.parse(element.dataValues.steps);
    const steps = parsedSteps.map(({ number, step }) => ({
      number,
      step: step.replace(/\\/g, ""),
    }));
    const diets = element.dataValues.diets.map((diet) => diet.name);

    return {
      id: element.dataValues.id,
      name: element.dataValues.name,
      score: element.dataValues.score,
      summary: element.dataValues.summary,
      steps,
      diets,
      image: element.dataValues.image,
      create: true,
    };
  });
  /* --------------------------- */

  /*
   * Using Api: *
   */

  /*   const apiRecipesRaw = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100
      `
    )
  ).data.results; */

  /* --------------------------- */
  /*
   * Using Stored data from Api: *
   */

  const apiRecipesRaw = url;

  /* --------------------------- */

  /* 
  *paginacion *
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const apiRecipes = cleanArray(apiRecipesRaw);
  const dataAndApi = [...dataBaseRecipes, ...apiRecipes];
  const recipePage = dataAndApi.slice(startIndex, endIndex);

  return recipePage; */
  const apiRecipes = cleanArray(apiRecipesRaw);

  return [...dataBaseRecipes, ...apiRecipes];
};

const getAllRecipesByName = async (name) => {
  const dataBaseRecipes = await Recipe.findAll({ where: { name } });

  /* --------------------------- */

  /*
   * Using Api: *
   */

  /*  const apiRecipe = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
    )
  ).data.results; */

  /* --------------------------- */
  /*
   * Using Stored data from Api: *
   */

  const apiRecipe = url;

  /* --------------------------- */

  const apiRecipes = cleanArray(apiRecipe);
  const filterRecipe = apiRecipes.filter((r) =>
    r.name.toLowerCase().includes(name.toLowerCase())
  );

  return [...filterRecipe, ...dataBaseRecipes];
};

const getRecipeById = async (id, source) => {
  let recipe;

  if (source === "api") {
    /* --------------------------- */

    /*
     * Using Api: *
     */

    /*   const apiRecipesRaw = (
      await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
      )
    ).data.results; */

    /* --------------------------- */
    /*
     * Using Stored data from Api: *
     */

    const apiRecipesRaw = url;

    /* --------------------------- */

    const apiRecipes = cleanArray(apiRecipesRaw);
    recipe = apiRecipes.find((r) => r.id === Number(id)); // r.id voay a recorrer cada receta y voy a retornada cada receta dodne receta.id sea igual a id
  } else {
    recipe = await Recipe.findByPk(id, { include: Diet });
  }

  return recipe;
};

const updateRecipe = async (id, name, summary, score, steps, diets, image) => {
  const recipe = await getRecipeById(id);

  if (!recipe) return recipe;

  recipe.name = name || recipe.name;
  recipe.summary = summary || recipe.summary;
  recipe.score = score || recipe.score;
  recipe.steps =
    typeof steps === "string" ? steps : JSON.stringify(steps) || recipe.steps;

  recipe.diets = diets || recipe.diets;
  recipe.image = image || recipe.image;

  /*   if (diets) {
    const dietNames = Array.isArray(diets)
      ? diets
      : diets.split(",").map((diet) => diet.trim()); // Split the diets string if it's not an array
    const allDiets = await Diet.findAll({
      where: { name: { [Op.in]: dietNames } },
    });
    // Find all diets with the given names
    await recipe.addDiet(allDiets);
  } */

  if (diets) {
    const existingDiets = await recipe.getDiets();

    await recipe.removeDiets(existingDiets);

    const allDiets = await Diet.findAll({
      where: { name: diets },
    });

    await recipe.addDiets(allDiets);
  }

  await recipe.save(); // save the changes to the database

  return recipe;
};

module.exports = {
  /* createRecipe, */
  getRecipeById,
  getAllRecipes,
  getAllRecipesByName,
  updateRecipe,
};
