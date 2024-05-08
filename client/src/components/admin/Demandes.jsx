import React, { useEffect, useState } from "react";
import "../../css/Feedbacks.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const Demandes = () => {
  const [allfeeds, setallfeeds] = useState("");
  const getfeeds = async (e) => {
    try {
      const response = await fetch("http://localhost:3001/user/a", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        await setallfeeds(data.Response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getfeeds();
  }, []);

  const [isuser, setisuser] = useState({
    isUser: true,
  });

  return (
    <div>
      <Link to={"/Dashboardadmin"}>
        <button className="house">
          <FontAwesomeIcon icon={faHouse} />
        </button>
      </Link>
      <p>Tous les demandes </p>
      <div className="feeds">
        {allfeeds ? (
          allfeeds.map((el) => (
            <div key={el._id} className="feedchild">
              <p>
                {" "}
                nom et prenom : {el.firstname} {el.lastname}{" "}
              </p>
              <p> email : {el.email} </p>
              <p>specialité : {el.specialité}</p>
              <p>age: {el.age}</p>
              <p> place : {el.place} </p>

              <div className="adminchoix">
                <button
                  className="lawla"
                  onClick={async (e) => {
                    e.target.textContent = "Attendez...";
                    try {
                      const response = await fetch(
                        `http://localhost:3001/user/${el._id}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: await JSON.stringify(isuser),
                        }
                      );

                      await response.json();
                      if (response.status === 200) {
                        const sendit = async (e) => {
                          try {
                            const response = await fetch(
                              "http://localhost:3001/user/send-mail",
                              {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: await JSON.stringify({
                                  to: el.email,
                                  subject: "activation du compte",
                                  text: "votre compte du service a ete accepté par l'adininstrateur du plateforme vous pouver l'ouvrir",
                                }),
                              }
                            );

                            await response.json();

                            if (response.status === 200) {
                              alert("compte activé et email envoyé");
                              window.location.reload();
                            } else {
                              alert("erreur d'envoie d'email");
                            }
                          } catch (error) {
                            console.log("failed send mail");
                          }
                        };

                        sendit();
                      } else {
                        console.log("failed");
                      }
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  Accepter
                </button>
                <button
                  className="thenya"
                  onDoubleClick={async () => {
                    const response = await fetch(
                      `http://localhost:3001/user/${el._id}`,
                      {
                        method: "DELETE",
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );
                    await response.json();
                    if (response.status === 200) {
                      const sendrefusé = async () => {
                        try {
                          const response = await fetch(
                            "http://localhost:3001/user/send-mail",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: await JSON.stringify({
                                to: el.email,
                                subject: "Compte refusé",
                                text: "votre demande a été refusé par l'administrateur du site ProCell Plateform",
                              }),
                            }
                          );
                          await response.json();

                          if (response.status === 200) {
                            alert("compte refusé et mail envoyé");
                            window.location.reload();
                          } else {
                            console.log("failed send mail");
                          }
                        } catch (error) {
                          console.log(error);
                        }
                      };
                      sendrefusé();

                      window.location.reload();
                    } else {
                      alert(
                        "suppresiion a été echoué refraicher s'il vous plait "
                      );
                    }
                  }}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>loading ...</p>
        )}
      </div>
    </div>
  );
};

export default Demandes;
