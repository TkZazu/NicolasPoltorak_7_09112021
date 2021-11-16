module.exports = (app) => {
  const likes = require("../controller/like");

  const router = require("express").Router();

  router.patch("/", likes.createLike);

  app.use("api/likes", router);
};
