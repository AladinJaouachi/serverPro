import React, { useState } from "react";
import "../css/FooterMyApp.css";

const FooterMyApp = () => {
  // state to send mail
  const [emailsend, setemailsend] = useState({
    email: "",
    subject: "",
    message: "",
  });
  const handlechange = (req, res) => {
    setemailsend({ ...emailsend, [req.target.id]: req.target.value });
  };
  const handlesend = async () => {
    try {
      const response = await fetch("http://localhost:3001/user/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailsend),
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        console.log("email sended success");
      } else {
        console.log(data);
        console.log("email sended failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="footermyapp">
      <div className="footerchild">
        <div className="adresse">
          <h5>adress</h5>
          <p>Mareth Gabes Tunisia</p>
          <p>Tel:96931269</p>
          <p>
            Realized by : <br /> Team PFE
          </p>
        </div>
        <div className="links">
          <h5>links</h5>
          <h6>
            <a href="https://www.facebook.com/ala.jawachi.3">facebook</a>
          </h6>

          <h6>
            {" "}
            <a href="#aa"> instagram</a>
          </h6>
          <h6>
            <a href="https://www.linkedin.com/in/aladin-jaouachi/">linkedin</a>
          </h6>
          <h6>
            <a href="#aa">youtube</a>
          </h6>
        </div>
        <div className="sendmail">
          <h5>contact admin</h5>
          <form>
            <input
              type="email"
              id="email"
              placeholder="your email"
              onChange={handlechange}
              required
            />
            <input
              type="text"
              id="subject"
              placeholder="subject"
              onChange={handlechange}
              required
            />
            <input
              type="text"
              id="message"
              placeholder="message"
              onChange={handlechange}
              required
            />
            <button className="sendmail" onClick={handlesend}>
              send
            </button>
          </form>
        </div>
      </div>
      <h2>&#169; All rights Reserved (Tout droit reservé)</h2>
    </div>
  );
};

export default FooterMyApp;
