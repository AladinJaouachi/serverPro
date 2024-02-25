import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Head from "../Head";
import "../../css/HomePage.css";

const HomePage = () => {
  const [pubs, setpubs] = useState([]);
  useEffect(() => {
    const getpubs = async (e) => {
      try {
        const res = await fetch("http://localhost:3001/pubs/allpubs", {
          method: "GET",
        });
        const data = await res.json();
        // console.log(data.Response);
        setpubs(data.Response);
      } catch (error) {
        console.log(error);
      }
    };
    getpubs();
  }, []);
  return (
    <div>
      <Head />
      <br />
      <h1>nouveautés</h1>
      <div className="fatherchildren">
        {" "}
        {pubs &&
          pubs.map((pub) => {
            return (
              <div key={pub._id} className="children">
                <img src={pub.image && pub.image} alt="" />
                <p>{pub.title} </p>
                <p>{pub.content} </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;
