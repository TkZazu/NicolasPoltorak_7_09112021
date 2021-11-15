const models = require("../models");
const jwtUtils = require("../utils/jwt.utils");

const DISLIKED = 0;
const LIKED = 1;

module.exports = {
  likePost: function (req, res) {
    const headerAuth = req.headers["authorization"];
    const userId = jwtUtils.getUserId(headerAuth);
    const messageId = parseInt(req.params.messageId);

    if (messageId <= 0) {
      return res.status(400).json({ error: "problème de paramètres" });
    }
    models.Message.findOne({
      where: { id: messageId },
      include: [
        {
          model: models.Like,
          where: { userId },
        },
      ],
    })
      .then((foundLike) => {
        return models.Message.findOne({
          where: { id: messageId },
        }).then((message) => {
          if (!foundLike) {
            return message.addUser(userId);
          } else {
            return message.removeUser(userId);
          }
        });
      })
      .then(() => {
        return models.Message.findOne({
          where: { id: messageId },
          include: [
            {
              model: models.Like,
            },
          ],
        });
      })
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ error });
      });
  },
};
