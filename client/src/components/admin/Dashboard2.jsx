import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import AddPub from "../AddPub";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch } from "react-redux";
import { changestateadmin } from "../../Redux/slice/Adminslice";

const Dashboard2 = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [users, setusers] = useState(null);
  useEffect(() => {
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
    getusers();
  }, []);

  const logout = async (e) => {
    localStorage.removeItem("token");
    dispatch(changestateadmin(false));

    navigator("/");
  };
  return (
    <div>
      {/* <AddPub /> */}
      <div>
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
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Link" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#" disabled>
                  Link
                </Nav.Link>
              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <center>
        <h1>this is admin dashboard </h1>
      </center>
      <button onClick={logout}>Logout</button>
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
    </div>
  );
};

export default Dashboard2;
