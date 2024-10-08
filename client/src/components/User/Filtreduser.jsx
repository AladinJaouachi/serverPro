import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Filtreduser = () => {
  const param = useParams();
  console.log(param.service);
  const [userfiltred, setuserfiltred] = useState([]);
  const filtred = async (e) => {
    try {
      const response = await fetch("http://localhost:3001/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setuserfiltred(data.Response);
        console.log("hethi hiya", userfiltred);
      } else {
        console.log("me najemch yjib");
      }
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    filtred();
  }, []);

  const hethom = userfiltred.filter((user) =>
    user.specialité.toLowerCase().includes(param.service)
  );

  return (
    <div>
      <button className="house" onClick={() => (window.location.href = "/")}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
      <center>
        <h1>Nos {param.service}s</h1>
      </center>
      <div className="fatheradmin">
        {hethom.length > 0 ? (
          hethom.map((e) => {
            return (
              <article key={e._id}>
                <Link to={`/${e._id}`}>
                  <figure>
                    <img src={e.image} alt="" />
                  </figure>
                  <h2>{e.firstname}</h2>
                  <h2>{e.lastname}</h2>
                  <h2>{e.specialité}</h2>
                  <p>{e.age} ans </p>
                </Link>
              </article>
            );
          })
        ) : (
          <center>
            <h3>no service</h3>
          </center>
        )}
      </div>
    </div>
  );
};

export default Filtreduser;
