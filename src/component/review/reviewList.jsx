import React from "react";
import { AiOutlineStar } from "react-icons/ai"; // import star icon
import "./review.css";

const ReviewList = ({ reviews = [] }) => {
  return (
    <div className="review-list">
      {reviews.length === 0 ? (
        <div className="no-reviews">
          {/* Show 5 empty stars */}
          {[...Array(5)].map((_, i) => (
            <AiOutlineStar key={i} size={24} color="#7b1d35" />
          ))}
          <p>
            Be the first to write a review</p>
        </div>
      ) : (
        reviews.map((r) => (
          <div key={r.id} className="review-card">
            <img
              src={r.avatar || "/avatars/default.png"}
              alt={r.name}
              className="review-avatar"
            />
            <div className="review-info">
              <h4>{r.name}</h4>
              <p className="review-rating">{"⭐️".repeat(r.rating)}</p>
              <p>{r.comment}</p>

              {r.photos && r.photos.length > 0 && (
                <div className="review-photos">
                  {r.photos.map((photo, i) => (
                    <img
                      key={i}
                      src={photo}
                      alt="review"
                      className="review-img"
                    />
                  ))}
                </div>
              )}

              <small>{r.date}</small>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
