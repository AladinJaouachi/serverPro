import React from "react";
import "../css/FooterMyApp.css";

const FooterMyApp = () => {
  // state to send mail

  return (
    <div className="footermyapp">
      <div className="footerchild">
        <div className="adresse">
          <h5>adresse</h5>
          <p>Mareth Gabes Tunisia</p>
          <p>Tel:96931269</p>
          <p>
            Realisé par : <br /> Groupe PFE
          </p>
        </div>
        <div className="links">
          <h5>liens</h5>
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
      </div>
      <h2>&#169; Tout droit reservé (All rights Reserved)</h2>
    </div>
  );
};

export default FooterMyApp;
