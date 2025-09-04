import React, { useState } from "react";
import "./review.css";

const ReviewSection = ({ reviews }) => {
  const [allReviews, setAllReviews] = useState(reviews);
  const [newReview, setNewReview] = useState({
    name: "",
    avatar: "",
    rating: 0,
    comment: "",
    photos: [], // ✅ product photos
  });

  // Avatar Upload (profile photo)
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewReview({ ...newReview, avatar: URL.createObjectURL(file) });
    }
  };

  // Product Photos Upload (multiple)
  const handlePhotosUpload = (e) => {
    const files = Array.from(e.target.files);
    const photoURLs = files.map((file) => URL.createObjectURL(file));
    setNewReview({ ...newReview, photos: [...newReview.photos, ...photoURLs] });
  };

  const handleSubmit = () => {
    if (!newReview.name || !newReview.rating || !newReview.comment) {
      alert("Please fill all fields!");
      return;
    }
    const newEntry = {
      ...newReview,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
    };
    setAllReviews([newEntry, ...allReviews]);
    setNewReview({ name: "", avatar: "", rating: 0, comment: "", photos: [] });
  };

  return (
    <div className="review-section">
      <h3>Customer Reviews</h3>

      {/* Review Form */}
      <div className="review-form">
        <input
          type="text"
          placeholder="Your Name"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
        />

        {/* Avatar Upload */}
        <label>Upload Profile Photo:</label>
        <input type="file" accept="image/*" onChange={handleAvatarUpload} />

        {/* Product Photos Upload */}
        <label>Upload Product Photos:</label>
        <input type="file" accept="image/*" multiple onChange={handlePhotosUpload} />

        {/* Rating */}
        <select
          value={newReview.rating}
          onChange={(e) =>
            setNewReview({ ...newReview, rating: Number(e.target.value) })
          }
        >
          <option value="0">Select Rating</option>
          <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
          <option value="4">⭐️⭐️⭐️⭐️</option>
          <option value="3">⭐️⭐️⭐️</option>
          <option value="2">⭐️⭐️</option>
          <option value="1">⭐️</option>
        </select>

        <textarea
          placeholder="Write your review..."
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
        />

        {/* Preview selected product photos */}
        {newReview.photos.length > 0 && (
          <div className="preview-photos">
            {newReview.photos.map((photo, i) => (
              <img key={i} src={photo} alt="preview" className="preview-img" />
            ))}
          </div>
        )}

        <button onClick={handleSubmit}>Submit Review</button>
      </div>

      {/* Display Reviews */}
      <div className="review-list">
        {allReviews.length === 0 ? (
          <p>No reviews yet. Be the first to review!</p>
        ) : (
          allReviews.map((r) => (
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

                {/* Product photos inside review */}
                {r.photos && r.photos.length > 0 && (
                  <div className="review-photos">
                    {r.photos.map((photo, i) => (
                      <img key={i} src={photo} alt="review" className="review-img" />
                    ))}
                  </div>
                )}

                <small>{r.date}</small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
