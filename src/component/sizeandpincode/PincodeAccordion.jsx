// src/components/quickshop/PincodeAccordion.jsx
import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { ServiceablePincodes } from "../../jsfile/pincode"; // ✅ dynamic import
import "./sizechart.css";

const PincodeAccordion = () => {
  const [pincode, setPincode] = useState("");
  const [availability, setAvailability] = useState(null);

  const handleCheckPincode = () => {
    if (pincode.trim() === "") {
      setAvailability("❌ Please enter a valid pincode");
    } else if (ServiceablePincodes.includes(pincode)) {
      setAvailability("✅ Delivery available to your area!");
    } else {
      setAvailability("🚫 Sorry, delivery not available in this area.");
    }
  };

  return (
    <div className="accordion">
      <h4>
        <FaMapMarkerAlt className="accordion-icon" /> Check Delivery Availability
      </h4>
      <hr />
      <div className="pincode-check">
        <input
          type="text"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
        <button onClick={handleCheckPincode}>Check</button>
        {availability && <p className="availability">{availability}</p>}
      </div>
    </div>
  );
};

export default PincodeAccordion;
