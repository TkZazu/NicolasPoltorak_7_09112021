module.exports = (app) => {
  const comments = require("../controller/comment");

  const router = require("express").Router();

  router.get("/", comments.findAllComments);
  router.post("/", comments.createComment);
  router.delete("/:id", comments.deleteComment);

  app.use("api/comments", router);
};
