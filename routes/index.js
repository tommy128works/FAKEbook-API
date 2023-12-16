"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");
/* GET home page. */
// the controller function needs to be refactored into its own
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});
// Register new user
router.post("/sign-up", user_controller.user_sign_up_post);
module.exports = router;
