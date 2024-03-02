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
  const [users, setusers] = useState(null);
  const getusers = async (e) => {
    try {
      const res = await fetch("http://localhost:3001/user/allusers", {
        method: "GET",
      });
      const data = await res.json();
      if (data) {
        return setusers(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getusers();
  }, []);

  const logout = async (e) => {
    localStorage.removeItem("token");
    dispatch(changestateadmin(false));
    navigator("/");
  };
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
          />
        </Form>
      </div>

      <div className="fatheradmin">
        {users &&
          users.map((user) => {
            return (
              <article key={user._id}>
                <figure>
                  <img src={user.image} alt="" />
                </figure>
                <h2>{user.firstname}</h2>
                <h2>{user.lastname}</h2>
                <h2>{user.specialité}</h2>
                <p>{user.age}ans </p>
              </article>
            );
          })}
      </div>
      <FooterMyApp />
    </>
  );
};

export default Dashboard2;
