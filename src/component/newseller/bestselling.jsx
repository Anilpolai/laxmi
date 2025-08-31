import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../../redux/slice/wishlistSlice";
import { products as productData } from "../../jsfile/products";
import QuickshopPage from "../quickshop/quickshop";
import "./bestselling.css";

export default function BestSellers() {
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();



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
        {productData.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} className="main-img" />
              <img
                src={product.hoverimage}
                alt={`${product.name} Hover`}
                className="hover-img"
              />

              {/* Wishlist Button */}
              <button
                className={`icon-btn wishlist ${wishlist.includes(product.id) ? "active" : ""}`}
                onClick={() => dispatch(toggleWishlist(product.id))}
                aria-label="Toggle Wishlist"
              >
                {wishlist.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
              </button>

              {/* View Button */}
              <Link to={`/quickshop/${product.id}`} className="icon-btn view" aria-label="View Product">
                <FiEye />
              </Link>

              {/* Quickshop Button */}
              <Link
                to={`/quickshop/${product.id}`}
                className="quickshop-btn"
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
