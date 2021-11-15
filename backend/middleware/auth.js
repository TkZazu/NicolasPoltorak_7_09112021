const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "be;8hWe&K~iOLG.r'.Nfq1mW9l{KZq");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "User Id non valable !";
    } else {
      next();
    }
  } catch {
    res.status(402).json({
      error: new Error("Requête invalide !"),
    });
  }
};
