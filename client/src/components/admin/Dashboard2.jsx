import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPub from "../AddPub";

const Dashboard2 = ({ setfirst }) => {
  const navigator = useNavigate();
  const [users, setusers] = useState(null);
  useEffect(() => {
    const getusers = async (e) => {
      try {
        const res = await fetch("http://localhost:3001/user/allusers", {
          method: "GET",
        });
        const data = await res.json();
        if (data) {
          return setusers(data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getusers();
  }, []);

  const logout = async (e) => {
    localStorage.removeItem("token");
    setfirst(false);
    navigator("/");
  };
  return (
    <div>
      <h1>this is admin dashboard </h1>
      <AddPub />
      <button onClick={logout}>Logout</button>
      <div>
        {users &&
          users.map((user) => {
            return (
              <div key={user._id}>
                <img src={user.image} alt="userimage" />
                <p>{user.firstname} </p>
                <p>{user.lastname} </p>
                <p>{user.age} </p>

                <p>{user.gender} </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard2;
