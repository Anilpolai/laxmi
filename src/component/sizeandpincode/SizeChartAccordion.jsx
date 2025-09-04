// src/components/quickshop/SizeChartAccordion.jsx
import React, { useState } from "react";
import { FaRuler } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import "./sizechart.css";
import { SizeChart } from "../../jsfile/size";

const SizeChartAccordion = () => {
    const { sizeChart ,pantChart } = SizeChart;
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

            {/* Accordion Content */}
            <div className={`accordion-content ${isOpen ? "open" : ""}`}>
                {/* Kurti Table */}
                {sizeChart?.length > 0 && (
                    <>
                        <h5>Kurti Size</h5>
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
                    </>
                )}

                {/* Pant Table */}
                {pantChart?.length > 0 && (
                    <>
                        <h5>Pant Size</h5>
                        <table className="size-table">
                            <thead>
                                <tr>
                                    <th>Size</th>
                                    <th>Waist</th>
                                    <th>Hips</th>
                                    <th>Length</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pantChart.map((pant, i) => (
                                    <tr key={i}>
                                        <td>{pant.label}</td>
                                        <td>{pant.waist}</td>
                                        <td>{pant.hips}</td>
                                        <td>{pant.length}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default SizeChartAccordion;
