// src/components/sizeandpincode/ShippingAccordion.jsx
import React, { useState } from "react";
import { FaTruck } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./sizechart.css";

const ShippingAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <div
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4>
          <FaTruck className="accordion-icon" /> Shipping Information
        </h4>
        {isOpen ? <FaMinus /> : <FaPlus />}
      </div>
      <hr />
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <p>Ships in 3-5 business days.</p>
      </div>
    </div>
  );
};

export default ShippingAccordion;
