import React, { useEffect, useState } from "react";
import AddPub from "./../AddPub";
import "../../css/Dashboarduser.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeStateUser } from "../../Redux/slice/Userslice";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FooterMyApp from "./../FooterMyApp";

const Dashboarduser = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [pubs, setpubs] = useState([]);
  const logout = async (e) => {
    localStorage.removeItem("tokenuser");
    dispatch(changeStateUser(false));

    navigator("/");
    alert("logout success ");
  };
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
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>edit account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control type="text" placeholder="url image" autoFocus />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="edit firstname"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="edit lastname"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control type="email" placeholder="edit email" autoFocus />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="password"
                  placeholder="edit password"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="edit specialité"
                  autoFocus
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control type="number" placeholder="edit age" autoFocus />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control type="text" placeholder="edit place" autoFocus />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control type="text" placeholder="edit gender" autoFocus />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className="container">
          <Navbar.Brand href="">app logo</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="">Home</Nav.Link>
            <Nav.Link href="">about</Nav.Link>
            <Nav.Link href="">contact us</Nav.Link>
          </Nav>
        </Container>
        <button className="editaccount" onClick={handleShow}>
          edit account
        </button>
        <button className="logoutuser" onClick={logout}>
          Logout
        </button>
      </Navbar>
      <br />

      <div className="headchild">
        <div className="profiluser">
          <img
            src="https://cdn-icons-png.flaticon.com/512/21/21104.png"
            alt=""
          />
          <div className="coordonnnes">
            <h6>firstname : firstname</h6>
            <h6>lastname : lastname</h6>
            <h6>specialité : specialité</h6>
            <h6>age : age</h6>
            <h6>gender : Gender</h6>
            <h6>place : Place</h6>
          </div>
        </div>
        <AddPub />
      </div>

      <div className="fatherchildren">
        <h2>publications</h2>{" "}
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
      <FooterMyApp />
    </div>
  );
};

export default Dashboarduser;
