// QuickshopPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../redux/slice/wishlistSlice";
import { kurti as productData } from "../../jsfile/kurti";
import { FaTruck, FaSoap, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReviewSection from "../review/review";
import "./quickshop.css";

const QuickshopPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlist = useSelector((state) => state.wishlist.items);

  const product = productData.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!product) {
    return <div className="p-4 text-red-500">❌ Product not found</div>;
  }

  const isWishlisted = wishlist.includes(product.id);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const mainImage = product.images[currentIndex];

  return (
    <div className="quickshop-page">
      <div className="quickshop-content">
        {/* Left: Images */}
        <div className="quickshop-left">
          <div className="main-image">
            <div
              className="slider-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {product.images.map((img, i) =>
                img.endsWith(".mp4") ? (
                  <video key={i} src={img} controls />
                ) : (
                  <img key={i} src={img} alt={product.name} />
                )
              )}
            </div>

            {/* Navigation buttons */}
            <button className="nav-btn prev" onClick={handlePrev}>
              <FaChevronLeft />
            </button>
            <button className="nav-btn next" onClick={handleNext}>
              <FaChevronRight />
            </button>
          </div>

          <div className="thumbnails">
            {product.images?.map((img, i) => (
              <div
                key={i}
                className={`thumb ${currentIndex === i ? "active" : ""}`}
                onClick={() => setCurrentIndex(i)}
              >
                {img.endsWith(".mp4") ? (
                  <video src={img} width={80} />
                ) : (
                  <img src={img} alt="" width={80} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="quickshop-right">
          <button className="close-btn" onClick={() => navigate(-1)}>
            ✕
          </button>
          <h2>{product.name}</h2>
          <p className="price">₹{product.price}</p>
          {product.discount && (
            <p className="discount">{product.discount}% OFF</p>
          )}
          <p>{product.description}</p>

          <div className="sizes">
            {product.sizes?.map((size) => (
              <button
                key={size}
                className={selectedSize === size ? "active" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="product-actions">
            <div className="quantity">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>

            <button className="add-to-cart">Add to Cart</button>

            <button
              className={`wishlist ${isWishlisted ? "active" : ""}`}
              onClick={() => dispatch(toggleWishlist(product.id))}
            >
              {isWishlisted ? "❤️ Wishlisted" : "♡ Add to Wishlist"}
            </button>
          </div>

          <div className="accordion">
            <h4>
              <FaTruck className="accordion-icon" /> Shipping Information
            </h4>
            <hr />
            <p>Ships in 3-5 business days.</p>
          </div>

          <div className="accordion">
            <h4>
              <FaSoap className="accordion-icon" /> Care Guide
            </h4>
            <hr />
            <p>Dry clean only.</p>
          </div>

          <ReviewSection reviews={product.reviews || []} />
        </div>
      </div>
    </div>
  );
};

export default QuickshopPage;
