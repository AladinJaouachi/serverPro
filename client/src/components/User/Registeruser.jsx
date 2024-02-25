import React, { useState } from "react";
import "../../css/Registeruser.css";
import { useNavigate } from "react-router-dom";

const Registeruser = () => {
  const navigator = useNavigate();
  const [bad, setbad] = useState(true);
  const [newuser, setnewuser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    specialité: "",
    age: "",
    gender: "",
  });
  const handlechange = async (req, res) => {
    setnewuser({ ...newuser, [req.target.id]: req.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/user/registeruser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newuser),
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log("connected");
        console.log("hethi response ", response);
        console.log("hethi data", data);
        setbad(true);
        alert("your register success");
        navigator("/Loginuser");
      } else {
        console.log(data.errors);
        alert("your register failed ");
        setbad(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="father">
      <div className="form-body">
        <div className="row">
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <h3>Register Today</h3>
                <form className="requires-validation">
                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="text"
                      id="firstname"
                      placeholder="firstname"
                      required
                      onChange={handlechange}
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="text"
                      id="lastname"
                      placeholder="lastname"
                      required
                      onChange={handlechange}
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      placeholder="E-mail"
                      required
                      onChange={handlechange}
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="password"
                      id="password"
                      placeholder="Password"
                      required
                      onChange={handlechange}
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="text"
                      id="specialité"
                      placeholder="specialité"
                      required
                      onChange={handlechange}
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="number"
                      id="age"
                      placeholder="age"
                      required
                      onChange={handlechange}
                    />
                  </div>
                  <div>
                    <select id="gender" onChange={handlechange}>
                      <option value=""></option>
                      <option value="male">male</option>
                      <option value="female">female</option>
                    </select>
                  </div>
                  <div className="form-button mt-3">
                    <button id="submit" type="submit" onClick={handlesubmit}>
                      Register
                    </button>
                    <center style={{ color: "red" }}>
                      <div>{bad ? null : <h3>bad credential </h3>}</div>
                    </center>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registeruser;
