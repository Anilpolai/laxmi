// src/components/BestSellers.jsx
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { products as productData } from "../../js file/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./bestsellers.css";

export default function BestSellers() {
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

  return (
    <div className="best-sellers-section">
      <div className="text-center mb-4">
        <p className="section-tagline">STAY AHEAD OF THE FASHION CURVE</p>
        <h2 className="section-title">Best Sellers</h2>
        <p className="section-subtitle">
          Our Most Loved Ethnic Wear, Handpicked for You
        </p>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={15}
        slidesPerView={5}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        breakpoints={{
          0: { slidesPerView: 1 },
          576: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="product-card">
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

              {/* Wishlist always visible */}
              <button
                className={`icon-btn wishlist ${
                  wishlist.includes(product.id) ? "active" : ""
                }`}
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle Wishlist"
              >
                <FaRegHeart />
              </button>

              {/* View icon only on hover */}
              <button className="icon-btn view" aria-label="View Product">
                <FiEye />
              </button>

              {/* Quickshop Button */}
              <button className="quickshop-btn">Quickshop</button>
            </div>

            <div className="text-center product-info">
              <h5 className="product-name">{product.name}</h5>
              <p className="product-price">₹{product.price}</p>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <div className="swiper-button-prev-custom custom-arrow">&#10094;</div>
        <div className="swiper-button-next-custom custom-arrow">&#10095;</div>
      </Swiper>
    </div>
  );
}
