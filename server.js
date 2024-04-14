console.clear();

import express from "express";
import mongoose from "mongoose";

import dotenv from "dotenv";
import cors from "cors";
import adminroutes from "./routes/adminroutes.js";
import userroute from "./routes/userroutes.js";
import pubroutes from "./routes/pubroutes.js";
import feedsroutes from "./routes/feedroutes.js";
import bodyParser from "body-parser";
import paymentapi from "./routes/Payment.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// importations
const PORT = process.env.PORT;
const url = process.env.url_DB;

// connect to mongoDB
mongoose
  .connect(url)
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => console.log(error));

// (cors()); solve problem between ports
app.use(cors());
//
// routes
app.use("/admin", adminroutes);
app.use("/user", userroute);
app.use("/pubs", pubroutes);
app.use("/feeds", feedsroutes);
app.use("/api", paymentapi);

//

// server run
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`server run on http://localhost: ${PORT}`);
});
