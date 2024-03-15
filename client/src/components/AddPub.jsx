import React, { useState } from "react";
import "../css/Dashboarduser.css";

const AddPub = () => {
  const [newpub, setnewpub] = useState({
    image1: "",
    title: "",
    content: "",
  });
  const handlechange = (req, res) => {
    setnewpub({ ...newpub, [req.target.id]: req.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/pubs/nouvellepub", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newpub),
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log("add perfect", data);
        alert("pub added successfully ");
        window.location.reload();
      } else {
        console.log(data);
        alert("something is wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="addpub">
      <h5>Add Pub</h5>
      <input
        type="text"
        placeholder="image"
        id="image1"
        onChange={handlechange}
      />
      <input
        type="text"
        placeholder="tittle of pub"
        id="title"
        onChange={handlechange}
      />
      <input
        type="text"
        placeholder="content"
        id="content"
        onChange={handlechange}
      />
      <button className="sharepub" onClick={handlesubmit}>
        Share
      </button>
    </div>
  );
};

export default AddPub;
