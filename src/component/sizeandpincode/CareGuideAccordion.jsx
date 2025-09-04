// src/components/sizeandpincode/CareGuideAccordion.jsx
import React, { useState } from "react";
import { FaSoap } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./sizechart.css";

const CareGuideAccordion = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <div
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h4>
          <FaSoap className="accordion-icon" /> Care Guide
        </h4>
        {isOpen ? <FaMinus /> : <FaPlus />}
      </div>
      <hr />
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <p>Dry clean only.</p>
      </div>
    </div>
  );
};

export default CareGuideAccordion;
