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
    <div>
      <center>
        <h5>Nouveautés</h5>
      </center>
      <div className="fatherchildren">
        {" "}
        {pubs &&
          pubs.map((pub) => {
            return (
              <div key={pub._id} className="children">
                <p>De : {pub.fromwho}</p>
                <p>{pub.pubdate} </p>
                <hr width="90%" />
                <img src={pub.image1} alt="" />
                <h3>{pub.title} </h3>
                <h3>{pub.content} </h3>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default News;
