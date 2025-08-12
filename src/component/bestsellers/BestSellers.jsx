// src/components/BestSellers.jsx
import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FaRegHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { products as productData } from "../../js file/products";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
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

  // OwlCarousel responsive settings
  const responsive = {
    0: {
      items: 1,
    },
    576: {
      items: 2,
    },
    768: {
      items: 3,
    },
    992: {
      items: 4,
    },
    1200: {
      items: 5,
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

      <OwlCarousel
        className="owl-theme"
        loop={false} // no infinite loop to stop sliding when no more items
        margin={15}
        nav={true}
        dots={false}
        responsive={responsive}
        navText={[
          "<span class='custom-arrow carousel-control-prev-icon'></span>",
          "<span class='custom-arrow carousel-control-next-icon'></span>",
        ]}
      >
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Card className="border-0">
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
                <Button
                  variant="light"
                  className={`icon-btn wishlist ${
                    wishlist.includes(product.id) ? "active" : ""
                  }`}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <FaRegHeart />
                </Button>

                {/* View icon only on hover */}
                <Button variant="light" className="icon-btn view">
                  <FiEye />
                </Button>

                {/* Quickshop Button */}
                <Button className="quickshop-btn">Quickshop</Button>
              </div>

              <Card.Body className="text-center">
                <Card.Title className="product-name">{product.name}</Card.Title>
                <Card.Text className="product-price">₹{product.price}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
}
