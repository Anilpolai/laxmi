// src/components/review/ReviewSection.jsx
import React, { useState } from "react";
import "./review.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addReview, selectReviewsByProduct } from "../../redux/slice/rootslice";

const ReviewSection = ({ productId }) => {
  const dispatch = useDispatch();

  // Redux se reviews lao
  const reviews = useSelector((state) => selectReviewsByProduct(state, productId));

  // Naya review form state
  const [newReview, setNewReview] = useState({
    name: "",
    avatar: "",
    rating: 0,
    comment: "",
    photos: [],
  });

  // Profile pic upload
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewReview({ ...newReview, avatar: URL.createObjectURL(file) });
    }
  };

  // Product photo upload
  const handlePhotosUpload = (e) => {
    const files = Array.from(e.target.files);
    const photoURLs = files.map((file) => URL.createObjectURL(file));
    setNewReview({ ...newReview, photos: [...newReview.photos, ...photoURLs] });
  };

  // Submit review
  const handleSubmit = () => {
    if (!newReview.name || !newReview.rating || !newReview.comment) {
      toast.error("⚠️ Please fill all fields!");
      return;
    }

    const newEntry = {
      ...newReview,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
    };

    // Redux me save karo
    dispatch(addReview({ productId, review: newEntry }));

    // Form reset
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
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
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
