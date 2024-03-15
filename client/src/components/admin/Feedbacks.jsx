import React, { useEffect, useState } from "react";
import "../../css/Feedbacks.css";
const Feedbacks = () => {
  const [allfeeds, setallfeeds] = useState("");
  const getfeeds = async (e) => {
    try {
      const response = await fetch("http://localhost:3001/admin/f", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        await setallfeeds(data.Response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletefeeds = async (e) => {
    try {
      const response = await fetch("http://localhost:3001/feeds/fees", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        alert("delete success");
        window.location.reload();
      } else {
        alert(
          "delete failed or maybe no feedbacks to delete it  , retry again "
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getfeeds();
  }, []);

  return (
    <div>
      <div className="feedhead">
        <h1>Feedbacks</h1>
        <button onClick={deletefeeds}>Delete all</button>
      </div>
      <p>This is the feedbacks page</p>
      <div className="feeds">
        {allfeeds ? (
          allfeeds.map((el) => (
            <div key={el._id} className="feedchild">
              <p> From : {el.email}</p>
              <p> Subject : {el.subject}</p>
              <p> Message : {el.message}</p>
              <button
                onClick={async () => {
                  const response = await fetch(
                    `http://localhost:3001/feeds/${el._id}`,
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  const data = await response.json();
                  if (response.status === 200) {
                    alert("delete success");
                    window.location.reload();
                  } else {
                    alert(
                      "delete failed or maybe no feedbacks to delete it  , retry again "
                    );
                  }
                }}
              >
                delete this{" "}
              </button>
            </div>
          ))
        ) : (
          <p>loading ...</p>
        )}
      </div>
    </div>
  );
};

export default Feedbacks;
