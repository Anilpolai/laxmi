import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart, FaFilter } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { BsGrid3X3GapFill, BsGridFill } from "react-icons/bs";
import { FaThLarge } from "react-icons/fa";
import { Link } from "react-router-dom";
import { products as productData } from "../jsfile/kurati";
import banner from "../img/kurti/homekurti.jpg";
import "./kurti.css";
import Filter from "../component/filter/filter";

function Kurti() {
  const [wishlist, setWishlist] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(productData);
  // const [availability, setAvailability] = useState("all");
  const [columns, setColumns] = useState(4);
  // const [minPrice, setMinPrice] = useState(500);
  // const [maxPrice, setMaxPrice] = useState(5000);
  // const [discount, setDiscount] = useState("all");
  // const [sortBy, setSortBy] = useState("default");

  // const [fabric, setFabric] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const handleFilter = (updated) => {
    setFilteredProducts(updated);
  };
  // ✅ Mobile filter toggle
  const [showFilter, setShowFilter] = useState(false);

  // useEffect(() => {
  //   let updated = productData.filter(
  //     (p) => p.price >= minPrice && p.price <= maxPrice
  //   );
  //   if (availability === "in") updated = updated.filter((p) => p.stock > 0);
  //   if (availability === "out") updated = updated.filter((p) => p.stock === 0);

  //   // ✅ Discount filter logic
  //   if (discount !== "all") {
  //     const minDisc = Number(discount);
  //     updated = updated.filter((p) => p.discount >= minDisc);
  //   }

  //   // ✅ Fabric filter logic
  //   if (fabric !== "all") {
  //     updated = updated.filter((p) => p.fabric?.toLowerCase() === fabric.toLowerCase());
  //   }

  //   setFilteredProducts(updated);
  // }, [minPrice, maxPrice, availability, discount, fabric]);

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


  // Pagination calculation
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="kurti-Full">
      {/* Banner */}
      <div className="kurti-banner">
        <img src={banner} alt="Kurti Banner" />
      </div>
      <div className="kurti-container">

        {/* ================= Left Filter (Sidebar / Drawer) ================= */}
          <Filter products={productData} onFilter={handleFilter} />

        {/* ================= Right Products ================= */}
        <main className="kurti-section">
          <div className="kurti-header">
            <div className="kurti-texts">
              <p className="kurti-tagline">STAY AHEAD OF THE FASHION CURVE</p>
              <h2 className="kurti-title">Kurti</h2>
              <p className="kurti-subtitle">
                “Grace in every stitch, tradition in every silhouette—your perfect kurti awaits.”
              </p>
            </div>

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

          {/* Mobile Filter Button */}
          <button
            className="mobile-filter-btn"
            onClick={() => setShowFilter(!showFilter)}
          >
            <FaFilter /> Filter
          </button>


          {/* Products Grid */}
          <div className={`kurti-products-grid cols-${columns}`}>
            {currentProducts.map((product) => (
              <div key={product.id} className="kurti-card">
                <div className="kurti-image">
                  <img src={product.image} alt={product.name} className="kurti-main-img" />
                  <img src={product.hoverimage} alt="hover" className="kurti-hover-img" />

                  <button
                    className={`kurti-icon-btn kurti-wishlist ${wishlist.includes(product.id) ? "active" : ""}`}
                    onClick={() => toggleWishlist(product.id)}
                  >
                    {wishlist.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
                  </button>

                  <Link to={`/product/${product.id}`} className="kurti-icon-btn kurti-view">
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

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Kurti;
