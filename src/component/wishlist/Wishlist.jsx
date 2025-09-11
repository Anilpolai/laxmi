import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeWishlist, clearWishlist } from "../../redux/slice/rootslice";
import { FaHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import './wishlist.css';

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.items);
  const products = useSelector((state) => state.products.list); // ✅ pull all products from Redux
  const dispatch = useDispatch();

  // Filter wishlist products
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <section className="best-sellers-section">
      <h2 className="section-title">My Wishlist</h2>
      <p className="section-subtitle">Your saved favorite products</p>

      {wishlistProducts.length === 0 ? (
        <p className="text-center mt-4">💔 Your wishlist is empty.</p>
      ) : (
        <>
          <div className="mb-4">
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => dispatch(clearWishlist())}
            >
              Clear Wishlist
            </button>
          </div>

          <div className="products-grid">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img
                    src={product.images ? product.images[0] : product.image}
                    alt={product.name}
                    className="main-img"
                  />
                  <img
                    src={product.images ? product.images[1] : product.hoverimage}
                    alt={`${product.name} Hover`}
                    className="hover-img"
                  />


                  <button
                    className="icon-btn1 wishlist1 active"
                    onClick={() => dispatch(removeWishlist(product.id))}
                    aria-label="Remove from Wishlist"
                  >
                    <FaHeart />
                  </button>

                  <Link
                    to={`/quickshop/${product.id}`} // ✅ point to Quickshop
                    className="icon-btn1 view"
                    aria-label="View Product"
                  >
                    <FiEye />
                  </Link>

                  <Link
                    to={`/quickshop/${product.id}`} // Quickshop button
                    className="quickshop-btn"
                  >
                    Quickshop
                  </Link>
                </div>

                <div className="product-info">
                  <h5 className="product-name">{product.name}</h5>
                  <p className="product-price">₹{product.price}</p>
                  {product.discount && <p className="product-discount">{product.discount}% OFF</p>}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
