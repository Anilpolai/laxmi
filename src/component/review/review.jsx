import React, { useState } from "react";
import "./review.css";
import ReviewList from "./reviewList";
import { toast } from "react-toastify";

const ReviewSection = ({ reviews }) => {
  const [allReviews, setAllReviews] = useState(reviews || []);
  const [newReview, setNewReview] = useState({
    name: "",
    avatar: "",
    rating: 0,
    comment: "",
    photos: [],
  });

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewReview({ ...newReview, avatar: URL.createObjectURL(file) });
    }
  };

  const handlePhotosUpload = (e) => {
    const files = Array.from(e.target.files);
    const photoURLs = files.map((file) => URL.createObjectURL(file));
    setNewReview({ ...newReview, photos: [...newReview.photos, ...photoURLs] });
  };

  const handleSubmit = () => {
    if (!newReview.name || !newReview.rating || !newReview.comment) {
      toast.error("⚠️ Please fill all fields!");
      return;
    }

    const newEntry = {
      ...newReview,
      id: Date.now(),
      date: new Date().toLocaleDateString(), // nicer format
    };

    setAllReviews([newEntry, ...allReviews]);
    setNewReview({ name: "", avatar: "", rating: 0, comment: "", photos: [] });

    toast.success("✅ Review submitted successfully!");
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

        <label>Upload Profile Photo:</label>
        <input type="file" accept="image/*" onChange={handleAvatarUpload} />

        <label>Upload Product Photos:</label>
        <input type="file" accept="image/*" multiple onChange={handlePhotosUpload} />

        <select
          value={newReview.rating}
          onChange={(e) =>
            setNewReview({ ...newReview, rating: Number(e.target.value) })
          }>
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

        {newReview.photos.length > 0 && (
          <div className="preview-photos">
            {newReview.photos.map((photo, i) => (
              <img key={i} src={photo} alt="preview" className="preview-img" />
            ))}
          </div>
        )}

        <button onClick={handleSubmit}>Submit Review</button>
      </div>
    </div>
  );
};

export default ReviewSection;
