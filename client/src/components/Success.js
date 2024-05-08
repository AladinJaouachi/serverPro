import { useEffect } from "react";

const Success = () => {
  const id = localStorage.getItem("iduser");

  const useractiver = async () => {
    try {
      const response = await fetch(`http://localhost:3001/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: await JSON.stringify({ isactivate: true }),
      });
      await response.json();

      if (response.status === 200) {
        alert("abonnemet activé avec succées");
        window.location.href = "/Dashboarduser";
      } else {
        alert("erreur! refraicher la page");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createabonn = async () => {
    try {
      const response = await fetch("http://localhost:3001/user/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
      });
      await response.json();

      if (response.status === 200) {
        useractiver();
      } else {
        alert("erreur! refraicher la page");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    createabonn();
  }, []);
  return (
    <div className="p-4">
      <div className="alert alert-success">Payment success</div>
    </div>
  );
};

export default Success;
