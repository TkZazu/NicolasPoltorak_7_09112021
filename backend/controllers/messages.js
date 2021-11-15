const models = require("../models");
const jwtUtils = require("../utils/jwt.utils");
const fs = require("fs").promises;

module.exports = {
  createMessage: function (req, res) {
    const headerAuth = req.headers["authorization"];
    const userId = jwtUtils.getUserId(headerAuth);

    const title = req.body.title;
    const content = req.body.content;

    if (title == null || content == null) {
      return res.status(400).json({ error: "problème de paramètres" });
    }
    models.User.findByPk(userId)
      .then(function (userFound) {
        if (!userFound) {
          return res.status(400).json({ error: "utilisateur non trouvé" });
        }
        models.Message.create({
          title: title,
          content: content,
          likes: 0,
          UserId: userFound.id,
          attachement: req.file ? req.file.filename : null,
        })
          .then((newMessage) => {
            return res.status(201).json(newMessage);
          })
          .catch(() => {
            return res.status(500).json({ error: "pas de message trouvé" });
          });
      })
      .catch(function (err) {
        return res
          .status(500)
          .json({ error: "erreur serveur / impossible de trouvé le message" });
      });
  },

  listMessages: function (req, res) {
    const userId = jwtUtils.getUserId(req.headers["authorization"]);
    const fields = req.query.fields;
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    const order = req.query.order;

    models.User.findByPk(userId)
      .then((user) => {
        return models.Message.findAll({
          order: [order != null ? order.split(":") : ["createdAt", "DESC"]],
          include: [
            {
              model: models.User,
              as: "User",
            },
            {
              model: models.Like,
              as: "Likes",
            },
          ],
        }).then((messages) => ({
          messages: messages,
          isAdmin: user.get("isAdmin"),
        }));
      })
      .then(function ({ messages, isAdmin }) {
        const m = messages.map((m) => ({
          ...m.dataValues,
          modifiable: isAdmin || m.dataValues.User.id === userId,
        }));
        res.status(200).json(m);
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json({ error: "erreur serveur / champs invalide" });
      });
  },

  getOneMessage: function (req, res) {
    models.Message.findByPk(req.params.id)
      .then(function (message) {
        if (message) {
          res.status(200).json(message);
        } else {
          res.status(404).json({ error: "pas de message trouvé" });
        }
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json({ error: "erreur serveur / champs invalide" });
      });
  },

  updatePost: function (req, res) {
    const id = req.params.id;
    const title = req.body.title;
    const content = req.body.content;

    models.Message.findByPk(req.params.id)
      .then(function (message) {
        if (message) {
          message
            .update({
              title,
              content,
            })
            .then(() => {
              console.log("modification du message");
              res.status(200).json(message);
            })
            .catch(() => {
              res
                .status(500)
                .json({ error: "erreur serveur / champs invalide" });
            });
        } else {
          res.status(404).json({ error: "pas de message trouvé" });
        }
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json({ error: "erreur serveur / champs invalide" });
      });
  },

  deletePost: function (req, res) {
    const id = req.params.id;

    models.Message.findByPk(id).then((message) => {
      const attachement = message.get("attachement");
      let response = null;
      if (!attachement) {
        response = message.destroy();
      } else {
        const filePath = __dirname + "/../images/" + attachement;
        response = fs.unlink(filePath).then(() => message.destroy());
      }
      response
        .then(() => res.status(204).json())
        .catch((error) => res.status(400).json({ error }));
    });
  },
};
