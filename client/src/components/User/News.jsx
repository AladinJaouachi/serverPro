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
      <p>this is news list </p>
      <div className="fatherchildren">
        {" "}
        {pubs &&
          pubs.map((pub) => {
            return (
              <div key={pub._id} className="children">
                <img src={pub.image} alt="" />
                <p>{pub.title} </p>
                <p>{pub.content} </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default News;
