import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { toggleWishlist } from "../../redux/slice/rootslice";


import "./similarProducts.css"; // 👈 create css file for styling

const SimilarProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.list);
  const wishlist = useSelector((state) => state.wishlist.items);

  // current product
  const currentProduct = products.find((p) => p.id === Number(id));

  // filter similar products (same category, exclude current)
  const similar = products
    .filter(
      (p) => p.category === currentProduct?.category && p.id !== currentProduct?.id
    )
    .slice(0, 4); // ✅ only 4 products

  if (!similar.length) return null;

  return (
    <div className="similar-products">
      <h3 className="similar-title">Similar Products</h3>
      <div className="similar-grid">
        {similar.map((product) => (
          <div key={product.id} className="kurti-card">
            <div
              className="kurti-image"
              onClick={() => navigate(`/quickshop/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="kurti-main-img"
              />
              <img
                src={product.hoverimage}
                alt={product.name}
                className="kurti-hover-img"
              />

              {/* Wishlist */}
              <button
                className={`kurti-icon-btn kurti-wishlist ${
                  wishlist.includes(product.id) ? "active" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleWishlist(product.id));
                }}
              >
                {wishlist.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
              </button>

              {/* Quick view */}
              <NavLink
                to={`/quickshop/${product.id}`}
                className="kurti-icon-btn kurti-view"
                onClick={(e) => e.stopPropagation()}
              >
                <FiEye />
              </NavLink>

              <NavLink
                to={`/quickshop/${product.id}`}
                className="kurti-quickshop-btn"
                onClick={(e) => e.stopPropagation()}
              >
                Quickshop
              </NavLink>
            </div>

            {/* Info */}
            <div className="kurti-info">
              <h5 className="kurti-name">{product.name}</h5>
              <p className="kurti-price">₹{product.price}</p>
              {product.discount && (
                <p className="kurti-discount">{product.discount}% OFF</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
