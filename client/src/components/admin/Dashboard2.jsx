import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { changestateadmin } from "../../Redux/slice/Adminslice";
import "../../css/Dashboardadmin.css";
import FooterMyApp from "./../FooterMyApp";

const Dashboard2 = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [users, setusers] = useState("");

  const [filtered, setfiltred] = useState("");

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
  console.log(users);
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">about</Nav.Link>
              <Nav.Link href="#">contact us</Nav.Link>
            </Nav>

            <button className="logout" onClick={logout}>
              Logout
            </button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="searchuser">
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search user"
            className="me-2"
            aria-label="Search"
            onChange={(e) => setfiltred(e.target.value)}
          />
        </Form>
      </div>

      <div className="fatheradmin">
        {users ? (
          users
            .filter((user) => {
              return (
                user.firstname.toLowerCase().includes(filtered.toLowerCase()) ||
                user.lastname.toLowerCase().includes(filtered.toLowerCase()) ||
                user.specialité
                  .toLowerCase()
                  .includes(filtered.toLowerCase()) ||
                user.age.toString().includes(filtered.toLowerCase())
              );
            })
            .map((filtereduser) => {
              return (
                <article key={filtereduser._id}>
                  <figure>
                    <img src={filtereduser.image} alt="" />
                  </figure>
                  <h2>{filtereduser.firstname}</h2>
                  <h2>{filtereduser.lastname}</h2>
                  <h2>{filtereduser.specialité}</h2>
                  <p>{filtereduser.age} ans </p>
                </article>
              );
            })
        ) : (
          <center>
            <p> no data found </p>
          </center>
        )}
      </div>
      <FooterMyApp />
    </>
  );
};

export default Dashboard2;
