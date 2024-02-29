import React, { useEffect, useState } from "react";

import "../../css/HomePage.css";
import { Link } from "react-router-dom";

import Dropdown from "react-bootstrap/Dropdown";

const HomePage = () => {
  const [pubs, setpubs] = useState([]);
  useEffect(() => {
    const getpubs = async (e) => {
      try {
        const res = await fetch("http://localhost:3001/pubs/allpubs", {
          method: "GET",
        });
        const data = await res.json();

        setpubs(data.Response);
      } catch (error) {
        console.log(error);
      }
    };
    getpubs();
  }, []);
  return (
    <div className="HomePage">
      <navbar>
        <ul>
          <li>
            {" "}
            <Link to={"/"} style={{ textDecoration: "none" }}>
              Home
            </Link>
          </li>
          <li>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              about
            </Link>
          </li>
          <li>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              contact us
            </Link>
          </li>
        </ul>
        <Dropdown data-bs-theme="dark">
          <Dropdown.Toggle
            id="dropdown-button-dark-example1"
            variant="secondary"
            className="btndrop"
            style={{ height: "40px" }}
          >
            interfaces
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to={"/Loginadmin"}>
                <button>interface admin </button>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item>
              <Link to={"/loginuser"}>
                <button> interface personnel </button>
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </navbar>

      <br />
      <center>
        <h1>nouveautés</h1>
      </center>
      <div className="fatherchildren">
        {" "}
        {pubs &&
          pubs.map((pub) => {
            return (
              <div key={pub._id} className="children">
                <img src={pub.image && pub.image} alt="" />
                <p>{pub.title} </p>
                <p>{pub.content} </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;
