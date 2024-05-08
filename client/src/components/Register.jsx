import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Register = () => {
  const navigator = useNavigate();
  const [errorshand, seterrorshand] = useState(null);
  const [newregister, setnewregister] = useState({
    image: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    specialité: "",
    age: "",
    gender: "",
    publications: [],
  });

  const handlechange = async (e) => {
    setnewregister({ ...newregister, [e.target.id]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const Response = await axios.post(
        "http://localhost:3001/user/registeruser",
        newregister
      );
      if (Response.data.success) {
        seterrorshand(null);
        navigator("/Login");
      } else {
        seterrorshand(Response.data.error);
        console.log(errorshand);
      }
    } catch (error) {
      seterrorshand(error.response.data.error);
      console.log("error", errorshand);
    }
  };

  return (
    <div>
      <form action="">
        <input
          type="text"
          placeholder="image"
          id="image"
          onChange={handlechange}
        />
        <input
          type="text"
          placeholder="firstname"
          id="firstname"
          onChange={handlechange}
        />
        <input
          type="text"
          placeholder="lastname"
          id="lastname"
          onChange={handlechange}
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          onChange={handlechange}
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          onChange={handlechange}
        />
        <input
          type="text"
          placeholder="specialité"
          id="specialité"
          onChange={handlechange}
        />
        <input type="text" placeholder="age" id="age" onChange={handlechange} />
        <input
          type="text"
          placeholder="gender"
          id="gender"
          onChange={handlechange}
        />
        <button type="submit" onClick={handlesubmit}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
