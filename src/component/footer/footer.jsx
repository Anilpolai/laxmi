import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { MdCall, MdEmail } from "react-icons/md";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import logo from '../../img/logo-2.png';
import './footer.css';

function Footer() {
    const [openInfo, setOpenInfo] = useState(false);
    const [openShop, setOpenShop] = useState(false);

    return (
        <div className="footer-container text-white">
            <div className="container footer-container1">
                <div className="row gy-4">
                    {/* Logo & Contact */}
                    <div className="col-md-3">
                        <img src={logo} alt="Logo" className="mb-3 footer-logo" />
                        <p>First Floor, Tulsi Arcade, 145, Sudama Chowk, Saket Raw House, Mota Varachha, Surat, Gujarat,394101</p>
                        <p><MdCall className="me-2" />+91 9409222049</p>
                        <p><MdEmail className="me-2" />laxmiethnics0@gmail.com</p>
                    </div>

                    {/* Information */}
                    <div className="col-md-2 footer-section">
                        <div
                            className="footer-toggle"
                            onClick={() => setOpenInfo(!openInfo)}
                        >
                            <h5 className="mb-3">INFORMATION</h5>
                            <span className="toggle-icon">{openInfo ? '-' : '+'}</span>
                        </div>
                        <ul
                            className={`list-unstyled footer-collapse ${openInfo ? 'show' : ''}`}
                        >
                            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link to="/terms-of-service">Terms of Service</Link></li>
                            <li><Link to="/shipping-policy">Shipping Policy</Link></li>
                            <li><Link to="/refund-policy">Refund Policy</Link></li>
                            <li><Link to="/cancellation-policy">Cancellation Policy</Link></li>
                            <li><Link to="/about-us">About Us</Link></li>
                            <li><Link to="/contact-us">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Shop Categories */}
                    <div className="col-md-2 footer-section">
                        <div
                            className="footer-toggle"
                            onClick={() => setOpenShop(!openShop)}
                        >
                            <h5 className="mb-3">SHOP CATEGORIES</h5>
                            <span className="toggle-icon">{openShop ? '-' : '+'}</span>
                        </div>
                        <ul
                            className={`list-unstyled footer-collapse ${openShop ? 'show' : ''}`}
                        >
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/kurti">Kurti</Link></li>
                            <li><Link to="/kurti-set">Kurti-Set</Link></li>
                            <li><Link to="/tunics">Tunics</Link></li>
                            <li><Link to="/co-ord">Co-Ord</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="col-md-5">
                        <h2 className="subscribe-text">
                            Subscribe to get 10% OFF
                        </h2>
                        <br />
                        <p className="subscribe-desc">
                            Celebrate tradition in style. Laxmi Ethnics brings you
                            thoughtfully designed ethnic wear for every occasion, every season.
                        </p>
                        <form className="subscribe-form">
                            <input type="email" placeholder="Enter your email..." />
                            <button type="submit" className="send-icon-btn">
                                <FiSend />
                            </button>
                        </form>

                        <div className="d-flex gap-3 mt-3">
                            <a href="#" className="social-icon"><FaFacebookF /></a>
                            <a href="#" className="social-icon"><FaInstagram /></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full-width Bottom Line */}
            <div className="footer-bottom text-center">
                <p>Copyright © 2025 <span>Laxmi ethnics</span> All rights reserved</p>
            </div>
        </div>
    );
}

export default Footer;
