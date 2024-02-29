import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/admin/Home";

import { Route, Routes } from "react-router-dom";
// import Register from "./components/Register";
import Login from "./components/admin/Login";

import Dashboard2 from "./components/admin/Dashboard2";
import HomePage from "./components/visiteur/HomePage";
import Loginuser from "./components/User/Loginuser";
import Registeruser from "./components/User/Registeruser";
import ProtectedRoute from "./ProtectedRoute";
import Dashboarduser from "./components/User/Dashboarduser";
import ProtectedRouteadmin from "./ProtectedRouteAdmin";
import { useSelector } from "react-redux";

function App() {
  const adminprivate = useSelector((state) => state.admin.value);
  const userPrivate = useSelector((state) => state.user.value);

  console.log("adminprivate is :", adminprivate);
  console.log("userprivate is ", userPrivate);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Loginadmin" element={<Login />} />
        <Route path="/admin" element={<Home />} />
        <Route
          path="/Dashboardadmin"
          element={
            <ProtectedRouteadmin isAllowed={adminprivate}>
              {" "}
              <Dashboard2 />{" "}
            </ProtectedRouteadmin>
          }
        />

        <Route path="/Loginuser" element={<Loginuser />} />
        <Route path="/Registeruser" element={<Registeruser />} />
        <Route
          path="/Dashboarduser"
          element={
            <ProtectedRoute isAllowed={userPrivate}>
              {" "}
              <Dashboarduser />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
