import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { BsGrid3X3GapFill, BsGridFill } from "react-icons/bs";
import { FaThLarge, FaTh } from "react-icons/fa"; // extra option for variety
// ✅ grid icons
import { Link } from "react-router-dom";
import { products as productData } from "../js file/kurati";
import "./kurti.css";

function Kurti() {
  const [wishlist, setWishlist] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [priceRange, setPriceRange] = useState(5000);
  const [availability, setAvailability] = useState("all");
  const [columns, setColumns] = useState(3);

  // Wishlist load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      return updated;
    });
  };

  // Filter products
  useEffect(() => {
    let updated = productData.filter((p) => p.price <= priceRange);
    if (availability === "in") updated = updated.filter((p) => p.stock > 0);
    if (availability === "out") updated = updated.filter((p) => p.stock === 0);
    setFilteredProducts(updated);
  }, [priceRange, availability]);

  return (
    <div className="kurti-container">
      {/* ================= Left Filter ================= */}
      <aside className="kurti-filter">
        <h3>Filter</h3>

        {/* Price */}
        <div className="filter-box">
          <h4>Price (₹)</h4>
          <input
            type="range"
            min="500"
            max="5000"
            step="100"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
          />
          <p>
            Up to: <strong>₹{priceRange}</strong>
          </p>
        </div>

        {/* Availability */}
        <div className="filter-box">
          <h4>Availability</h4>
          <label>
            <input
              type="radio"
              name="avail"
              value="all"
              checked={availability === "all"}
              onChange={(e) => setAvailability(e.target.value)}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="avail"
              value="in"
              checked={availability === "in"}
              onChange={(e) => setAvailability(e.target.value)}
            />
            In Stock
          </label>
          <label>
            <input
              type="radio"
              name="avail"
              value="out"
              checked={availability === "out"}
              onChange={(e) => setAvailability(e.target.value)}
            />
            Out of Stock
          </label>
        </div>

        {/* Column Layout */}
        <div className="filter-box">
          <h4>Product Layout</h4>
          <div className="kurti-columns">
            <button
              onClick={() => setColumns(3)}
              className={columns === 3 ? "active" : ""}
            >
              <BsGrid3X3GapFill />
            </button>
            <button
              onClick={() => setColumns(4)}
              className={columns === 4 ? "active" : ""}
            >
              <BsGridFill />
            </button>
            <button
              onClick={() => setColumns(5)}
              className={columns === 5 ? "active" : ""}
            >
              <FaThLarge />
            </button>
          </div>

        </div>
      </aside>

      {/* ================= Right Products ================= */}
      <main className="kurti-section">
        {/* Title */}
        <div className="kurti-text-center kurti-mb-4">
          <p className="kurti-tagline">STAY AHEAD OF THE FASHION CURVE</p>
          <h2 className="kurti-title">Kurti</h2>
          <p className="kurti-subtitle">
            “Grace in every stitch, tradition in every silhouette—your perfect
            kurti awaits.”
          </p>
        </div>

        {/* Products Grid */}
        <div className={`kurti-products-grid cols-${columns}`}>
          {filteredProducts.map((product) => (
            <div key={product.id} className="kurti-card">
              <div className="kurti-image">
                <img
                  src={product.image}
                  alt={product.name}
                  className="kurti-main-img"
                />
                <img
                  src={product.hoverimage}
                  alt="hover"
                  className="kurti-hover-img"
                />

                <button
                  className={`kurti-icon-btn kurti-wishlist ${wishlist.includes(product.id) ? "active" : ""
                    }`}
                  onClick={() => toggleWishlist(product.id)}
                >
                  {wishlist.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
                </button>

                <Link
                  to={`/product/${product.id}`}
                  className="kurti-icon-btn kurti-view"
                >
                  <FiEye />
                </Link>

                <button className="kurti-quickshop-btn">Quickshop</button>
              </div>

              <div className="kurti-info">
                <h5 className="kurti-name">{product.name}</h5>
                <p className="kurti-price">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Kurti;
