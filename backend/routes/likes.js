const express = require("express");
const auth = require("../middleware/auth");

const likesCtrl = require("../controllers/likes");

exports.router = (function () {
  const likesRouter = express.Router();

  likesRouter.post(
    "/messages/:messageId/action/like",
    auth,
    likesCtrl.likePost
  );

  return likesRouter;
})();
