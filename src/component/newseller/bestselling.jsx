import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { products as productData } from "../../js file/products";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./bestselling.css";

export default function BestSellers() {
  const [wishlist, setWishlist] = useState([]);

  // Load from localStorage when component mounts
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  // Save to localStorage whenever wishlist changes
  // useEffect(() => {
  //   localStorage.setItem("wishlist", JSON.stringify(wishlist));
  // }, [wishlist]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const options = {
    margin: 15,
    loop: productData.length > 5,
    nav: true,
    dots: false,
    navText: ["&#10094;", "&#10095;"],
    responsive: {
      0: { items: 2 },
      576: { items: 2 },
      768: { items: 3 },
      992: { items: 4 },
      1200: { items: 5 },
    },
  };

  return (
    <div className="best-sellers-section">
      <div className="text-center mb-4">
        <p className="section-tagline">STAY AHEAD OF THE FASHION CURVE</p>
        <h2 className="section-title">Best Sellers</h2>
        <p className="section-subtitle">
          Our Most Loved Ethnic Wear, Handpicked for You
        </p>
      </div>

      {productData.length > 0 && (
        <OwlCarousel className="owl-theme" {...options}>
          {productData.map((product) => (
            <div key={product.id} className="product-card item">
              <div className="product-image">
                <img src={product.image} alt={product.name} className="main-img" />
                <img src={product.hoverimage} alt={`${product.name} Hover`} className="hover-img" />

                {/* Wishlist Button */}
                <button
                  className={`icon-btn wishlist ${wishlist.includes(product.id) ? "active" : ""}`}
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Toggle Wishlist"
                >
                  {wishlist.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
                </button>

                {/* View Button */}
                <button className="icon-btn view" aria-label="View Product">
                  <FiEye />
                </button>

                {/* Quickshop */}
                <button className="quickshop-btn">Quickshop</button>
              </div>

              <div className="text-center product-info">
                <h5 className="product-name">{product.name}</h5>
                <p className="product-price">₹{product.price}</p>
              </div>
            </div>
          ))}
        </OwlCarousel>
      )}
    </div>
  );
}
