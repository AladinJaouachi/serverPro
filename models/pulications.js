import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pubSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
});

const publication = mongoose.model("publication", pubSchema);
export default publication;
