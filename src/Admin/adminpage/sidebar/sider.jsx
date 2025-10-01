import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
    FaTachometerAlt,
    FaBox,
    FaList,
    FaPlus,
    FaMinus,
    FaTags,
    FaShoppingCart,
    FaReceipt,
    FaBars,
    FaStore,
} from "react-icons/fa";
import "./sider.css";

function Sider() {
    const [isOpen, setIsOpen] = useState(true);
    const [openMenu, setOpenMenu] = useState("");

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleMenu = (menu) => {
        setOpenMenu(openMenu === menu ? "" : menu);
    };

    return (
        <aside className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
            {/* Top Logo + Toggle Button */}
            <div className="sidebar-top">
                <div className="logo-area">
                    <FaStore className="logo-icon" />
                    {isOpen && <h2 className="sidebar-title">Admin Panel</h2>}
                </div>
                <FaBars className="toggle-btn" onClick={toggleSidebar} />
            </div>

            {/* Menu */}
            <nav className="sidebar-nav">
                {/* Dashboard */}
                <NavLink to="/dashboard" className="sidebar-link">
                    <div className="link-content">
                        <FaTachometerAlt />
                        {isOpen && <span>Dashboard</span>}
                    </div>
                </NavLink>

                {/* Products */}
                <div className="sidebar-dropdown">
                    <div
                        className="sidebar-link"
                        onClick={() => toggleMenu("products")}
                        title="Products"
                    >
                        <div className="link-content">
                            <FaBox />
                            {isOpen && <span>Products</span>}
                        </div>
                        {isOpen &&
                            (openMenu === "products" ? (
                                <FaMinus className="sidebar-link-icon" />
                            ) : (
                                <FaPlus className="sidebar-link-icon" />
                            ))}
                    </div>
                    {isOpen && openMenu === "products" && (
                        <div className="sidebar-submenu">
                            <NavLink to="/products/list" className="sidebar-sublink">
                                <FaList /> Product List
                            </NavLink>
                            <NavLink to="/products/addproduct" className="sidebar-sublink">
                                <FaPlus /> Create Product
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* Orders */}
                <div className="sidebar-dropdown">
                    <div
                        className="sidebar-link"
                        onClick={() => toggleMenu("orders")}
                        title="Orders"
                    >
                        <div className="link-content">
                            <FaShoppingCart />
                            {isOpen && <span>Orders</span>}
                        </div>
                        {isOpen &&
                            (openMenu === "orders" ? (
                                <FaMinus className="sidebar-link-icon" />
                            ) : (
                                <FaPlus className="sidebar-link-icon" />
                            ))}
                    </div>
                    {isOpen && openMenu === "orders" && (
                        <div className="sidebar-submenu">
                            <NavLink to="/orders/orders" className="sidebar-sublink">
                                <FaList /> Order List
                            </NavLink>
                            <NavLink to="/orders/track" className="sidebar-sublink">
                                <FaReceipt /> Track Order
                            </NavLink>
                            <NavLink to="/orders/invoice" className="sidebar-sublink">
                                <FaReceipt /> Invoice
                            </NavLink>
                            <NavLink to="/orders/completed" className="sidebar-sublink">
                                <FaReceipt /> Completed
                            </NavLink>
                        </div>
                    )}
                </div>
            </nav>
        </aside>
    );
}

export default Sider;
