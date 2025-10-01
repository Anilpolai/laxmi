import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import "./header2.css";

function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="admin-header">
      {/* Left Side */}
      <div className="header-left">
        <Link to="/dashboard" className="welcome-text">
          Welcome, Admin
        </Link>
      </div>

      {/* Right Side */}
      <div className="header-right">


        <div className="profile">
          <img
            src="https://via.placeholder.com/40"
            alt="Admin Profile"
            className="profile-img"
            onClick={() => setDropdown(!dropdown)}
          />

          {dropdown && (
            <div className="dropdown-menu">
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
