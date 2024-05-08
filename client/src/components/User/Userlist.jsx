import React, { useEffect, useState } from "react";
import "../../css/Userlist.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

const Userlist = () => {
  const [users, setusers] = useState("");
  const [filtered, setfiltred] = useState("");
  const listofusers = async () => {
    try {
      const response = await fetch("http://localhost:3001/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data) {
        setusers(data.Response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    listofusers();
  });
  return (
    <div className="userlist">
      <button className="house" onClick={() => (window.location.href = "/")}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
      <p>Liste des Services </p>
      <input
        type="text"
        placeholder="Chercher service"
        onChange={(e) => setfiltred(e.target.value)}
      />
      <div className="fatheradmin">
        {users ? (
          users
            .filter((user) => {
              return (
                user.firstname.toLowerCase().includes(filtered.toLowerCase()) ||
                user.lastname.toLowerCase().includes(filtered.toLowerCase()) ||
                user.specialité
                  .toLowerCase()
                  .includes(filtered.toLowerCase()) ||
                user.age.toString().includes(filtered.toLowerCase())
              );
            })
            .map((filtereduser) => {
              return (
                <article key={filtereduser._id}>
                  <Link to={`/${filtereduser._id}`}>
                    <figure>
                      <img src={filtereduser.image} alt="" />
                    </figure>
                    <h3>{filtereduser.firstname}</h3>
                    <h3>{filtereduser.lastname}</h3>
                    <h3>{filtereduser.specialité}</h3>
                    <p>{filtereduser.age} ans </p>
                    <p>{filtereduser.avis.length} avis </p>
                  </Link>
                </article>
              );
            })
        ) : (
          <center>
            <p> Loading ...</p>
          </center>
        )}
      </div>
    </div>
  );
};

export default Userlist;
