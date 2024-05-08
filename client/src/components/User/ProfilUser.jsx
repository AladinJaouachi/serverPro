import React, { useEffect, useState } from "react";
import "../../css/Profiluser.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const ProfilUser = () => {
  const navigator = useNavigate();
  const [getstat, setgetstat] = useState("");
  const url = useParams().id;
  const token = localStorage.getItem("token");

  // search one user
  const searchoneuser = async (e) => {
    try {
      const response = await fetch(`http://localhost:3001/user/${url}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.status === 200) {
        await setgetstat(data.Response);
        await settosend({ ...tosend, to: `${data.Response.email}` });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //

  // delete one user
  const deleteuser = async () => {
    try {
      const response = await fetch("http://localhost:3001/user/" + url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response.json();
      if (response.status === 200) {
        alert("utilisateur supprimé");
        deleteabonnement();
        sendmailfordeleted();

        navigator("/Dashboardadmin");
      } else {
        alert("suppression du compte echoué ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //

  useEffect(() => {
    searchoneuser();
  }, []);

  // state d'avis user
  const [avisuser, setavisuser] = useState({
    title: "",
    description: "",
  });

  //

  // function to change the title of avis
  const handleTitleChange = (event) => {
    setavisuser({
      ...avisuser,
      title: event.target.value,
    });
  };
  //

  // function to change the description of avis
  const handleDescriptionChange = (event) => {
    setavisuser({
      ...avisuser,
      description: event.target.value,
    });
  };
  //

  // function to send avis
  const handlesend = async (e) => {
    try {
      const response = await fetch("http://localhost:3001/user/do/" + url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(avisuser),
      });
      await response.json();
      if (response.status === 200) {
        alert("Message envoyé");
        window.location.reload();
      } else {
        alert("Erreur ressayer ! ");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //

  // modal 1 params
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //

  // state to send mail

  const [tosend, settosend] = useState({
    to: "",
    subject: "update password",
    text: "",
  });
  //

  // function to set the password to send in the state
  const handlechangepass = (event) => {
    settosend({
      ...tosend,
      text: event,
    });
  };
  //

  // function to send email of updates
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
        window.location.reload();
      } else {
        console.log("mail not sent");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //
  // send mail for deleted profil
  const sendmailfordeleted = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user/send-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: await JSON.stringify({
          to: tosend.to,
          subject: "Suppression du compte service",
          text: "Mr votre compte de service a été supprimé par l'administrateur du plateform car votre service n'est ni aimé ni accepté par ceux qui recherchent des services",
        }),
      });

      if (response.status === 200) {
        console.log("mail sent");
        alert("email de suppression a été envoyé");
        window.location.reload();
      } else {
        console.log("mail not sent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //
  // modification du password
  const [modifp, setmodifp] = useState();

  const modifpass = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:3001/feeds/azerty/${url}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: await JSON.stringify({ password: modifp }),
        }
      );

      const data = await response.json();
      if (response.status === 200) {
        console.log("tbedel");

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

  //

  // delete abonnement
  const deleteabonnement = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/${url}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await response.json();
      if (response.status === 200) {
      } else {
        alert("il n'y a pas d'abonnement à supprimer ");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //

  return (
    <div>
      {token ? (
        <Link to={"/Dashboardadmin"}>
          <button className="house">
            <FontAwesomeIcon icon={faHouse} />
          </button>
        </Link>
      ) : (
        <Link to={"/"}>
          <button className="house">
            <FontAwesomeIcon icon={faHouse} />
          </button>
        </Link>
      )}
      <div className="myuser">
        <img src={getstat.image} alt="" />
        <h4>Nom: {getstat.firstname} </h4>
        <h4> Prenom:{getstat.lastname} </h4>
        <h4>specialité : {getstat.specialité} </h4>
        <hr />
        <h4>Email : {getstat.email} </h4>
        <h4>Numero de Tel : {getstat.phone} </h4>
        <h4>adresse : {getstat.place} </h4>
        <h4>age : {getstat.age} </h4>

        {token && (
          <input
            type="text"
            placeholder="nouveau mot de passe :"
            onChange={(e) => {
              handlechangepass(e.target.value);
              setmodifp(e.target.value);
            }}
          />
        )}
        {token && (
          <Button variant="secondary" onClick={modifpass} disabled={!modifp}>
            changer mot de passe
          </Button>
        )}
        {token && <Button onDoubleClick={deleteuser}>supprimer compte </Button>}

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
                    <Button
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
                    </Button>
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
