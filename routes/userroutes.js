import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  avissend,
  newfeedback,
  userloginrules,
  userregisterrules,
  validation,
} from "../middleware/validator.js";
import user from "./../models/user.js";
import verifyToken from "../middleware/isAuth.js";
import feedback from "../models/feedback.js";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import Subscription from "../models/Subscription.js";

router.use(bodyParser.urlencoded({ extended: true }));
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
    const comparedpassword = await bcrypt.compare(password, useremail.password);

    if (!useremail.email) {
      return res.status(400).send({ msg: "bad credential" });
    } else if (!comparedpassword) {
      return res.status(400).send({ msg: "bad credential" });
    } else {
      const tokenuser = await jwt.sign(
        { _id: useremail._id },
        process.env.SECRET_KEY,
        { expiresIn: 36000 }
      );
      res.status(200).send({
        msg: "login user successfully",
        Response: useremail,
        tokenuser,
      });
    }
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

// other path
router.post("/do/:id", avissend(), validation, async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    const existingUser = await user.findByIdAndUpdate(userId, {
      $push: { avis: data },
    });

    if (existingUser) {
      const savedUser = await existingUser.save();
      if (savedUser) {
        res.status(200).send({ msg: "Update successful", Response: savedUser });
      } else {
        res.status(400).send({ msg: "Failed to save user" });
      }
    } else {
      res.status(404).send({ msg: "User not found", Response: null });
    }
  } catch (error) {
    res.status(500).send({ msg: "Failed", Response: error });
  }
});

// get users method
// update password

// ce
router.get("/", async (req, res) => {
  try {
    const allofusers = await user.find({ isUser: true });
    allofusers
      ? res.status(200).send({ msg: " nejem yjib", Response: allofusers })
      : res.status(400).send({ msg: "no users" });
  } catch (error) {
    res.status(500).send({ msg: "get users failed", Response: error });
  }
});

// get demandes
router.post("/a", async (req, res) => {
  try {
    const demande = await user.find({ isUser: false });
    if (demande) {
      res.status(200).send({ msg: " all demandes", Response: demande });
    } else {
      res.status(400).send({ msg: "no demandes" });
    }
  } catch (error) {
    res.status(500).send({ msg: "failed", Response: error });
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

// send mail
router.post("/send-mail", async (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alaajawachi5@gmail.com",
      pass: "pyhz wrgj ryqg tefa",
    },
  });

  const mailOptions = {
    from: "alaajawachi5@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("error sending mail");
      res.status(500).send({ msg: "failed send", Response: err });
    } else {
      console.log("email sended successfully");
      res.status(200).send({ msg: "email sendes to " + to, Response: info });
    }
  });
});

router.post("/subscribe", async (req, res) => {
  try {
    const { userId } = req.body;
    const exist = await Subscription.findOne({ userId: userId });
    if (exist) {
      res.status(400).send({
        msg: "votre abonnement est en cours tu ne peut pas renouveler maintenant",
      });
    } else {
      const newsubscription = new Subscription({
        userId,
        amount: 10000,
        startDate: new Date(),
        endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        status: "active",
      });
      await newsubscription.save();
      res.status(200).json({ message: "Subscription successful" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "failed subscription", Response: error });
  }
});

router.post("/checkabonn", async (req, res) => {
  const { userId } = req.body;
  try {
    const checkit = await Subscription.findOne({ userId });
    if (checkit) {
      res.status(200).send({ msg: "abonnée" });
    } else {
      res.status(400).send({ msg: "not abonnée" });
    }
  } catch (error) {
    res.status(500).send({ msg: "failed check", Response: error });
  }
});

export default router;
