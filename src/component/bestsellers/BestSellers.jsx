import React, { useEffect, useState } from "react";
import { FaHeart, FaEye, FaShoppingCart } from "react-icons/fa";
import "./bestSellers.css";
import { products as productData } from "../../js file/products"; // Import data file

export default function BestSellers() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productData);
  }, []);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const addToCart = (id) => {
    if (!cart.includes(id)) {
      setCart([...cart, id]);
      alert("Added to Cart!");
    }
  };

  return (
    <div className="best-sellers-container">
      <h2 className="section-title">Best Sellers</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />

              {/* Top-right icons */}
              <div className="product-overlay">
                <button
                  className={`icon-btn ${wishlist.includes(product.id) ? "active" : ""}`}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <FaHeart />
                </button>
                <button className="icon-btn">
                  <FaEye />
                </button>
              </div>

              {/* Add to Cart inside image */}
              <button
                className="add-to-cart"
                onClick={() => addToCart(product.id)}
              >
                <FaShoppingCart /> Add to Cart
              </button>
            </div>

            {/* Info below image */}
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
