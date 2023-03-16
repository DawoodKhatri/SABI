import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar py-3">
      <div className="container-fluid justify-content-end px-2">
        <Link to="./login">
          <button className="btn btn-outline-warning mx-2">Log in</button>
        </Link>
        <Link to="./signup">
          <button className="btn btn-outline-warning mx-2">Sign up</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
