import React, { useState } from "react";
import "../css/ContactPatron.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
const ContactPatron = () => {
  const [contact, setcontact] = useState({
    to: "",
    subject: "",
    text: "",
  });
  const handlechange = (e) => {
    setcontact({ ...contact, [e.target.id]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/user/send-mail", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          to: contact.to,
          subject: contact.subject,
          text: contact.text,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        console.log("c'est bon envoyé");
        alert("Message envoyé au patron avec succèes");
        window.location.reload();
      } else {
        console.log("erreur lors d'envoit");
        alert("erreur lors d'envoit");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Link to={"/Dashboardadmin"}>
        <button className="house">
          <FontAwesomeIcon icon={faHouse} />
        </button>
      </Link>
      <div className="ContactPatron">
        <h1>Contacter Patron</h1>
        <input
          type="email"
          placeholder="à : example@gmail.com"
          id="to"
          onChange={handlechange}
          required
        />
        <input
          type="text"
          placeholder="Sujet"
          id="subject"
          onChange={handlechange}
          required
        />
        <input
          type="text"
          placeholder="text"
          id="text"
          onChange={handlechange}
          required
        />
        <button onClick={handlesubmit}>Envoyer</button>
      </div>
    </div>
  );
};

export default ContactPatron;
