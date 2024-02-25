import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterX = () => {
  const navigator = useNavigate();
  const [failes, setfailes] = useState([]);
  const [newregister, setnewregister] = useState({
    email: "",
    password: "",
  });
  const handlechange = async (e) => {
    setnewregister({ ...newregister, [e.target.id]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3001/admin/registeradmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newregister),
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        console.log("success");
        console.log(data);
        navigator("/Login");
      } else {
        setfailes({ msg: data.errors });
        // console.log(data.errors);
      }
    } catch (error) {
      console.log(error.errors);
    }
  };
  console.log(failes);
  return (
    <div>
      <form>
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

        <button type="submit" onClick={handlesubmit}>
          Register
        </button>
      </form>

      <div>
        {" "}
        if you have account <Link to={"/Login"}>login</Link>
      </div>
      {failes.length < 1 &&
        failes.map((e) => {
          return <h5 key={e.id}>{e.msg}</h5>;
        })}
    </div>
  );
};

export default RegisterX;
