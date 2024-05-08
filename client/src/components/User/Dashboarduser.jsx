import React, { useEffect, useState } from "react";
import AddPub from "./../AddPub";
import "../../css/Dashboarduser.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeStateUser } from "../../Redux/slice/Userslice";
import { changeprofil } from "../../Redux/slice/profil";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FooterMyApp from "./../FooterMyApp";
import logo from "../../images/logo.jpg";
import axios from "axios";
import { format } from "date-fns";

const Dashboarduser = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [pubs, setpubs] = useState([]);
  // logout function
  const logout = async (e) => {
    await localStorage.clear();
    dispatch(changeStateUser(false));

    navigator("/");
    alert("Deconnexion aves success");
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

  // get user coordonées
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

  // check token validation
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
      await response.json();
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

  // get abonnement
  const [abonn, setabonn] = useState("");
  const getabonn = async () => {
    const userId = await localStorage.getItem("iduser");
    try {
      const response = await fetch("http://localhost:3001/api/getabonnement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        setabonn(
          format(new Date(data.Response.endDate), "dd-MM-yyyy h:mm:ss a")
        );
        console.log(abonn);
      } else {
        console.log("me femech", data.Response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // check abonnement existing
  const [paymentlink, setpaymentlink] = useState("");
  const checkabonnement = async () => {
    const qq = await localStorage.getItem("iduser");
    try {
      const response = await fetch("http://localhost:3001/user/checkabonn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: qq }),
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        console.log("abonnée");

        // dispatch(changeStateUser(false));
      } else {
        const redirecting = async () => {
          try {
            const responseA = await fetch("http://localhost:3001/api/payer", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });
            const data = await responseA.json();
            setpaymentlink(data.result.link);
            handleShow6(true);
            console.log(paymentlink);

            // window.location.href = data.result.link;
          } catch (error) {
            console.log(error);
          }
        };
        redirecting();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getpubs();
    checkingtoken();
    getuser();
    checkabonnement();
    getabonn();
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
        alert("modification avec success");
        window.location.reload();
      } else {
        console.log("failed update");
        alert("erreur ressayer ! ");
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

  //

  // modal 2
  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // upload image
  const [myimg, setmyimg] = useState(null);
  const [ready, setready] = useState(false);
  const uploadimageuser = async () => {
    const form = new FormData();
    form.append("file", myimg);
    form.append("upload_preset", "Aladinjaw");

    if (myimg == null) {
      updateuser();
    } else {
      await axios
        .post("https://api.cloudinary.com/v1_1/dseusisyl/upload", form)
        .then(async (result) => {
          if (result.status === 200) {
            await setupdateduser({
              ...updateduser,
              image: result.data.secure_url,
            });
            await setready(true);
          } else {
            console.log("error axios");
          }
        });
    }
  };

  // modal 3 pour les avis
  const [show3, setShow3] = useState(false);

  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  //
  // payer or no abonnement
  const [show6, setShow6] = useState(false);

  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);
  //

  return (
    <div>
      <div>
        <Modal
          show={show6}
          onHide={handleClose6}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Demande d'abonnement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Le compte n'a pas d'abonnement il faut abonner pour acceder au
            profil
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={logout}>
              Annuler
            </Button>
            <Button
              variant="success"
              onClick={() => (window.location.href = paymentlink)}
            >
              Valider
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modifier profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control
                  type="file"
                  id="image"
                  placeholder="image"
                  onChange={(e) => setmyimg(e.target.files[0])}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  id="firstname"
                  placeholder="modifier nom"
                  onChange={handlechange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  id="lastname"
                  placeholder="modifier prenom"
                  onChange={handlechange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  id="email"
                  placeholder="modifier email"
                  onChange={handlechange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  id="specialité"
                  placeholder="modifier specialité"
                  onChange={handlechange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  id="age"
                  placeholder="modifier age"
                  onChange={handlechange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  id="phone"
                  placeholder="modifier numero de Tel"
                  onChange={handlechange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  id="place"
                  placeholder="modifier la place"
                  onChange={handlechange}
                  autoFocus
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Annuler
            </Button>
            {ready ? (
              <Button onClick={updateuser} variant="success">
                confirmer
              </Button>
            ) : (
              <Button
                variant="success"
                onClick={(e) => {
                  uploadimageuser();
                  e.target.textContent = "attendez...";
                }}
              >
                Enregistrer
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
      <Navbar bg="dark" data-bs-theme="dark" className="navit">
        <img src={logo} alt="" />

        <div className="btns1">
          <button className="consult" onClick={handleShow3}>
            {" "}
            consulter avis
          </button>
          <button className="consult" onClick={handleShow2}>
            {" "}
            consulter abonnement
          </button>
        </div>

        <div className="btns2">
          <button className="editaccount" onClick={handleShow}>
            modifier profile
          </button>
          <button className="logoutuser" onClick={logout}>
            Deconnexion
          </button>
        </div>
      </Navbar>
      <br />
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Votre abonnement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Mr le patron votre abonnement est valide jusqu'a <br />{" "}
          {abonn && abonn}
        </Modal.Body>
      </Modal>

      <div>
        <Modal show={show3} onHide={handleClose3}>
          <Modal.Header closeButton>
            <Modal.Title>Mes avis</Modal.Title>
          </Modal.Header>
          <Modal.Body className="themthem">
            {myuser &&
              myuser.avis.map((e) => {
                return (
                  <div key={e._id} className="them">
                    <p>De : {e.title}</p>
                    <p>Avis : {e.description} </p>
                  </div>
                );
              })}
          </Modal.Body>
        </Modal>
      </div>
      <div className="headchild">
        <div className="profiluser">
          <img src={myuser && myuser.image} alt="" />
          <div className="coordonnnes">
            <h6>Nom: {myuser && myuser.firstname}</h6>
            <h6>Prenom : {myuser && myuser.lastname}</h6>
            <h6>specialité : {myuser && myuser.specialité}</h6>
            <h6>age : {myuser && myuser.age}</h6>
            <h6>Telephone : {myuser && myuser.phone} </h6>
            <h6>place : {myuser && myuser.place}</h6>
          </div>
        </div>
        <AddPub />
      </div>

      <div className="fatherchildren">
        <h3>publications</h3>
        <div className="petitchild">
          {pubs.length > 0 &&
            pubs.map((pub) => {
              return (
                <div key={pub._id} className="children">
                  <p>De : {pub.fromwho}</p>
                  <p>
                    Publié le :{" "}
                    {format(new Date(pub.pubdate), "dd-MM-yyyy h:mm:ss a")}{" "}
                  </p>
                  <hr width="90%" />
                  <img src={pub.image1} alt="" />
                  <p>{pub.title} </p>
                  <p>{pub.content} </p>

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
