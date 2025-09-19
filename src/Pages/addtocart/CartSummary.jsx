import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineTruck } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ cartItems, totalPrice }) => {
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 4;
      if (current > 100) {
        clearInterval(interval);
      } else {
        setProgress(current);
      }
    }, 100); // speed of progress
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cart-summary">
      {/* Free Delivery Progress */}
      <div className="delivery-progress">
        {/* Progress Bar */}
        <motion.div
          className="progress-bar animated"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {/* Truck stays at end of line */}
        <motion.div
          className="truck-icon"
          initial={{ left: "0%" }}
          animate={{ left: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
         <HiOutlineTruck />
        </motion.div>
      </div>

      <p className="delivery-note">🚚 Your order is free delivery!</p>

      <div className="special-instructions">
        <label>Special instructions for seller</label>
        <textarea placeholder="Add your notes here..." />
      </div>

      <div className="coupon-section">
        <h4>List Coupon</h4>
        <p className="offer-text">
          GET 10% OFF ON PREPAID : USE CODE <strong>RAKHI10</strong> AT CHECKOUT
        </p>

        <div className="coupon-box">
          <input
            type="text"
            placeholder="Enter coupon"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button onClick={() => alert("Coupon applied!")}>SAVE</button>
        </div>
      </div>

      <div className="total-section">
        <p>Total</p>
        <h3>₹{totalPrice.toFixed(2)}</h3>
        <small>Taxes and shipping calculated at checkout</small>
      </div>

      <button className="checkout-btn" onClick={() => navigate("/checkout")}>
        CHECK OUT
      </button>
    </div>
  );
};

export default CartSummary;
