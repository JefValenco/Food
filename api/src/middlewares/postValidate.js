const postValidate = (req, res, next) => {
  const { name, summary, score, steps, diets } = req.body;
  if (!name) return res.status(400).json({ error: "Missing name!" });
  if (!summary) return res.status(400).json({ error: "Missing summary!" });
  if (!score) return res.status(400).json({ error: "Missing score!" });
  if (!steps) return res.status(400).json({ error: "Missing steps!" });
  if (!diets) return res.status(400).json({ error: "Missing diets!" });

  next();
};

module.exports = { postValidate };
