import React, { useState } from "react";
import "../../css/Loginuser.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeStateUser } from "../../Redux/slice/Userslice";

const Loginuser = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [errorses, seterrorses] = useState([]);
  var [bad, setbad] = useState(true);
  const [newloginuser, setnewlogin] = useState({
    email: "",
    password: "",
  });
  const handlechange = async (req, res) => {
    setnewlogin({ ...newloginuser, [req.target.id]: req.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/user/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newloginuser),
      });
      const data = await response.json();
      if (response.status === 200) {
        await localStorage.setItem("tokenuser", data.tokenuser);
        await localStorage.setItem("iduser", data.Response._id);
        await localStorage.setItem("isuser", data.Response.isUser);
        await localStorage.setItem("name", data.Response.firstname);
        await localStorage.setItem("prenom", data.Response.lastname);
        setbad(true);
        const t = await localStorage.getItem("isuser");
        if (t === "true") {
          dispatch(changeStateUser(true));
          navigator("/Dashboarduser");
        } else {
          console.log("comte n'est activé par l'administrateur");
          alert("compte n'est activé par l'administrateur");
          localStorage.clear();
        }
      } else {
        console.log(data);
        seterrorses(data.errors);
        console.log("you don't have account register first");
        setbad(false);
        dispatch(changeStateUser(false));
        localStorage.clear();
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="loginuser">
              <h3>login user form</h3>
              <div className="login__field">
                <input
                  type="text"
                  className="login__input"
                  id="email"
                  placeholder="Email"
                  onChange={handlechange}
                />
              </div>
              <div className="login__field">
                <input
                  type="password"
                  className="login__input"
                  id="password"
                  placeholder="Password"
                  onChange={handlechange}
                />
              </div>
              <center>
                <div>{bad ? null : <h6>bad credential</h6>}</div>
              </center>
              <button className="button login__submit" onClick={handlesubmit}>
                login now
              </button>
              <h5>
                if you don't have account
                <Link to={"/Registeruser"}>Register now</Link>
              </h5>
            </form>
            <div className="errorses">
              <div>
                {errorses &&
                  errorses.map((e, key) => {
                    return <li key={key}>{e.msg}</li>;
                  })}
              </div>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginuser;
