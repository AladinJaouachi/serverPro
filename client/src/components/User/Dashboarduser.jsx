import React, { useEffect, useState } from "react";
import AddPub from "./../AddPub";
import "../../css/Dashboarduser.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeStateUser } from "../../Redux/slice/Userslice";
import { changeprofil } from "../../Redux/slice/profil";
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
  // logout function
  const logout = async (e) => {
    localStorage.removeItem("tokenuser");
    localStorage.removeItem("coordin");
    localStorage.removeItem("iduser");
    dispatch(changeStateUser(false));
    dispatch(changeprofil(false));
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

  const getdashboard = async (e) => {
    try {
      const tt = await localStorage.getItem("coordin");
      const ttt = await JSON.parse(tt);
      await dispatch(changeprofil(ttt));
    } catch (error) {
      console.log(error);
    }
  };

  const checkingtoken = async (e) => {
    try {
      const token = await localStorage.getItem("tokenuser");
      const response = await fetch("http://localhost:3001/user/currentuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        alert("you are auth");

        dispatch(changeStateUser(true));
      } else {
        console.log("you are not auth");
        alert("you are not auth");
        dispatch(changeStateUser(false));
        dispatch(changeprofil(false));
        navigator("/loginuser");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getpubs();
    getdashboard();
    checkingtoken();
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

  const usercoord = useSelector((state) => state.profil.value);
  console.log(usercoord);
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
          <img src={usercoord && usercoord.image} alt="" />
          <div className="coordonnnes">
            <h6>firstname : {usercoord && usercoord.firstname}</h6>
            <h6>lastname : {usercoord && usercoord.lastname}</h6>
            <h6>specialité : {usercoord && usercoord.specialité}</h6>
            <h6>age : {usercoord && usercoord.age}</h6>
            <h6>gender : {usercoord && usercoord.gender}</h6>
            <h6>place : {usercoord && usercoord.place}</h6>
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
