import React, { useEffect, useState } from "react";
import "../../css/Profiluser.css";
import { useParams } from "react-router-dom";

const ProfilUser = () => {
  const [getstat, setgetstat] = useState("");
  const url = useParams().id;

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
        setgetstat(data.Response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    searchoneuser();
  }, []);

  return (
    <div>
      <div className="myuser">
        <img src={getstat.image} alt="" />
        <h4>first name : {getstat.firstname} </h4>
        <h4> last name :{getstat.lastname} </h4>
        <h4>specialité : {getstat.specialité} </h4>
        <hr />
        <h4>Email : {getstat.email} </h4>
        <h4>phone number : {getstat.phone} </h4>
        <h4>gender : {getstat.gender} </h4>
        <h4>adress : {getstat.place} </h4>
        <h4>age : {getstat.age} </h4>
      </div>
    </div>
  );
};

export default ProfilUser;
