import React, { useEffect, useState } from "react";
import "../../css/Abonnements.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Abonnements = () => {
  const [allab, setallab] = useState("");
  const getthem = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/allabonnements", {
        method: "GET",
      });
      const data = await response.json();
      if (response.status === 200) {
        setallab(data.Response);
        console.log("all", data.Response);
      } else {
        console.log("mefemech");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getthem();
  }, []);

  return (
    <div className="fatherabonements">
      <Link to={"/Dashboardadmin"}>
        <button className="house">
          <FontAwesomeIcon icon={faHouse} />
        </button>
      </Link>
      <h4>Abonnements </h4>
      <h5>{allab ? <h5>{allab.length} abonnements </h5> : "loading"} </h5>
      <div className="abonnements">
        {allab &&
          allab.map((item) => {
            return (
              <div key={item._id} className="abonnchild">
                <p> userId : {item.userId} </p>
                <p> Libelle : {item.libelle} </p>
                <p> Date debut : {item.startDate}</p>
                <p> Date fin : {item.endDate}</p>

                <p> prix : {item.amount}</p>
                <p> Status d'Abonnement : {item.status}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Abonnements;
