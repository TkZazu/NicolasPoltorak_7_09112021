module.exports = (app) => {
  const posts = require("../controller/post");
  const auth = require("../middleware/auth");

  const router = require("express").Router();
  const multer = require("../middleware/multer-config");

  router.post("/", auth, multer, posts.createPost);
  router.get("/:id", auth, posts.getOnePost);
  router.get("/users/:id", auth, posts.getAllUsersPosts);
  router.get("/", auth, posts.getAllPosts);
  router.put("/:id", auth, multer, posts.modifyPost);
  router.delete("/:id", auth, posts.deletePost);

  app.use("/api/posts", router);
};
