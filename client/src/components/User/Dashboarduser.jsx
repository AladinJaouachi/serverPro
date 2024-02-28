import React, { useEffect, useState } from "react";
import AddPub from "./../AddPub";
import "../../css/Dashboarduser.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeStateUser } from "../../Redux/slice/Userslice";

const Dashboarduser = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const [pubs, setpubs] = useState([]);
  const logout = async (e) => {
    localStorage.removeItem("token");
    dispatch(changeStateUser(false));

    navigator("/");
    alert("logout success ");
  };
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
      Dashboarduser
      <br />
      <AddPub />
      <button onClick={logout}>Logout</button>
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

export default Dashboarduser;
