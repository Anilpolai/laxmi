// src/components/quickshop/ImageModal.jsx
import React, { useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ImageModal = ({ isOpen, onClose, images, currentIndex, setCurrentIndex }) => {
  if (!isOpen) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images]);

  return (
    <div className="image-modal">
      <span className="close-btn" onClick={onClose}>
        &times;
      </span>

      {images[currentIndex].endsWith(".mp4") ? (
        <video src={images[currentIndex]} controls autoPlay className="modal-media" />
      ) : (
        <img src={images[currentIndex]} alt="modal-product" className="modal-media" />
      )}

      {images.length > 1 && (
        <>
          <button className="modal-nav prev" onClick={handlePrev}>
            <FaChevronLeft />
          </button>
          <button className="modal-nav next" onClick={handleNext}>
            <FaChevronRight />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageModal;
