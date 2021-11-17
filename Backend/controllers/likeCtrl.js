const db = require("../models");
const Like = db.likes;

exports.createLike = (req, res, next) => {
  const like = new Like({
    UserId: req.body.UserId,
    MessageId: req.body.MessageId,
    CommentId: req.body.CommentId,
    like: req.body.like,
  });
  like
    .save()
    .then(() => res.status(201).json({ message: "Liké" }))
    .catch((error) => res.status(400).json({ error }));
};
