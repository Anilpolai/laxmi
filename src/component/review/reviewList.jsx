import React, { useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import "./review.css";

const ReviewList = ({ reviews = [] }) => {
  return (
    <div className="review-list">
      {reviews.length === 0 ? (
        <div className="no-reviews">
          {[...Array(5)].map((_, i) => (
            <AiOutlineStar key={i} size={24} color="#7b1d35" />
          ))}
          <p>Be the first to write a review</p>
        </div>
      ) : (
        reviews.map((r) => <ReviewCard key={r.id} review={r} />)
      )}
    </div>
  );
};

const ReviewCard = ({ review }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div className="review-card">
      <img
        src={review.avatar || "/avatars/default.png"}
        alt={review.name}
        className="review-avatar"
      />
      <div className="review-info">
        <h4>{review.name}</h4>

        <div className="review-rating">
          {"⭐".repeat(review.rating)}
          {"☆".repeat(5 - review.rating)}
        </div>

        {/* ✅ Comment with expand/collapse */}
        <p className={`review-comment ${expanded ? "expanded" : ""}`}>
          {review.comment}
        </p>

        {/* ✅ Only show photos/details if expanded */}
        {expanded && review.photos && review.photos.length > 0 && (
          <div className="review-photos">
            {review.photos.map((photo, i) => (
              <img key={i} src={photo} alt="review" className="review-img" />
            ))}
          </div>
        )}

        {/* ✅ Show Date only if expanded */}
        {expanded && <small className="review-date">{review.date}</small>}

        {/* Expand/Collapse Button */}
        {review.comment.length > 120 || (review.photos && review.photos.length > 0) ? (
          <span className="more-text" onClick={toggleExpanded}>
            {expanded ? "show less" : "Read more"}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default ReviewList;
