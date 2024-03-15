import React, { useEffect, useState } from "react";
import "../../css/Userlist.css";
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
      <p>this is our userlist </p>
      <input
        type="text"
        placeholder="search user "
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
                  <figure>
                    <img src={filtereduser.image} alt="" />
                  </figure>
                  <h2>{filtereduser.firstname}</h2>
                  <h2>{filtereduser.lastname}</h2>
                  <h2>{filtereduser.specialité}</h2>
                  <p>{filtereduser.age} ans </p>
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
