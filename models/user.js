import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  image: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
  },

  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  specialité: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  isUser: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const user = mongoose.model("user", userSchema);

export default user;
