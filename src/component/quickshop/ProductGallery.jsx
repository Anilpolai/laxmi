// src/components/quickshop/ProductGallery.jsx
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductGallery = ({ images, currentIndex, setCurrentIndex, onOpenModal }) => {
  if (!images || images.length === 0) {
    return <p>No images available</p>;
  }

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="quickshop-left">
      {/* Main Image */}
      <div className="main-image" onClick={onOpenModal}>
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, i) =>
            img.endsWith(".mp4") ? (
              <video key={i} src={img} controls />
            ) : (
              <img key={i} src={img} alt={`product-${i}`} />
            )
          )}
        </div>

        {images.length > 1 && (
          <>
            <button className="nav-btn prev" onClick={handlePrev}>
              <FaChevronLeft />
            </button>
            <button className="nav-btn next" onClick={handleNext}>
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      <div className="thumbnails">
        {images.map((img, i) => (
          <div
            key={i}
            className={`thumb ${currentIndex === i ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
          >
            {img.endsWith(".mp4") ? (
              <video src={img} width={80} />
            ) : (
              <img src={img} alt={`thumb-${i}`} width={80} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
