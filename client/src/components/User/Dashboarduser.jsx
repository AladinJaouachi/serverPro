import React, { useEffect, useState } from "react";
import AddPub from "./../AddPub";
import "../../css/Dashboarduser.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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
    await localStorage.clear();
    dispatch(changeStateUser(false));

    navigator("/");
    alert("logout success ");
  };
  // end
  // get publications
  const getpubs = async (e) => {
    try {
      const zz = await localStorage.getItem("iduser");
      const res = await fetch(`http://localhost:3001/pubs/${zz}`, {
        method: "GET",
      });
      const data = await res.json();
      setpubs(data.Response);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  // end
  const [myuser, setmyuser] = useState("");
  const getuser = async (e) => {
    try {
      const idd = await localStorage.getItem("iduser");
      const response = await fetch("http://localhost:3001/user/" + idd, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setmyuser(data.Response);
      } else {
        alert("failed get profil user reload please ! ");
      }
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
    checkingtoken();
    getuser();
  }, []);

  const handlechange = (req, res) => {
    setupdateduser({ ...updateduser, [req.target.id]: req.target.value });
  };
  const [updateduser, setupdateduser] = useState({});
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
        localStorage.removeItem("iduser");
        localStorage.removeItem("tokenuser");
        localStorage.removeItem("coordin");
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
                  type="number"
                  id="phone"
                  placeholder="edit phone"
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
          <img src={myuser && myuser.image} alt="" />
          <div className="coordonnnes">
            <h6>firstname : {myuser && myuser.firstname}</h6>
            <h6>lastname : {myuser && myuser.lastname}</h6>
            <h6>specialité : {myuser && myuser.specialité}</h6>
            <h6>age : {myuser && myuser.age}</h6>
            <h6>phone : {myuser && myuser.phone} </h6>
            <h6>gender : {myuser && myuser.gender}</h6>
            <h6>place : {myuser && myuser.place}</h6>
          </div>
        </div>
        <AddPub />
      </div>

      <div className="fatherchildren">
        <h2>publications</h2>{" "}
        <div className="petitchild">
          {pubs.length > 0 &&
            pubs.map((pub) => {
              return (
                <div key={pub._id} className="children">
                  <img src={pub && pub.image1} alt="" />
                  <p>{pub.title} </p>
                  <p>{pub.content} </p>
                  <p>from {pub.fromwho}</p>
                  <p>added in : {pub.pubdate} </p>
                  <button
                    onClick={async () => {
                      try {
                        const response = await fetch(
                          `http://localhost:3001/pubs/${pub._id}`,
                          {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                            },
                          }
                        );
                        const data = await response.json();
                        console.log(data);
                        if (response.status === 200) {
                          console.log("deleted success");
                          alert("publication suprimé avec success");
                          window.location.reload();
                        } else {
                          console.log("failed delete ");
                          alert("failed delete ");
                        }
                      } catch (error) {
                        if (error) {
                          console.log(error);
                        }
                      }
                    }}
                  >
                    Supprimer{" "}
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      <FooterMyApp />
    </div>
  );
};

export default Dashboarduser;
