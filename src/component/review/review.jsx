// src/components/review/ReviewSection.jsx
import React, { useState } from "react";
import "./review.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addReview, selectReviewsByProduct } from "../../redux/slice/rootslice";

const ReviewSection = ({ productId, onClose }) => {
  const dispatch = useDispatch();

  const reviews = useSelector((state) =>
    selectReviewsByProduct(state, productId)
  );

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
      date: new Date().toLocaleDateString(),
    };

    dispatch(addReview({ productId, review: newEntry }));

    setNewReview({ name: "", avatar: "", rating: 0, comment: "", photos: [] });

    toast.success("✅ Review submitted successfully!");

    // ✅ Auto close modal
    if (onClose) onClose();
  };

  return (
    <div className="review-section-wrapper">
      <h2>Customer Reviews</h2>

      <div className="review-form">
        <input
          type="text"
          placeholder="Your Name"
          value={newReview.name}
          onChange={(e) =>
            setNewReview({ ...newReview, name: e.target.value })
          }
        />

        {/* Photo Uploads */}
        <div className="photo-upload-wrapper">
          {/* Profile Photo */}
          <div className="photo-upload-box">
            {newReview.avatar ? (
              <img
                src={newReview.avatar}
                alt="profile"
                className="uploaded-photo"
              />
            ) : (
              <label className="photo-label">
                <span className="plus-icon">+</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  hidden
                />
                Profile
              </label>
            )}
          </div>

          {/* Product Photos */}
          <div className="photo-upload-box">
            {newReview.photos.length > 0 ? (
              <div className="uploaded-photos">
                {newReview.photos.map((photo, i) => (
                  <img
                    key={i}
                    src={photo}
                    alt="product"
                    className="uploaded-photo"
                  />
                ))}
              </div>
            ) : (
              <label className="photo-label">
                <span className="plus-icon">+</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotosUpload}
                  hidden
                />
                Product
              </label>
            )}
          </div>
        </div>

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

        <button onClick={handleSubmit}>Submit Review</button>
      </div>
    </div>
  );
};

export default ReviewSection;
