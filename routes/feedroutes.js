import express from "express";
import bcrypt from "bcrypt";
import user from "../models/user.js";

const router = express.Router();

//
router.put("/azerty/:id", async (req, res) => {
  const { password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const modif = await user.updateOne(
      { _id: req.params.id },
      { $set: { password: hashedPassword } }
    );
    modif.modifiedCount
      ? res
          .status(200)
          .send({ msg: "ok", Response: modif, password, hashedPassword })
      : res.status(400).send({ msg: "failed" });
  } catch (error) {
    res.status(500).send({ msg: "update password failed", Response: error });
    console.log(error);
  }
});

// delete avis user
router.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const { idavis } = req.body;
  try {
    const modif = await user.updateOne(
      { _id: id },
      { $pull: { avis: { _id: idavis } } }
    );
    modif.modifiedCount
      ? res.status(200).send({ msg: "ok", Response: modif })
      : res.status(400).send({ msg: "failed", Response: modif });
  } catch (error) {
    res.status(500).send({ msg: "failed delete avis", Response: error });
    console.log(error);
  }
});

// delete avis user

export default router;
