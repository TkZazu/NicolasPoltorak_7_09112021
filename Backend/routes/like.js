const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/likeCtrl");
const auth = require("../middleware/auth");

router.put("/:id", auth, likeCtrl.createLike);

module.exports = router;
