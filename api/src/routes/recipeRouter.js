const { Router } = require("express");
const {
  getRecipiesHandler,
  getRecipiesHandlerId,
  postCreateRecipe,
  EndRecipeHandler,
  UpdateRecipeHandler,
} = require("../handlers/recipesHandlers");
const { postValidate } = require("../middlewares/postValidate");

const recipeRouter = Router();

recipeRouter
  .route("/")
  .get(getRecipiesHandler)
  .post(postValidate, postCreateRecipe)
  .delete(EndRecipeHandler)
  .put(UpdateRecipeHandler);

recipeRouter.get("/:id", getRecipiesHandlerId);

module.exports = recipeRouter;
