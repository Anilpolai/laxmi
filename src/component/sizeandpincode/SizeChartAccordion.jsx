// src/components/quickshop/SizeChartAccordion.jsx
import React, { useState } from "react";
import { FaRuler } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./sizechart.css";
import { SizeChart } from "../../jsfile/size";

const SizeChartAccordion = () => {
  const { sizeChart } = SizeChart;
  const [isOpen, setIsOpen] = useState(false);

  if (!sizeChart || sizeChart.length === 0) return null;

  return (
    <div className="accordion">
      {/* Accordion Header */}
      <div
        className="accordion-header"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <h4 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaRuler className="accordion-icon" /> Size Chart
        </h4>
        {isOpen ? <FaMinus /> : <FaPlus />}
      </div>
      <hr />

      {/* Accordion Content with smooth effect */}
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <table className="size-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest</th>
              <th>Waist</th>
              <th>Length</th>
            </tr>
          </thead>
          <tbody>
            {sizeChart.map((size, i) => (
              <tr key={i}>
                <td>{size.label}</td>
                <td>{size.chest}</td>
                <td>{size.waist}</td>
                <td>{size.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SizeChartAccordion;
