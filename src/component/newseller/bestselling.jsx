// src/pages/BestSellers.jsx
import React from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../../redux/slice/rootslice";
import { products as productData } from "../../jsfile/products";

import "./bestselling.css";

export default function BestSellers() {
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ सिर्फ वो products जिनमें bestSelling: true है
  const bestSellingProducts = productData.filter((p) => p.bestSelling);

  return (
    <div className="best-sellers-section">
      {/* Section Heading */}
      <div className="text-center mb-4">
        <p className="section-tagline">STAY AHEAD OF THE FASHION CURVE</p>
        <h2 className="section-title">Best Sellers</h2>
        <p className="section-subtitle">
          Our Most Loved Ethnic Wear, Handpicked for You
        </p>
      </div>

      {/* Product Grid */}
      <div className="products-grid">
        {bestSellingProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => navigate(`/quickshop/${product.id}`)}
          >
            <div className="product-image">
              <img
                src={product.images[0]}
                alt={product.name}
                className="main-img"
              />
              <img
                src={product.images[1]}
                alt={`${product.name} Hover`}
                className="hover-img"
              />

              {/* Wishlist Button */}
              <button
                className={`best-icon-btn best-wishlist ${
                  wishlist.includes(product.id) ? "active" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleWishlist(product.id));
                }}
                aria-label="Toggle Wishlist"
              >
                {wishlist.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
              </button>

              {/* View Button */}
              <Link
                to={`/quickshop/${product.id}`}
                className="best-icon-btn view"
                aria-label="View Product"
                onClick={(e) => e.stopPropagation()}
              >
                <FiEye />
              </Link>

              {/* Quickshop Button */}
              <Link
                to={`/quickshop/${product.id}`}
                className="quickshop-btn"
                onClick={(e) => e.stopPropagation()}
              >
                Quickshop
              </Link>
            </div>

            {/* Product Info */}
            <div className="product-info">
              <h5 className="product-name">{product.name}</h5>
              <p className="product-price">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
