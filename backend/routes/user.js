module.exports = (app) => {
  const users = require("../controllers/user");
  const auth = require("../middleware/auth");
  const multer = require("../middleware/multer-config");

  const router = require("express").Router();

  router.post("/", users.createUser);
  router.post("/login", users.login);
  router.get("/:id", auth, users.getOneUser);
  router.put("/:id", auth, multer, users.modifyUser);
  router.delete("/:id", auth, users.deleteUser);

  app.use("/api/users", router);
};
