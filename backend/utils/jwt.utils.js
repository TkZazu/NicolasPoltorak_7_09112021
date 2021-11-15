const jwt = require("jsonwebtoken");

const JWT_SIGN_TOKEN = "be;8hWe&K~iOLG.r'.Nfq1mW9l{KZq";

module.exports = {
  generateTokenForUser: function (userData) {
    return jwt.sign(
      {
        userId: userData.id,
        isAdmin: userData.isAdmin,
      },
      JWT_SIGN_TOKEN,
      {
        expiresIn: "24h",
      }
    );
  },

  parseAuthorization: function (authorization) {
    return authorization != null ? authorization.replace("Bearer ", "") : null;
  },
  getUserId: function (authorization) {
    const token = module.exports.parseAuthorization(authorization);
    if (token != null) {
      try {
        const jwtToken = jwt.verify(token, JWT_SIGN_TOKEN);
        if (jwtToken != null) return jwtToken.userId;
      } catch (err) {
        return null;
      }
    }
  },
};
