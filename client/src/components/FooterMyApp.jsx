import React from "react";
import "../css/FooterMyApp.css";

const FooterMyApp = () => {
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
            <input type="email" placeholder="your email" />
            <input type="text" placeholder="subject" />
            <input type="text" placeholder="message" />
            <button className="sendmail">send</button>
          </form>
        </div>
      </div>
      <h2>&#169; All rights Reserved (Tout droit reservé)</h2>
    </div>
  );
};

export default FooterMyApp;
