import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pubSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image1: {
    type: String,
  },
  pubdate: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  fromwho: {
    type: String,
    required: true,
  },
  idperson: {
    type: String,
    required: true,
  },
});

const publication = mongoose.model("publication", pubSchema);
export default publication;
