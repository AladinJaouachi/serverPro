import React, { useEffect, useState } from "react";

import "./App.css";

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
// import Dashboarduser from "./components/User/Dashboarduser";

// import Head from "./components/Head";

function App() {
  const [first, setfirst] = useState(false);
  const [firstuser, setfirstuser] = useState(false);
  // const nav1 = () => {
  //   navigator("/Dashboarduser");
  // };

  // const nav2 = () => {
  //   navigator("/Loginuser");
  // };
  const changefirst = () => {
    const a = localStorage.getItem("token");
    if (a) {
      setfirst(true);
      console.log(a);
    } else {
      setfirst(false);
    }
  };

  const changefirstuser = () => {
    const b = localStorage.getItem("tokenuser");
    if (b) {
      setfirstuser(true);
      console.log(b);
    } else {
      setfirstuser(false);
    }
  };

  // console.log(first);
  // console.log(firstuser);

  useEffect(() => {
    changefirst();
    changefirstuser();
  }, []);

  return (
    <div className="App">
      {/* <Head /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />

        {/* <Route path="/RegisterX" element={<RegisterX />} /> */}
        <Route path="/Loginadmin" element={<Login setfirst={setfirst} />} />
        <Route path="/admin" element={<Home />} />
        <Route
          path="/Dashboardadmin"
          element={
            <ProtectedRouteadmin isAllowed={first}>
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
            <ProtectedRoute isAllowed={firstuser}>
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
