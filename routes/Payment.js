import express from "express";
import Subscription from "../models/Subscription.js";

const router = express.Router();

router.post("/payer", async (req, res) => {
  const url = "http://developers.flouci.com/api/generate_payment";
  const payload = {
    app_token: "0d152d65-edbd-44fe-bbae-960537966521",
    app_secret: process.env.FLOUCI_SECRET,
    amount: "10000",
    accept_card: "true",
    session_timeout_secs: 1200,
    success_link: "http://localhost:3000/success",
    fail_link: "http://localhost:3000/fail",
    developer_tracking_id: "3b0038c2-b6dc-45ec-ba1a-7db55fc3e593",
  };

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).send({ msg: "failed pay" });
  }
});

router.post("/verify/:id", async (req, res) => {
  const id_payment = req.params.id;
  const url = `https://developers.flouci.com/api/verify_payment/${id_payment}`;
  try {
    await fetch(url, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
        apppublic: "0d152d65-edbd-44fe-bbae-960537966521",
        appsecret: process.env.FLOUCI_SECRET,
      },
    })
      .then((response) => response.json())
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).send({ msg: "failed verification", error });
  }
});

// get abonnement
router.post("/getabonnement", async (req, res) => {
  try {
    const abon = await Subscription.findOne({
      userId: req.body.userId,
    });
    if (abon) {
      res.status(200).send({ msg: "abonnement", Response: abon });
    } else {
      res.status(400).send({ msg: "no abonnement" });
    }
  } catch (error) {
    res.status(500).send({ msg: "failed get abonnement", Response: error });
  }
});

//

// get all abonnements
router.get("/allabonnements", async (req, res) => {
  try {
    const all = await Subscription.find();
    if (all) {
      res.status(200).send({ msg: "abonnements", Response: all });
    } else {
      res.status(400).send({ msg: "no abonnements" });
    }
  } catch (error) {
    res.status(500).send({ msg: "failed get abonnements", Response: error });
  }
});
//

// delete one abonnement
router.delete("/:id", async (req, res) => {
  try {
    const todeleted = await Subscription.deleteOne({ userId: req.params.id });
    if (todeleted) {
      todeleted.deletedCount
        ? res
            .status(200)
            .send({ msg: "abonnement deleted", Response: todeleted })
        : res.status(400).send({ msg: "abonnement already deleted" });
    } else {
      res.status(400).send({ msg: "no abonnement deleted" });
    }
  } catch (error) {
    res.status(500).send({ msg: "failed delete abonnement", Response: error });
  }
});
//

// get and delete finished abonnements
router.post("/checkingit", async (req, res) => {
  try {
    const getthem = await Subscription.find({ endDate: { $lt: new Date() } });
    if (getthem.length > 0) {
      const aa = await Subscription.deleteMany();
      aa.deletedCount
        ? res.status(200).send({ msg: "deleted" })
        : res.status(400).send({ msg: "no deleted" });
    } else {
      res.status(404).send({ msg: "no abonnement to delete" });
    }
  } catch (error) {
    res.status(500).send({ msg: "failed function", Response: error });
  }
});
//

export default router;
