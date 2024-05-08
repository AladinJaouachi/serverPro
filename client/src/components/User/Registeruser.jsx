import React, { useState } from "react";
import "../../css/Registeruser.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

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
    place: "",
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
        alert("inscription reussite");
        navigator("/Loginuser");
      } else {
        console.log(data.errors);
        alert("l'inscription a échoué");
        setbad(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="father">
      <Link to={"/"}>
        <button className="house">
          <FontAwesomeIcon icon={faHouse} />
        </button>
      </Link>
      <div className="form-body">
        <div className="row">
          <div className="form-holder">
            <div className="form-content">
              <div className="form-items">
                <h3>S'inscrire maintenant</h3>
                <form className="requires-validation">
                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="text"
                      id="firstname"
                      placeholder="Nom"
                      required
                      onChange={handlechange}
                    />
                  </div>
                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="text"
                      id="lastname"
                      placeholder="Prenom"
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
                      placeholder="Mot de passe"
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
                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="number"
                      id="phone"
                      placeholder="Numero du Tel"
                      required
                      onChange={handlechange}
                    />
                  </div>

                  <div className="col-md-12">
                    <input
                      className="form-control"
                      type="text"
                      id="place"
                      placeholder="place"
                      required
                      onChange={handlechange}
                    />
                  </div>
                  <div className="form-button mt-3">
                    <button id="submit" type="submit" onClick={handlesubmit}>
                      S'inscrire maintenant
                    </button>

                    <center>
                      <h4>{bad ? null : <h4>Mauvaise identification </h4>}</h4>
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
