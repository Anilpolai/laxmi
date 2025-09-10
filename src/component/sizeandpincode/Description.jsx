import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { products } from "../../jsfile/products"; // update path
import "./sizechart.css";

const DescriptionAccordion = ({ productId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const product = products.find((p) => p.id === productId);

  if (!product || !product.descriptionDetails) return null;

  return (
    <div className="accordion">
      {/* Accordion Header */}
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <h4>Description</h4>
        {isOpen ? <FaMinus /> : <FaPlus />}
      </div>
      <hr />

      {/* Accordion Content */}
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <table className="description-table">
          <tbody>
            {product.descriptionDetails.map((item, index) => (
              <tr key={index}>
                <td className="desc-label">{item.label}</td>
                <td className="desc-value">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DescriptionAccordion;
