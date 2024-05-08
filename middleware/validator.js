import { check, validationResult } from "express-validator";

export const adminregisterrules = () => [
  check("email", "entrer un email valide").isEmail(),
  check("email", "email est obligatoire").notEmpty(),
  check("password", "entrer un valide mot de passe").isLength({
    min: 8,
    max: 20,
  }),

  check("password", "mot de passe est obligatoire").notEmpty(),
];

export const adminloginrules = () => [
  check("email", "entrer un email valide").isEmail(),
  check("email", "email est obligatoire").notEmpty(),
  check("password", "entrer une valide mot de passe").isLength({
    min: 8,
    max: 20,
  }),

  check("password", "mot de passe est obligatoire").notEmpty(),
];

export const userloginrules = () => [
  check("email", "entrer un email valide").isEmail(),
  check("email", "email est obligatoire").notEmpty(),
  check("password", "entrer une valide mot de passe").isLength({
    min: 8,
    max: 20,
  }),

  check("password", "mot de passe est obligatoire").notEmpty(),
];

export const userregisterrules = () => [
  check("email", "entrer un email valide").isEmail(),
  check("email", "email est obligatoire").notEmpty(),
  check("password", "entrer une valide mot de passe").isLength({
    min: 8,
    max: 20,
  }),

  check("password", "mot de passe est obligatoire").notEmpty(),
  check("firstname", "Le nom est obligatoire").notEmpty(),
  check("lastname", "Le prenom est obligatoire").notEmpty(),
  check("age", "L'age est obligatoire").notEmpty(),
  check("specialité", "La specialité est obligatoire").notEmpty(),
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

export const avissend = () => [
  check("title", "your name is required").notEmpty(),
  check("description", "description is required").notEmpty(),
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
