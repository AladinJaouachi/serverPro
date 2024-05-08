import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/admin/Login";
import Dashboard2 from "./components/admin/Dashboard2";
import HomePage from "./components/visiteur/HomePage";
import Loginuser from "./components/User/Loginuser";
import Registeruser from "./components/User/Registeruser";
import ProtectedRoute from "./ProtectedRoute";
import Dashboarduser from "./components/User/Dashboarduser";
import ProtectedRouteadmin from "./ProtectedRouteAdmin";
import { useSelector } from "react-redux";
import News from "./components/User/News";
import Userlist from "./components/User/Userlist";

import ProfilUser from "./components/User/ProfilUser";
import AboutUs from "./components/AboutUs";
import Demandes from "./components/admin/Demandes";
import Filtreduser from "./components/User/Filtreduser";
import ContactPatron from "./components/ContactPatron";
import Success from "./components/Success";
import Fail from "./components/Fail";
import Abonnements from "./components/User/Abonnements";
import Confirmationdialog from "./components/admin/Confirmationdialog";

function App() {
  const adminprivate = useSelector((state) => state.admin.value);
  const userPrivate = useSelector((state) => state.user.value);

  console.log("adminprivate is :", adminprivate);
  console.log("userprivate is ", userPrivate);
  const [personnalise, setpersonnalise] = useState("");

  const desactivateuser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/user/desactivatethem`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await response.json();
      if (response.status === 200) {
        console.log("users desactivated");
        checkvalidationabonnement();
      } else {
        console.log("user not desactivated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkvalidationabonnement = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/checkingit", {
        method: "POST",
      });
      await response.json();
      if (response.status === 200) {
        console.log("expired abonnements deleted");
      } else {
        console.log("no subscriptions to delete or less than now");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    desactivateuser();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Loginadmin" element={<Login />} />
        <Route
          path="/Dashboardadmin"
          element={
            <ProtectedRouteadmin isAllowed={adminprivate}>
              {" "}
              <Dashboard2 />{" "}
            </ProtectedRouteadmin>
          }
        />

        <Route
          path="/Loginuser"
          element={<Loginuser setpersonnalise={setpersonnalise} />}
        />
        <Route path="/Registeruser" element={<Registeruser />} />
        <Route
          path="/Dashboarduser"
          element={
            <ProtectedRoute isAllowed={userPrivate}>
              {" "}
              <Dashboarduser personnalise={personnalise} />
            </ProtectedRoute>
          }
        />

        <Route path="/news" element={<News />} />
        <Route path="userslist" element={<Userlist />} />
        <Route
          path="/Demandes"
          element={
            <ProtectedRouteadmin isAllowed={adminprivate}>
              <Demandes />
            </ProtectedRouteadmin>
          }
        />
        <Route path="/:id" element={<ProfilUser />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/filtered/:service" element={<Filtreduser />} />
        <Route
          path="/ContactPatron"
          element={
            <ProtectedRouteadmin isAllowed={adminprivate}>
              <ContactPatron />
            </ProtectedRouteadmin>
          }
        />
        <Route path="/success" element={<Success />} />
        <Route path="/fail" element={<Fail />} />
        <Route
          path="/Abonnements"
          element={
            <ProtectedRouteadmin isAllowed={adminprivate}>
              <Abonnements />
            </ProtectedRouteadmin>
          }
        />
        <Route path="/confirmation" element={<Confirmationdialog />} />
      </Routes>
    </div>
  );
}

export default App;
