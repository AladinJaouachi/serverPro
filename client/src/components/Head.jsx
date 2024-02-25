import React from "react";
import { Link } from "react-router-dom";

const Head = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            {" "}
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/"}>about</Link>
          </li>
          <li>
            <Link to={"/"}>contact us</Link>
          </li>
        </ul>
      </nav>
      <Link to={"/Loginadmin"}>
        <button>interface admin </button>
      </Link>
      <Link to={"/loginuser"}>
        <button> interface personnel </button>
      </Link>
    </div>
  );
};

export default Head;
