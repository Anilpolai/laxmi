// src/components/review/FullReviewPanel.jsx
import React, { useState } from "react";
import ReviewList from "./reviewList";
import "./review.css";

const FullReviewPanel = ({ reviews = [] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="full-review-panel">
      <div className="review-header">
        <button 
          className="toggle-btn" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Hide Full List" : "Show Full List"}
        </button>
      </div>

      {/* Animated Expand/Collapse */}
      <div className={`review-expand ${isOpen ? "open" : ""}`}>
        <div className="review-grid">
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </div>
  );
};

export default FullReviewPanel;
