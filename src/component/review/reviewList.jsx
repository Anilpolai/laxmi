import React from "react";
import { AiOutlineStar } from "react-icons/ai"; // star icon
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
        reviews.map((r) => (
          <div key={r.id} className="review-card">
            <img
              src={r.avatar || "/avatars/default.png"}
              alt={r.name}
              className="review-avatar"
            />
            <div className="review-info">
              <h4>{r.name}</h4>
              <div className="review-rating">
                {"⭐".repeat(r.rating)}
                {/* show empty stars for rest */}
                {"☆".repeat(5 - r.rating)}
              </div>
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

              <small className="review-date">{r.date}</small>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewList;
