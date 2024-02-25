import React from "react";
import AddPub from "./../AddPub";

const Dashboarduser = ({ setfirstuser }) => {
  const logout = () => {
    setfirstuser(false);
    navigator("/");
  };
  return (
    <div>
      Dashboarduser
      <br />
      <button onClick={logout}>logout</button>
      <AddPub />
    </div>
  );
};

export default Dashboarduser;
