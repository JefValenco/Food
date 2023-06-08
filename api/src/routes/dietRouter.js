const { Router } = require("express");
const { getDietsHandler } = require("../handlers/dietHandlers");
const dietRouter = Router();

dietRouter.get("/", getDietsHandler);

module.exports = dietRouter;
