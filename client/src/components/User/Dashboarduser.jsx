import React from "react";

const Dashboarduser = ({ setfirstuser }) => {
  const logout = () => {
    setfirstuser(false);
    navigator("/");
  };
  return (
    <div>
      Dashboarduser
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Dashboarduser;
