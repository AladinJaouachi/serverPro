import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Loginadmin.css";

const Login = ({ setfirst }) => {
  const navigator = useNavigate();
  const [errorses, seterrorses] = useState([]);
  var [bad, setbad] = useState(true);

  const [newlogin, setnewlogin] = useState({
    email: "",
    password: "",
  });
  const handlechange = async (req, res) => {
    setnewlogin({ ...newlogin, [req.target.id]: req.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/admin/loginadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newlogin),
      });
      const data = await response.json();
      if (response.status === 200) {
        await localStorage.setItem("token", data.token);
        setfirst(true);
        const bb = await localStorage.getItem("token");

        if (bb) {
          console.log("login is ok ");
          console.log("login success");
          console.log(data);

          navigator("/Dashboardadmin");
        } else {
          console.log("failed");
        }
      } else {
        console.log(data.errors);
        seterrorses(data.errors);
        console.log("you don't have account register first");
        setbad(false);
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {/* <form action="">
        <h1> login as admin </h1>
        <input
          type="email"
          id="email"
          placeholder="Email"
          onChange={handlechange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handlechange}
        />
        <button type="submit" onClick={handlesubmit}>
          login
        </button>
      </form> */}
      <div className="login-wrap">
        <div className="login-html">
          <div className="login-form">
            <div className="sign-in-htm">
              <div className="entete">login Admin</div>
              <div className="group">
                <label for="user" className="label">
                  email
                </label>
                <input
                  id="email"
                  type="text"
                  className="input"
                  onChange={handlechange}
                />
              </div>
              <div className="group">
                <label for="pass" className="label">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="input"
                  data-type="password"
                  onChange={handlechange}
                />
              </div>

              <div className="group">
                <input
                  type="submit"
                  className="button"
                  value="Sign In"
                  onClick={handlesubmit}
                />
              </div>
              <div className="predefinit">
                {" "}
                {errorses &&
                  errorses.map((e, key) => {
                    return <h4 key={key}>{e.msg}</h4>;
                  })}
              </div>
              <div className="predefinit">
                {bad ? null : <h3>bad credential</h3>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
