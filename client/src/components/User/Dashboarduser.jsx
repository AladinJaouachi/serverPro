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
  const [userdash, setuserdash] = useState();

  // logout function
  const logout = async (e) => {
    localStorage.removeItem("tokenuser");
    localStorage.removeItem("coordin");
    localStorage.removeItem("iduser");
    dispatch(changeStateUser(false));
    setuserdash(null);
    navigator("/");
    alert("logout success ");
  };
  // end
  // get publications
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
  // end
  // get user dashboard
  const getdashboard = async (e) => {
    try {
      const myid = await localStorage.getItem("iduser");
      const response = await fetch(`http://localhost:3001/user/${myid}`, {
        method: "GET",
      });
      const data = await response.json();

      if (response.status === 200) {
        await setuserdash(data.Response);
        console.log("ok c'est fait");
        console.log("hethi me db", data.Response);
        await console.log("hethi m state", userdash);
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // end
  useEffect(() => {
    getpubs();
    getdashboard();
  }, []);
  const [updateduser, setupdateduser] = useState({});

  const handlechange = (req, res) => {
    setupdateduser({ ...updateduser, [req.target.id]: req.target.value });
  };

  const updateuser = async (e) => {
    try {
      const myid = await localStorage.getItem("iduser");
      const response = await fetch(`http://localhost:3001/user/${myid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: await JSON.stringify(updateduser),
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log("updated success");
        console.log(data);
        alert("updated successfully");
        window.location.reload();
      } else {
        console.log("failed update");
        alert("failed update retry again");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  id="image"
                  placeholder="image"
                  onChange={handlechange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  id="firstname"
                  placeholder="edit firstname"
                  onChange={handlechange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  id="lastname"
                  placeholder="edit lastname"
                  onChange={handlechange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  id="email"
                  placeholder="edit email"
                  onChange={handlechange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  id="password"
                  placeholder="edit password"
                  onChange={handlechange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  id="specialité"
                  placeholder="edit specialité"
                  onChange={handlechange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  id="age"
                  placeholder="edit age"
                  onChange={handlechange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  id="place"
                  placeholder="edit place"
                  onChange={handlechange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  id="gender"
                  placeholder="edit gender"
                  onChange={handlechange}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="success"
              onClick={() => {
                updateuser();
                handleClose();
              }}
            >
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
          <img src={userdash && userdash.image} alt="" />
          <div className="coordonnnes">
            <h6>firstname : {userdash && userdash.firstname}</h6>
            <h6>lastname : {userdash && userdash.lastname}</h6>
            <h6>specialité : {userdash && userdash.specialité}</h6>
            <h6>age : {userdash && userdash.age}</h6>
            <h6>gender : {userdash && userdash.gender}</h6>
            <h6>place : {userdash && userdash.place}</h6>
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
                <img src={pub && pub.image1} alt="" />
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
