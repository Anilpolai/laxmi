import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeWishlist, clearWishlist } from "../../redux/slice/wishlistSlice";
import { products as productsData } from "../../jsfile/products";
import { kurti as kurtiData } from "../../jsfile/kurti";
import { FaHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";

export default function Wishlist() {
  const wishlist = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  // Merge both arrays
  const allProducts = [...productsData, ...kurtiData];

  // Filter only wishlist products
  const wishlistProducts = allProducts.filter((p) => wishlist.includes(p.id));

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
                    src={product.image}
                    alt={product.name}
                    className="main-img"
                  />
                  <img
                    src={product.hoverimage}
                    alt={`${product.name} Hover`}
                    className="hover-img"
                  />

                  <button
                    className="icon-btn wishlist active"
                    onClick={() => dispatch(removeWishlist(product.id))}
                    aria-label="Remove from Wishlist"
                  >
                    <FaHeart />
                  </button>

                  <Link
                    to={`/product/${product.id}`}
                    className="icon-btn view"
                    aria-label="View Product"
                  >
                    <FiEye />
                  </Link>

                  <button className="quickshop-btn">Quickshop</button>
                </div>

                <div className="product-info">
                  <h5 className="product-name">{product.name}</h5>
                  <p className="product-price">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
