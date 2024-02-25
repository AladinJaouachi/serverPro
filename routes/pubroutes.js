import express from "express";
import pubs from "../models/pulications.js";
import { nouvellepubrules, validation } from "../middleware/validator.js";

const router = express.Router();

// nouvelle publication
router.post(
  "/nouvellepub",
  nouvellepubrules(),
  validation,
  async (req, res) => {
    const { title, image, content } = req.body;
    try {
      const newpub = new pubs({ title, image, content });
      const result = await newpub.save();
      res.status(200).send({ msg: "new pub", Response: result });
    } catch (error) {
      res.status(500).send({ msg: "failed add pub", Response: error });
    }
  }
);

// delete publication
router.delete("/:id", async (req, res) => {
  try {
    const deletedpub = await pubs.deleteOne({ _id: req.params.id });
    deletedpub.deletedCount
      ? res.status(200).send({ msg: "deleted", Response: deletedpub })
      : res.status(400).send({ msg: "pub alredy deleted" });
  } catch (error) {
    res.status(500).send({ msg: "failed", Response: error });
  }
});

// get all pubs
router.get("/allpubs", async (req, res) => {
  try {
    const allpubs = await pubs.find();
    res.status(200).send({ msg: "all pubs", Response: allpubs });
  } catch (error) {
    res.status(500).send({ msg: "failed get pubs", Response: error });
  }
});

export default router;
