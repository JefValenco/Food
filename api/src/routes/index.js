const { Router } = require("express");
const recipeRouter = require("./recipeRouter");
const dietRouter = require("./dietRouter");

const router = Router();
router.use("/recipe", recipeRouter);
router.use("/diet", dietRouter);

module.exports = router;
