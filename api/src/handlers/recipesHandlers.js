const {
  getRecipeById,
  getAllRecipesByName,
  getAllRecipes,
  updateRecipe,
} = require("../controllers/recipesControllers");
const { Recipe } = require("../db");

const { createRecipe } = require("../controllers/createRecipe");

/* 

*Paginacion*
const getRecipiesHandler = async (req, res) => {
  const { name, page, limit } = req.query;
  try {
    const results = name
      ? await getAllRecipesByName(name)
      : await getAllRecipes(page, limit);

    if (results.length === 0) {
      throw new Error("No recipes found");
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: "Error getRecipiesHandler" });
  }
}; */

const getRecipiesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const results = name
      ? await getAllRecipesByName(name)
      : await getAllRecipes();

    if (results.length === 0) {
      throw new Error("No recipes found");
    }
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: "Error getRecipiesHandler" });
  }
};

const getRecipiesHandlerId = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "db" : "api";
  try {
    const recipe = await getRecipeById(id, source);
    res.status(201).json(recipe);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error getRecipiesHandlerId", message: error.message });
  }
};

const postCreateRecipe = async (req, res) => {
  try {
    const newRecipe = await createRecipe(req.body);
    res.status(201).json(newRecipe);
  } catch (error) {
    console.log(req.body);
    res
      .status(400)
      .json({ error: "Error postRecipeHandler", message: error.message });
  }
};

const EndRecipeHandler = async (req, res) => {
  const { name } = req.query;

  try {
    const recipeToDelete = await Recipe.findOne({
      where: {
        name: name,
      },
    });

    if (!recipeToDelete) {
      throw new Error("Recipe not found");
    }

    await recipeToDelete.destroy();

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error deleting recipe", message: error.message });
  }
};

const UpdateRecipeHandler = async (req, res) => {
  try {
    const { id, name, summary, score, steps, diets, image } = req.body;

    if (!id) throw Error("Id must be provided");

    const recipe = updateRecipe(id, name, summary, score, steps, diets, image);

    if (recipe.error) throw Error(recipe.error);

    return res.status(200).json({ message: "Recipe updated successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error updating Recipe", message: error.message });
  }
};

module.exports = {
  getRecipiesHandler,
  getRecipiesHandlerId,
  postCreateRecipe,
  EndRecipeHandler,
  UpdateRecipeHandler,
};
