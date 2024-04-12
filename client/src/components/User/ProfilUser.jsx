import React, { useEffect, useState } from "react";
import "../../css/Profiluser.css";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ProfilUser = () => {
  const navigator = useNavigate();
  const [getstat, setgetstat] = useState("");

  const url = useParams().id;
  const token = localStorage.getItem("token");

  const searchoneuser = async (e) => {
    try {
      const response = await fetch("http://localhost:3001/user/" + url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        await setgetstat(data.Response);
        handleChange(data.Response.email);
      }
      console.log(getstat.avis);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteuser = async () => {
    try {
      const response = await fetch("http://localhost:3001/user/" + url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        alert("utilisateur supprimé");
        navigator("/Dashboardadmin");
      } else {
        alert("suppression echoué ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    searchoneuser();
  }, []);

  const [avisuser, setavisuser] = useState({
    title: "",
    description: "",
  });

  const handleTitleChange = (event) => {
    setavisuser({
      ...avisuser,
      title: event.target.value,
    });
  };

  const handleDescriptionChange = (event) => {
    setavisuser({
      ...avisuser,
      description: event.target.value,
    });
  };

  const handlesend = async (e) => {
    try {
      const response = await fetch("http://localhost:3001/user/do/" + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(avisuser),
      });
      const data = await response.json();
      if (response.status === 200) {
        alert("Message envoyé");
        console.log(data);
      } else {
        alert("modified failed , retry again ! ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modifp, setmodifpas] = useState({});
  const handlechangepass = (event) => {
    setmodifpas({
      ...modifp,
      password: event.target.value,
    });
  };

  const [tosend, settosend] = useState({
    to: "",
    subject: "update password",
    text: "",
  });
  function handleChange(event) {
    settosend({
      ...tosend,
      to: event,
    });
  }

  function handleChange1(event1) {
    settosend({
      ...tosend,
      text: event1,
    });
  }

  const sendmail = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user/send-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: await JSON.stringify({
          to: tosend.to,
          subject: tosend.subject,
          text: "votre nouveau mot de passe est : " + tosend.text,
        }),
      });

      if (response.status === 200) {
        console.log("mail sent");
        alert("mot de passe a été change et l'email envoyé");
        console.log(response);
        window.location.reload();
      } else {
        console.log("mail not sent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modifpass = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:3001/feeds/azerty/${url}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: await JSON.stringify(modifp),
        }
      );

      const data = await response.json();
      console.log("hethi data", data);
      if (response.status === 200) {
        handleChange1(modifp.password);
        console.log(handleChange1);
        console.log("tbedel");
        console.log("new pass", data);
        await sendmail();
      } else {
        alert("modified failed , retry again ! ");
        console.log("me tbedelch");
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="myuser">
        <img src={getstat.image} alt="" />
        <h4>Nom: {getstat.firstname} </h4>
        <h4> Prenom:{getstat.lastname} </h4>
        <h4>specialité : {getstat.specialité} </h4>
        <hr />
        <h4>Email : {getstat.email} </h4>
        <h4>Numero de Tel : {getstat.phone} </h4>
        <h4>genre : {getstat.gender} </h4>
        <h4>adresse : {getstat.place} </h4>
        <h4>age : {getstat.age} </h4>

        {token && (
          <input
            type="text"
            placeholder="modifier mdp :"
            onChange={handlechangepass}
          />
        )}
        {token && (
          <Button variant="primary" onClick={modifpass}>
            changer mdp
          </Button>
        )}
        {token && <Button onClick={deleteuser}>supprimer compte </Button>}

        {!token && (
          <Button variant="primary" onClick={handleShow}>
            Ajouter avis
          </Button>
        )}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Ajouter avis</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Votre nom et prenom</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Votre nom et prenom"
                  onChange={handleTitleChange}
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Votre avis</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Votre avis"
                  autoFocus
                  onChange={handleDescriptionChange}
                  required
                />
              </Form.Group>
              <Button variant="secondary" onClick={handleClose}>
                Fermer
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  handleClose();
                  handlesend();
                }}
              >
                Envoyer msg
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
        <div className="babah">
          <div className="entetes">
            <h6>Avis </h6>
            {getstat.avis && <h6>({getstat.avis.length}) : </h6>}
          </div>

          {getstat.avis &&
            getstat.avis.map((item) => {
              return (
                <div className="weldeh" key={item._id}>
                  <div className="weldweld" width="100%">
                    <p>{item.title} </p>
                    <p> {item.description} </p>
                  </div>
                  {token && (
                    <button
                      onClick={async () => {
                        console.log(url);
                        console.log(item._id);
                        try {
                          const response = await fetch(
                            `http://localhost:3001/feeds/delete/${url}`,
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({ idavis: item._id }),
                            }
                          );
                          const data = await response.json();
                          console.log(data);

                          if (response.status === 200) {
                            alert("avis supprimé");
                            window.location.reload();
                          } else {
                            alert("suppression echoué");
                          }
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      {" "}
                      X{" "}
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProfilUser;
