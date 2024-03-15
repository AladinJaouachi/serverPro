import mongoose from "mongoose";
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const feedback = mongoose.model("feedback", feedbackSchema);

export default feedback;
