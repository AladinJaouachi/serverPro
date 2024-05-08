import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const News = () => {
  const [pubs, setpubs] = useState([]);
  const getpubs = async (e) => {
    try {
      const res = await fetch("http://localhost:3001/pubs/allpubs", {
        method: "GET",
      });
      const data = await res.json();
      setpubs(data.Response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getpubs();
  }, []);
  return (
    <div className="news">
      <button className="house" onClick={() => (window.location.href = "/")}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
      <center>
        <h5>Nouveautés</h5>
      </center>
      <div className="parme">
        {" "}
        {pubs &&
          pubs.map((pub) => {
            return (
              <div key={pub._id} className="children">
                <p>De : {pub.fromwho}</p>
                <p>{pub.pubdate} </p>
                <hr width="90%" />
                <img src={pub.image1} alt="" />
                <h4>{pub.title} </h4>
                <center>
                  <h6>{pub.content} </h6>
                </center>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default News;
