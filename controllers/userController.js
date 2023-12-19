"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
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
    asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // reload filled out form with error messages
            // NOT IMPLEMENTED YET
            res.send(errors.array());
        }
        else {
            const userExists = yield User.findOne({
                email: req.body.sign_up_email,
            }).exec();
            if (userExists) {
                res.send("user already exists");
            }
            else {
                bcrypt.hash(req.body.sign_up_password, 10, (err, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
                    if (err) {
                        return next(err);
                    }
                    else {
                        const newUser = new User({
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            date_of_birth: new Date(req.body.year, req.body.month, req.body.day),
                            gender: req.body.gender,
                            email: req.body.sign_up_email,
                            password: hashedPassword,
                        });
                        yield newUser.save();
                        res.send("user created");
                    }
                }));
            }
        }
    })),
];
exports.user_log_in_post = asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User.findOne({ email: req.body.email });
    if (!user) {
        return res.send("No user with this email");
    }
    ;
    const match = yield bcrypt.compare(req.body.password, user.password);
    if (!match) {
        return res.send("Incorrect password");
    }
    res.send("end");
}));
