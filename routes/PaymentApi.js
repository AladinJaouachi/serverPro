import express from "express";
const router = express.Router();

router.post("/payment", async (req, res) => {
  try {
    const url = "http://developers.flouci.com/api/generate_payment";
    const payload = {
      app_token: "<APP_TOKEN>",
      app_secret: process.env.FLOUCI_SECRET,
      amount: "1000",
      accept_card: "true",
      session_timeout_secs: 1200,
      success_link: "https://www.google.com",
      fail_link: "https://localhost:3000",
      developer_tracking_id: "<your_tracking_id>",
    };
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((result) => result.data)
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).send({ msg: "failed", Response: error });
  }
});

export default router;
