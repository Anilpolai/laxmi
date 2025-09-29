import React from "react";
import Header2 from "./adminpage/headre/header2"; 
import Sider from "./adminpage/sidebar/sider";
import "./admin.css";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="admin-layout">
      <Sider />
      <div className="admin-main">
        <Header2 />
        <div className="admin-content">
          <Outlet /> {/* ✅ child pages will load here */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
