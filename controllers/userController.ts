const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
import { Request, Response, NextFunction } from "express";

exports.user_sign_up_post = [
  body("first_name", "First name is empty").trim().notEmpty().escape(),
  body("last_name", "Last name is empty").trim().notEmpty().escape(),
  body("sign_up_email")
    .trim()
    .notEmpty()
    .withMessage("Email is empty")
    .isEmail()
    .withMessage("Invalid email provided")
    .escape()
    .normalizeEmail(),
  body("sign_up_password", "Password is too short")
    .isLength({ min: 6 })
    .escape(),
  body("month", "Month is not an integer").isInt().escape(),
  body("day", "Day is not an integer").isInt().escape(),
  body("year", "Year is not an integer").isInt().escape(),
  body("gender")
    .notEmpty()
    .withMessage("Gender is empty")
    .isIn(["male", "female"])
    .withMessage("Invalid gender provided")
    .escape(),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const newUser = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: new Date(req.body.year, req.body.month, req.body.day),
      gender: req.body.gender,
      email: req.body.sign_up_email, 
      password: req.body.sign_up_password,
    });

    if (!errors.isEmpty()) {
      // reload filled out form with error messages
      // NOT IMPLEMENTED YET
      res.send(errors.array());
    } else {
      await newUser.save();
      res.send("form completed correctly");
      
    }
  }),
];
