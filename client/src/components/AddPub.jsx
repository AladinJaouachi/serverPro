import React, { useState } from "react";
import "../css/Dashboarduser.css";
import axios from "axios";

const AddPub = () => {
  const n = localStorage.getItem("name");
  const p = localStorage.getItem("prenom");
  const idp = localStorage.getItem("iduser");

  const [newpub, setnewpub] = useState({
    image1: "",
    pubdate: new Date(),
    fromwho: `${n} ${p}`,
    title: "",
    content: "",
    idperson: `${idp}`,
  });
  console.log(newpub);
  const handlechange = (req, res) => {
    setnewpub({ ...newpub, [req.target.id]: req.target.value });
  };

  const handlesubmit = async (e) => {
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
        alert("publication ajouté ");
        window.location.reload();
      } else {
        console.log(data);
        alert("erreur");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [imgtosend, setimgtosend] = useState(null);
  const [ready, setready] = useState(false);
  const uploadimage = async (e) => {
    const form = new FormData();
    form.append("file", imgtosend);
    form.append("upload_preset", "Aladinjaw");

    if (imgtosend == null) {
      handlesubmit();
    } else {
      await axios
        .post("https://api.cloudinary.com/v1_1/dseusisyl/upload", form)
        .then(async (result) => {
          if (result.status === 200) {
            await setnewpub({
              ...newpub,
              image1: result.data.secure_url,
            });

            await setready(true);
          } else {
            console.log("error axios");
          }
        });
    }
  };

  return (
    <div className="addpub">
      <h5>Ajouter publication</h5>
      <input
        type="file"
        placeholder="image"
        id="image1"
        onChange={(e) => setimgtosend(e.target.files[0])}
      />
      <input
        type="text"
        placeholder="titre"
        id="title"
        onChange={handlechange}
      />
      <input
        type="text"
        placeholder="contenu"
        id="content"
        onChange={handlechange}
      />

      {ready ? (
        <button type="button" onClick={handlesubmit}>
          confirmer
        </button>
      ) : (
        <button
          className="sharepub"
          onClick={(e) => {
            uploadimage();
            e.target.textContent = "attendez...";
          }}
        >
          Publier
        </button>
      )}
    </div>
  );
};

export default AddPub;
