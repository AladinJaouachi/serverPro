import express from "express";
import feedback from "../models/feedback.js";

const router = express.Router();

router.delete("/fees", async (req, res) => {
  try {
    const deletedfeeds = await feedback.deleteMany({}); // Assuming you want to delete all documents
    if (deletedfeeds.deletedCount > 0) {
      res.status(200).send({ msg: "Feedback deleted successfully" });
    } else {
      res.status(400).send({ msg: "No feedback to delete" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Failed to delete feedback", Response: error });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const deletedfeed = await feedback.deleteOne({ _id: req.params.id });
    if (deletedfeed.deletedCount > 0) {
      res.status(200).send({ msg: "Feedback deleted successfully" });
    } else {
      res.status(400).send({ msg: "No feedback to delete" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Failed to delete feedback", Response: error });
  }
});

export default router;
