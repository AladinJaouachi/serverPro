import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  newfeedback,
  userloginrules,
  userregisterrules,
  validation,
} from "../middleware/validator.js";
import user from "./../models/user.js";
import verifyToken from "../middleware/isAuth.js";
import feedback from "../models/feedback.js";

router.use(express.json());

// register method
router.post(
  "/registeruser",
  userregisterrules(),
  validation,
  async (req, res) => {
    const {
      image,
      firstname,
      lastname,
      email,
      password,
      specialité,
      age,
      place,
      phone,
      gender,
    } = req.body;
    try {
      const finduser = await user.findOne({ email: email });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      if (finduser) {
        res.status(400).send({ msg: "bad credential" });
      } else {
        const newuser = new user({
          image,
          firstname,
          lastname,
          email,
          password: hashedPassword,
          specialité,
          age,
          place,
          phone,
          gender,
        });
        const saveduser = await newuser.save();
        const token = await jwt.sign(
          { _id: saveduser._id },
          process.env.SECRET_KEY,
          { expiresIn: 3600 }
        );
        res.status(200).send({
          msg: "register user successfully",
          Response: saveduser,
          token: token,
        });
      }
    } catch (error) {
      res.status(500).send({ msg: "register user failed", Response: error });
    }
  }
);

// login method
router.post("/loginuser", userloginrules(), validation, async (req, res) => {
  const { email, password } = req.body;

  try {
    const useremail = await user.findOne({ email });
    if (!useremail.email) {
      return res.status(400).send({ msg: "bad credential" });
    }
    const comparedpassword = await bcrypt.compare(password, useremail.password);

    if (!comparedpassword) {
      return res.status(400).send({ msg: "bad credential" });
    }
    const tokenuser = await jwt.sign(
      { _id: useremail._id },
      process.env.SECRET_KEY,
      { expiresIn: 36000 }
    );
    return res.status(200).send({
      msg: "login user successfully",
      Response: useremail,
      tokenuser,
    });
  } catch (error) {
    res.status(500).send({ msg: "login user failed", Response: error });
  }
});
//

// get one user
router.get("/:id", async (req, res) => {
  try {
    const findeduser = await user.findOne({ _id: req.params.id });
    findeduser
      ? res
          .status(200)
          .send({ msg: "get user successfully", Response: findeduser })
      : res.status(400).send({ msg: "user not founded" });
  } catch (error) {
    res.status(500).send({ msg: "failed get user", Response: error });
  }
});
// end

// delete user method
router.delete("/:id", async (req, res) => {
  try {
    const deleteduser = await user.deleteOne({ _id: req.params.id });

    deleteduser.deletedCount
      ? res
          .status(200)
          .send({ msg: "delete user successfully", Response: deleteduser })
      : res.status(404).send({ msg: "user already deleted" });
  } catch (error) {
    res.status(500).send({ msg: "delete user failed", Response: error });
  }
});

// update user method
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await user.updateOne(
      { _id: req.params.id },
      { $set: { ...req.body } }
    );
    updatedUser.modifiedCount
      ? res.status(200).send({ msg: "updated success", Response: updatedUser })
      : res.status(400).send({ msg: "already updated" });
  } catch (error) {
    res.status(500).send({ msg: "update user failed", Response: error });
  }
});

// get users method

router.get("/", async (req, res) => {
  try {
    const allofusers = await user.find({});
    allofusers
      ? res.status(200).send({ msg: " nejem yjib", Response: allofusers })
      : res.status(400).send({ msg: "no users" });
  } catch (error) {
    res.status(500).send({ msg: "get users failed", Response: error });
  }
});

// adding feedback
router.post("/feedback", newfeedback(), validation, async (req, res) => {
  const { email, subject, message } = req.body;
  try {
    const newfeed = new feedback({ email, subject, message });
    const aa = await newfeed.save();
    if (aa) {
      res.status(200).send({ msg: "sended", Response: aa });
    }
  } catch (error) {
    res.status(500).send({ msg: "failed send feedback", Response: error });
    console.log(error);
  }
});
//

// get allfeedbacks

router.post("/currentuser", verifyToken, async (req, res) => {
  try {
    res.send({ msg: "user is auth", user: req.user });
  } catch (error) {
    console.log(error);
  }
});

export default router;
