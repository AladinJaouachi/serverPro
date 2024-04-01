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
    const { title, image1, pubdate, fromwho, idperson, content } = req.body;
    try {
      const newpub = new pubs({
        title,
        image1,
        pubdate,

        fromwho,
        content,
        idperson,
      });
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

// get specific pubs
router.get("/:id", async (req, res) => {
  try {
    const pub = await pubs.find({ idperson: req.params.id });
    if (pubs) {
      res.status(200).send({ msg: "all pubs", Response: pub });
    } else {
      res.status(400).send({ msg: "no pubs" });
    }
  } catch (error) {
    res.status(500).send({ msg: "failed get pubs", Response: error });
  }
});
//

export default router;
