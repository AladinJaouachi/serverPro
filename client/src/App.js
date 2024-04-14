import React, { useState } from "react";

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

function App() {
  const adminprivate = useSelector((state) => state.admin.value);
  const userPrivate = useSelector((state) => state.user.value);

  console.log("adminprivate is :", adminprivate);
  console.log("userprivate is ", userPrivate);
  const [personnalise, setpersonnalise] = useState("");
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
      </Routes>
    </div>
  );
}

export default App;
