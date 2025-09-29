import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../redux/slice/rootslice";
import { FaRegHeart, FaHeart, FaFilter } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { BsGrid3X3GapFill, BsGridFill } from "react-icons/bs";
import { FaThLarge } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import KurtiFilter from "../component/filter/KurtiFilter";
import "./kurti.css"; // ✅ use same CSS with category-based classnames

function ProductList({ category, title, subtitle, banner }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const products = useSelector((state) => state.products.list);
  const categoryProducts = products.filter((p) => p.category === category);

  const [filteredProducts, setFilteredProducts] = useState(categoryProducts);
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
    let updated = categoryProducts.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );
    if (availability === "in") updated = updated.filter((p) => p.stock > 0);
    if (availability === "out") updated = updated.filter((p) => p.stock === 0);
    if (discount !== "all") updated = updated.filter((p) => p.discount >= Number(discount));
    if (fabric !== "all") updated = updated.filter((p) => p.fabric?.toLowerCase() === fabric.toLowerCase());
    setFilteredProducts(updated);
    setCurrentPage(1);
  }, [minPrice, maxPrice, availability, discount, fabric, categoryProducts]);

  const navigate = useNavigate();
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div>
      {/* Banner */}
      <div className={`${category}-banner-full`}>
        <img src={banner} alt={`${category} Banner`} />
      </div>

      <div className={`${category}-Full`}>
        <div className={`${category}-container`}>
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

          <main className={`${category}-section`}>
            {/* Header */}
            <div className={`${category}-texts`}>
              <p className={`${category}-tagline`}>STAY AHEAD OF THE FASHION CURVE</p>
              <h2 className={`${category}-title`}>{title}</h2>
              <p className={`${category}-subtitle`}>{subtitle}</p>
            </div>

            <div className={`${category}-header2`}>
              <div className={`${category}-header-left`}>
                <button
                  className="desktop-filter-btn"
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <FaFilter /> Filter
                </button>
              </div>
              <div className={`${category}-columns`}>
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
            <div className={`${category}-products-grid cols-${columns}`}>
              {currentProducts.map((product) => (
                <div key={product.id} className={`${category}-card`} onClick={() => navigate(`/quickshop/${product.id}`)}>
                  <div className={`${category}-image`}>
                    <img src={product.image} alt={product.name} className={`${category}-main-img`} />
                    <img src={product.hoverimage} alt={product.name} className={`${category}-hover-img`} />

                    <button
                      className={`${category}-icon-btn ${category}-wishlist ${wishlist.includes(product.id) ? "active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(toggleWishlist(product.id));
                      }}>
                      {wishlist.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>

                    <NavLink to={`/quickshop/${product.id}`} className={`${category}-icon-btn ${category}-view`}><FiEye /></NavLink>
                    <NavLink to={`/quickshop/${product.id}`} className={`${category}-quickshop-btn`}>
                      Quickshop
                    </NavLink>
                  </div>

                  <div className={`${category}-info`}>
                    <h5 className={`${category}-name`}>{product.name}</h5>
                    <p className={`${category}-price`}>₹{product.price}</p>
                    {product.discount && <p className={`${category}-discount`}>{product.discount}% OFF</p>}
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

export default ProductList;
