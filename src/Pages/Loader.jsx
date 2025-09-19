// src/component/Loader.jsx
import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="bag-3d">
        <div className="front"></div>
        <div className="back"></div>
        <div className="left"></div>
        <div className="right"></div>
        <div className="bottom"></div>
      </div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Loader;
