import express from "express";

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

export default router;
