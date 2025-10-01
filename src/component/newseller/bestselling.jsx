// src/pages/BestSellers.jsx
import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../../redux/slice/rootslice";
import axios from "axios";

import "./bestselling.css";

export default function BestSellers() {
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter only bestSelling products
  const bestSellingProducts = products.filter((p) => p.bestSelling);

  if (loading) return <p style={{ textAlign: "center" }}>Loading products...</p>;

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
        {bestSellingProducts.length > 0 ? (
          bestSellingProducts.map((product) => (
            <div
              key={product._id}
              className="product-card"
              onClick={() => navigate(`/quickshop/${product._id}`)}
            >
              <div className="product-image">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="main-img"
                />
                {product.images?.[1] && (
                  <img
                    src={product.images[1]}
                    alt={`${product.name} Hover`}
                    className="hover-img"
                  />
                )}

                {/* Wishlist Button */}
                <button
                  className={`best-icon-btn best-wishlist ${
                    wishlist.includes(product._id) ? "active" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(toggleWishlist(product._id));
                  }}
                  aria-label="Toggle Wishlist"
                >
                  {wishlist.includes(product._id) ? <FaHeart /> : <FaRegHeart />}
                </button>

                {/* View Button */}
                <Link
                  to={`/quickshop/${product._id}`}
                  className="best-icon-btn view"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FiEye />
                </Link>

                {/* Quickshop Button */}
                <Link
                  to={`/quickshop/${product._id}`}
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
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No best selling products found.</p>
        )}
      </div>
    </div>
  );
}
