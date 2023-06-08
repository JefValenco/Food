const { Diet, Recipe } = require("../db");

const createRecipe = async (body) => {
  const { name, summary, score, steps, diets, image } = body;

  const newRecipe = await Recipe.create({
    name: name,
    summary: summary,
    score: score,
    steps: JSON.stringify(steps),

    image: image,
  });

  const dietNames = Array.isArray(diets)
    ? diets
    : diets.split(",").map((diet) => diet.trim()); // Split the diets string if it's not an array
  const allDiets = await Diet.findAll({ where: { name: dietNames } }); // Find all diets with the given names
  await newRecipe.addDiet(allDiets);

  return newRecipe;
};

module.exports = {
  createRecipe,
};
