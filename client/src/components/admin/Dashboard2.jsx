import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { changestateadmin } from "../../Redux/slice/Adminslice";
import "../../css/Dashboardadmin.css";
import logo from "../../images/logo.jpg";

const Dashboard2 = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [users, setusers] = useState("");

  const [filtered, setfiltred] = useState("");
  const [filt, setfilt] = useState("");
  const [filt2, setfilt2] = useState("");

  const getusers = async () => {
    try {
      const token = await localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data) {
        await setusers(data.Response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getusers();
  }, []);

  const logout = async () => {
    await localStorage.removeItem("token");
    await dispatch(changestateadmin(false));
    await navigator("/");
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand className="ourbrand">
            {" "}
            <img src={logo} alt="" />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link className="naviget" href="/Dashboardadmin ">
                Acceuil
              </Nav.Link>
              <Nav.Link className="naviget" href="/ContactPatron">
                Contacter patron
              </Nav.Link>
              <Nav.Link className="naviget" href="#">
                Abonnements
              </Nav.Link>
              <Nav.Link className="naviget" href="/Demandes">
                Demandes
              </Nav.Link>
            </Nav>

            <button className="logout" onClick={logout}>
              Deconnexion
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="searchuser">
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="recherche patron"
            className="me-2"
            aria-label="Search"
            onChange={(e) => setfiltred(e.target.value)}
          />
        </Form>
      </div>
      <div className="searchit">
        <div className="searchuser1">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="recherche avec place"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setfilt(e.target.value)}
            />
          </Form>
        </div>
        <div className="searchuser1">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="recherche avec email"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setfilt2(e.target.value)}
            />
          </Form>
        </div>
      </div>

      <div className="fatheradmin">
        {users ? (
          users
            .filter((user) => {
              return (
                (user.firstname
                  .toLowerCase()
                  .includes(filtered.toLowerCase()) ||
                  user.lastname
                    .toLowerCase()
                    .includes(filtered.toLowerCase()) ||
                  user.specialité
                    .toLowerCase()
                    .includes(filtered.toLowerCase()) ||
                  user.age.toString().includes(filtered.toLowerCase())) &&
                user.place.toLowerCase().includes(filt.toLowerCase()) &&
                user.email.toLowerCase().includes(filt2.toLowerCase())
              );
            })
            .map((filtereduser) => {
              return (
                <article key={filtereduser._id}>
                  <Link to={`/${filtereduser._id}`}>
                    <figure>
                      <img src={filtereduser.image} alt="" />
                    </figure>
                    <h3>{filtereduser.firstname}</h3>
                    <h3>{filtereduser.lastname}</h3>
                    <h3>{filtereduser.specialité}</h3>
                    <p>{filtereduser.age} ans </p>
                    <p>{filtereduser.avis.length} avis </p>
                  </Link>
                </article>
              );
            })
        ) : (
          <center>
            <p> loading ...</p>
          </center>
        )}
      </div>
    </>
  );
};

export default Dashboard2;
