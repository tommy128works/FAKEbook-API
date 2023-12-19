const express = require("express");
const router = express.Router();

import { Request, Response, NextFunction } from "express";

const user_controller = require("../controllers/userController");

/* GET home page. */
// the controller function needs to be refactored into its own
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.render("index", { title: "Express" });
});

// Register new user
router.post("/sign-up", user_controller.user_sign_up_post);

router.get("/log-in", user_controller.user_log_in_post);

module.exports = router;
