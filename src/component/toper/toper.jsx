import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaInstagram, FaPinterestP } from 'react-icons/fa';
import './toper.css';

function Topre() {
  const messages = [
    "Sign up for 10% off your first order.",
    "Free shipping on orders above ₹999!",
    "New arrivals dropping this weekend!"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="top-bar">
      <div className="top-content">
        {/* Left Section: Welcome + Icons */}
        <div className="social">
          <span className="welcome">Welcome Laxmienthics store!</span>
          <FaFacebookF />
          <FaInstagram />
          <FaPinterestP />
        </div>

        {/* Center Section: Static Text (changing every 5s) */}
        <div className="scroll-container">
          <p className="scroll-text" key={currentIndex}>
            {messages[currentIndex]}
          </p>
        </div>

        {/* Right Section: Navigation Links */}
        <div className="links">
          <ul>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Help Center</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Topre;
