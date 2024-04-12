import React, { useState } from "react";
import "../css/ContactPatron.css";
const ContactPatron = () => {
  const [contact, setcontact] = useState({
    to: "",
    subject: "",
    text: "",
  });
  const handlechange = (e) => {
    setcontact({ ...contact, [e.target.id]: e.target.value });
  };

  const handlesubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/user/send-mail", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(contact),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        console.log("c'est bon envoyé");
        alert("Message envoyé au patron avec succèes");
      } else {
        console.log("erreur lors d'envoit");
        alert("erreur lors d'envoit");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="ContactPatron">
      <h1>Contact Patron</h1>
      <form>
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
      </form>
    </div>
  );
};

export default ContactPatron;
