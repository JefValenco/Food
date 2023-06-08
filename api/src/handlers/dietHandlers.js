const { getAllDietsController } = require("../controllers/getAllDiets");

const getDietsHandler = async (req, res) => {
  try {
    const dietsTotal = await getAllDietsController();
    res.status(200).json(dietsTotal);
  } catch {
    res
      .status(400)
      .send({ error: "Error getDietsHandler", message: error.message });
  }
};

module.exports = {
  getDietsHandler,
};
