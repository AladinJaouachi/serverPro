import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <nav>
        <Link to={"/Login"}>
          <li>Login</li>
        </Link>
      </nav>
      <h1>test</h1>
    </div>
  );
};

export default Home;
