import React, { useState } from "react";

const AddPub = () => {
  const [newpub, setnewpub] = useState({
    image: "",
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
      } else {
        console.log(data);
        alert("something is wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input type="text" id="image" onChange={handlechange} />
      <input type="text" id="title" onChange={handlechange} />
      <input type="text" id="content" onChange={handlechange} />
      <button onClick={handlesubmit}>share</button>
    </div>
  );
};

export default AddPub;
