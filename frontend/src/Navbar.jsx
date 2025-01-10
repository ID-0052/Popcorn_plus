import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="navbar-link">
          <h1>Popcorn+</h1>
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/create-movie" className="navbar-link">
          Add Movie
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
