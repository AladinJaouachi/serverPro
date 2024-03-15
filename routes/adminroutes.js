import express from "express";
import admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  adminloginrules,
  adminregisterrules,
  validation,
} from "../middleware/validator.js";
import feedback from "../models/feedback.js";

const router = express.Router();

// register method
router.post(
  "/registeradmin",
  adminregisterrules(),
  validation,
  async (req, res) => {
    const { email, password } = req.body;

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const findadmin = await admin.findOne({ email });
      if (findadmin) {
        res.status(400).send({ msg: "bad credential" });
      } else {
        const newAdmin = new admin({
          email,
          password: hashedPassword,
        });
        const savedAdmin = await newAdmin.save();
        const token = jwt.sign({ id: savedAdmin._id }, process.env.SECRET_KEY, {
          expiresIn: 3600,
        });
        res.status(200).send({
          msg: "register success",
          Response: savedAdmin,
          token: token,
        });
      }
    } catch (error) {
      res.status(500).send({ msg: "register failed", Response: error });
    }
  }
);
//

// login method
router.post("/loginadmin", adminloginrules(), validation, async (req, res) => {
  const { email, password } = req.body;
  try {
    const findadmin = await admin.findOne({ email });
    if (!findadmin) {
      res
        .status(400)
        .send({ msg: "bad credential", Response: { msg: "bad credential" } });
    } else {
      const validPassword = await bcrypt.compare(password, findadmin.password);
      if (!validPassword) {
        res
          .status(400)
          .send({ msg: "bad credential", Response: { msg: "bad credential" } });
      } else {
        const token = jwt.sign({ id: findadmin._id }, process.env.SECRET_KEY, {
          expiresIn: 3600,
        });
        res
          .status(200)
          .send({ msg: "login success", Response: findadmin, token: token });
      }
    }
  } catch (error) {
    res.status(500).send({ msg: "login failed", Response: error });
  }
});

// update admin
router.patch("/:id", async (req, res) => {
  try {
    const updatedadmin = await admin.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    updatedadmin.modifiedCount
      ? res.status(200).send(updatedadmin)
      : res.status(400).send({ msg: "admin already updated" });
  } catch (error) {
    res.status(500).send({ msg: "update failed", Response: error });
  }
});

// delete admin method
router.delete("/:id", async (req, res) => {
  try {
    const deletedadmin = await admin.deleteOne({ _id: req.params.id });
    deletedadmin.deletedCount
      ? res.status(200).send({ msg: "admin deleted successfuly" })
      : res.status(400).send({ msg: "admin already deleted" });
  } catch (error) {
    res.status(500).send({ msg: "delete failed", Response: error });
  }
});

// get admin method
router.get("/alladmin", async (req, res) => {
  try {
    const alladmin = await admin.find();
    res.status(200).send({ msg: "all admins", Response: alladmin });
  } catch (error) {
    res.status(500).send({ msg: "get failed", Response: error });
  }
});
router.get("/f", async (req, res) => {
  try {
    const allfeeds = await feedback.find();
    if (allfeeds) {
      res
        .status(200)
        .send({ msg: "this is all feedbacks", Response: allfeeds });
    }
  } catch (error) {
    res.status(500).send({ msg: "Failed get feedbacks", Response: error });
    console.log(error);
  }
});

export default router;
