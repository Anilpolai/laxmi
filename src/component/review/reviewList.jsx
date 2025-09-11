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

        <p className={`review-comment ${expanded ? "expanded" : ""}`}>
          {review.comment}
        </p>

        {review.comment.length > 120 && (
          <span className="more-text" onClick={toggleExpanded}>
            {expanded ? "show less" : "…more"}
          </span>
        )}

        {review.photos && review.photos.length > 0 && (
          <div className="review-photos">
            {review.photos.map((photo, i) => (
              <img key={i} src={photo} alt="review" className="review-img" />
            ))}
          </div>
        )}

        <small className="review-date">{review.date}</small>
      </div>
    </div>
  );
};

export default ReviewList;
