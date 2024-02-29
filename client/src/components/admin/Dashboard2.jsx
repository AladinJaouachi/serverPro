import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { useDispatch } from "react-redux";
import { changestateadmin } from "../../Redux/slice/Adminslice";

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

            <button onClick={logout}>Logout</button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search user"
            className="me-2"
            aria-label="Search"
          />
        </Form>
      </div>

      <div>
        {users &&
          users.map((user) => {
            return (
              <div key={user._id}>
                <img src={user.image} alt="userimage" />
                <p>{user.firstname} </p>
                <p>{user.lastname} </p>
                <p>{user.age} </p>

                <p>{user.gender} </p>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Dashboard2;
