import React from "react";

const Fail = () => {
  alert("erreur ressayer une autre fois");
  window.location.href = "/Dashboarduser";
  return (
    <div className="p-4">
      <div className="alert alert-danger">fail payment</div>
    </div>
  );
};

export default Fail;
