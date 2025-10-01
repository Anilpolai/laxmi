import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../../redux/slice/rootslice";
import { FaRegHeart, FaHeart, FaFilter } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { BsGrid3X3GapFill, BsGridFill } from "react-icons/bs";
import { FaThLarge } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import banner from "../../img/kurti/homekurti.jpg"; // change if tunics banner exists
import "../kurti.css"; // ✅ your CSS file
import KurtiFilter from "../../component/filter/KurtiFilter";

function Tunics() {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const products = useSelector((state) => state.products.list);
  const tunicsProducts = products.filter((p) => p.category === "tunics");

  const [filteredProducts, setFilteredProducts] = useState(tunicsProducts);
  const [availability, setAvailability] = useState("all");
  const [columns, setColumns] = useState(4);
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [discount, setDiscount] = useState("all");
  const [fabric, setFabric] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);

  const productsPerPage = 12;

  useEffect(() => {
    let updated = tunicsProducts.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );
    if (availability === "in") updated = updated.filter((p) => p.stock > 0);
    if (availability === "out") updated = updated.filter((p) => p.stock === 0);
    if (discount !== "all") updated = updated.filter((p) => p.discount >= Number(discount));
    if (fabric !== "all") updated = updated.filter((p) => p.fabric?.toLowerCase() === fabric.toLowerCase());
    setFilteredProducts(updated);
    setCurrentPage(1);
  }, [minPrice, maxPrice, availability, discount, fabric]);

  const navigate = useNavigate();
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div>
      {/* Banner */}
      <div className="tunics-banner-full">
        <img src={banner} alt="Tunics Banner" />
      </div>

      <div className="tunics-Full">
        <div className="tunics-container">
          {/* Filter */}
          <KurtiFilter
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            availability={availability}
            setAvailability={setAvailability}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            discount={discount}
            setDiscount={setDiscount}
            fabric={fabric}
            setFabric={setFabric}
          />

          <main className="tunics-section">
            {/* Header */}
            <div className="tunics-texts">
              <p className="tunics-tagline">STAY AHEAD OF THE FASHION CURVE</p>
              <h2 className="tunics-title">Tunics</h2>
              <p className="tunics-subtitle">
                Elegance redefined with every tunic — tradition and style combined.
              </p>
            </div>
            <div className="tunics-header2">
              <div className="tunics-header-left">
                <button
                  className="desktop-filter-btn"
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <FaFilter /> Filter
                </button>
              </div>
              <div className="tunics-columns">
                <button onClick={() => setColumns(3)} className={columns === 3 ? "active" : ""}><BsGrid3X3GapFill /></button>
                <button onClick={() => setColumns(4)} className={columns === 4 ? "active" : ""}><BsGridFill /></button>
                <button onClick={() => setColumns(5)} className={columns === 5 ? "active" : ""}><FaThLarge /></button>
              </div>
            </div>

            {/* Mobile Filter */}
            <button className="mobile-filter-btn" onClick={() => setShowFilter(!showFilter)}>
              <FaFilter /> Filter
            </button>

            {/* Products Grid */}
            <div className={`tunics-products-grid cols-${columns}`}>
              {currentProducts.map((product) => (
                <div key={product.id} className="tunics-card" onClick={() => navigate(`/quickshop/${product.id}`)}>
                  <div className="tunics-image">
                    {/* <img src={product.image} alt={product.name} className="tunics-main-img" />
                    <img src={product.hoverimage} alt={product.name} className="tunics-hover-img" /> */}
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="tunics-main-img"
                    />
                    {product.images?.[1] && (
                      <img
                        src={product.images[1]}
                        alt={`${product.name} Hover`}
                        className="tunics-hover-img"
                      />
                    )}
                    <button
                      className={`tunics-icon-btn tunics-wishlist ${wishlist.includes(product.id) ? "active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(toggleWishlist(product.id));
                      }}>
                      {wishlist.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>

                    <NavLink to={`/quickshop/${product.id}`} className="tunics-icon-btn tunics-view"><FiEye /></NavLink>
                    <NavLink to={`/quickshop/${product.id}`} className="tunics-quickshop-btn">
                      Quickshop
                    </NavLink>
                  </div>

                  <div className="tunics-info">
                    <h5 className="tunics-name">{product.name}</h5>
                    <p className="tunics-price">₹{product.price}</p>
                    {product.discount && <p className="tunics-discount">{product.discount}% OFF</p>}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>Prev</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} className={currentPage === i + 1 ? "active" : ""} onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Tunics;
