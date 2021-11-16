const db = require("../models");
const Like = db.like;

// Création like
exports.createLike = (req, res, next) => {
  const likeObject = req.body;
  Like.findAll({
    where: {
      post_id: req.body.post_id,
      user_id: req.body.user_id,
    },
  }).then((likes) => {
    if (likes.lenght === 0) {
      const like = new Like({
        ...likeObject,
      });
      //Enregistrement like sur la Bdd
      like
        .save()
        .then(() => {
          Like.findAll({
            where: { post_id: req.body.post_id },
          }).then((likes) => {
            res.status(200).json({ like: likes.length });
          });
        })
        .catch((error) => res.status(400).json({ error }));
    } else {
      Like.destroy({
        where: {
          post_id: req.body.post_id,
          user_id: req.body.user_id,
        },
      })
        .then(() => {
          Like.findAll({
            where: { post_id: req.body.post_id },
          }).then((likes) => {
            res.status(200).json({ like: likes.length });
          });
        })
        .catch((error) => res.status(400).json({ error }));
    }
  });
};
