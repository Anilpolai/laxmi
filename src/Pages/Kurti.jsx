import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { BsGrid3X3GapFill, BsGridFill } from "react-icons/bs";
import { FaThLarge, FaTh } from "react-icons/fa"; // extra option for variety
import { Link } from "react-router-dom";
import { products as productData } from "../js file/kurati";
import banner from '../img/kurti/homekurti.jpg'
import "./kurti.css";

function Kurti() {
  const [wishlist, setWishlist] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [priceRange
    
  ] = useState(5000);
  const [availability, setAvailability] = useState("all");
  const [columns, setColumns] = useState(3);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(5000);


  useEffect(() => {
    let updated = productData.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );
    if (availability === "in") updated = updated.filter((p) => p.stock > 0);
    if (availability === "out") updated = updated.filter((p) => p.stock === 0);
    setFilteredProducts(updated);
  }, [minPrice, maxPrice, availability]);


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
    <div className="kurti-Full">
      <img src={banner} alt="" />
      <div className="kurti-container">

        {/* ================= Left Filter ================= */}
        <aside className="kurti-filter">
          <h3>Filter</h3>

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


          {/* Price */}
          <div className="filter-box">
            <h4>Price (₹)</h4>

            {/* Input Boxes */}
            <div className="price-inputs">
              {/* Min Price */}
              <input
                type="text"
                value={minPrice}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, ""); // sirf number allow
                  setMinPrice(Number(e.target.value) || 0);
                }}
              />
              <span>–</span>
              {/* Max Price */}
              <input
                type="text"
                value={maxPrice}
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, ""); // sirf number allow
                  setMaxPrice(Number(e.target.value) || 0);
                }}
              />
            </div>

            {/* Single Slider */}
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => {
                let val = Number(e.target.value);
                if (val < minPrice) val = minPrice;
                setMaxPrice(val);
              }}
            />

            <p>
              Range: <strong>₹{minPrice}</strong> – <strong>₹{maxPrice}</strong>
            </p>
          </div>





        </aside>

        {/* ================= Right Products ================= */}
        <main className="kurti-section">

          {/* Title + Layout in one row */}
          <div className="kurti-header">
            <div className="kurti-texts">
              <p className="kurti-tagline">STAY AHEAD OF THE FASHION CURVE</p>
              <h2 className="kurti-title">Kurti</h2>
              <p className="kurti-subtitle">
                “Grace in every stitch, tradition in every silhouette—your perfect kurti awaits.”
              </p>
            </div>

            <div className="kurti-columns">
              <button onClick={() => setColumns(3)} className={columns === 3 ? "active" : ""}>
                <BsGrid3X3GapFill />
              </button>
              <button onClick={() => setColumns(4)} className={columns === 4 ? "active" : ""}>
                <BsGridFill />
              </button>
              <button onClick={() => setColumns(5)} className={columns === 5 ? "active" : ""}>
                <FaThLarge />
              </button>
            </div>
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
    </div>
  );
}

export default Kurti;
