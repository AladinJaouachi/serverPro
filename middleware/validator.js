import { check, validationResult } from "express-validator";

export const adminregisterrules = () => [
  check("email", "enter a valid email").isEmail(),
  check("email", "email is required").notEmpty(),
  check("password", "enter a valid password").isLength({
    min: 8,
    max: 20,
  }),

  check("password", "password is required").notEmpty(),
];

export const adminloginrules = () => [
  check("email", "enter a valid email").isEmail(),
  check("email", "email is required").notEmpty(),
  check("password", "enter a valid password").isLength({
    min: 8,
    max: 20,
  }),

  check("password", "password is required").notEmpty(),
];

export const userloginrules = () => [
  check("email", "enter a valid email").isEmail(),
  check("email", "email is required").notEmpty(),
  check("password", "enter a valid password").isLength({
    min: 8,
    max: 20,
  }),

  check("password", "password is required").notEmpty(),
];

export const userregisterrules = () => [
  check("email", "enter a valid email").isEmail(),
  check("email", "email is required").notEmpty(),
  check("password", "enter a valid password").isLength({
    min: 8,
    max: 20,
  }),

  check("password", "password is required").notEmpty(),
  check("firstname", "firstname is required").notEmpty(),
  check("lastname", "lastname is required").notEmpty(),
  check("gender", "gender is required").notEmpty(),
  check("age", "age is required").notEmpty(),
  check("specialité", "specialité is required").notEmpty(),
];

export const nouvellepubrules = () => [
  check("title", "title is required").notEmpty(),
  check("content", "content is required").isLength({
    min: 10,
    max: 100000,
  }),
];

export const newfeedback = () => [
  check("email", "enter a valid email").isEmail(),
  check("subject", "subject is required").notEmpty(),
  check("message", "message is required").notEmpty(),
];

export const validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .send({ errors: errors.array().map((err) => ({ msg: err.msg })) });
  }
  next();
};
