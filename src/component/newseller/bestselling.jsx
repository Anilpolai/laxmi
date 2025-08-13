import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { products as productData } from "../../js file/products";
import './bestselling.css'

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function bestselling() {

     const [wishlist, setWishlist] = useState([]);
      const [products, setProducts] = useState([]);
    
      useEffect(() => {
        setProducts(productData);
      }, []);
    
      const toggleWishlist = (id) => {
        setWishlist((prev) =>
          prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
      };
    
      // Owl Carousel Options
      const options = {
        margin: 15,
        loop: products.length > 5, // loop only if more products
        nav: true,
        dots: false,
        navText: ["&#10094;", "&#10095;"], // your custom arrows
        responsive: {
          0: { items: 1 },
          576: { items: 2 },
          768: { items: 3 },
          992: { items: 4 },
          1200: { items: 5 },
        },
      };
    
  return (
    <div className="best-sellers-section">
          <div className="text-center mb-4">
            <p className="section-tagline">STAY AHEAD OF THE FASHION CURVE</p>
            <h2 className="section-title">Best Sellers</h2>
            <p className="section-subtitle">
              Our Most Loved Ethnic Wear, Handpicked for You
            </p>
          </div>
    
          {products.length > 0 && (
            <OwlCarousel className="owl-theme" {...options}>
              {products.map((product) => (
                <div key={product.id} className="product-card item">
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
    
                    {/* Wishlist Button */}
                    <button
                      className={`icon-btn wishlist ${wishlist.includes(product.id) ? "active" : ""}`}
                      onClick={() => toggleWishlist(product.id)}
                      aria-label="Toggle Wishlist"
                    >
                      {wishlist.includes(product.id) ? <FaHeart /> : <FaRegHeart />}
                    </button>
    
                    {/* View Button */}
                    <button className="icon-btn view" aria-label="View Product">
                      <FiEye />
                    </button>
    
                    {/* Quickshop */}
                    <button className="quickshop-btn">Quickshop</button>
                  </div>
    
                  <div className="text-center product-info">
                    <h5 className="product-name">{product.name}</h5>
                    <p className="product-price">₹{product.price}</p>
                  </div>
                </div>
              ))}
            </OwlCarousel>
          )}
        </div>
      
    
  )
}

export default bestselling