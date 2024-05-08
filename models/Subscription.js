import mongoose from "mongoose";
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  libelle: {
    type: String,
    default: "Abonnement mensuelle",
  },
  amount: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "desactive",
  },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
