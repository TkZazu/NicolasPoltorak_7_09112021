const jwt = require("jsonwebtoken");
const { secret } = require("../config.json");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization; //Récupération du token du header
    const decodedToken = jwt.verify(token, secret); //Décodage du token
    const userId = decodedToken.userId;
    if (req.headers.userid !== userId) {
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Requête non valide"),
    });
  }
};
