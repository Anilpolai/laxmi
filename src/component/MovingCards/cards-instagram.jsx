// src/components/CardsInstagram.jsx
import React, { useEffect, useState } from "react";
import "./cards-instagram.css";
import { FaInstagram, FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/rootslice"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CardsInstagram() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Only products with videos
  const videoProducts = products.filter((p) => p.video);

  // ✅ Infinite scroll feel
  const loopProducts = [...videoProducts, ...videoProducts, ...videoProducts];

  if (loading) return <p style={{ textAlign: "center" }}>Loading videos...</p>;

  if (!videoProducts.length) return <p style={{ textAlign: "center" }}>No video products found.</p>;

  return (
    <div className="instagram-section">
      <div className="instagram-header text-center">
        <h2>@YourInstagram</h2>
        <p>
          Inspire and let yourself be inspired, from one unique fashion to another.
        </p>
      </div>

      <div className="instagram-gallery">
        <div className="instagram-slider">
          {loopProducts.map((product, idx) => (
            <div className="insta-card" key={idx}>
              <video
                src={product.video}
                loop
                autoPlay
                muted
                playsInline
                className="insta-video"
              />

              {/* Instagram icon (left) */}
              <a
                href="https://www.instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="insta-overlay insta-left"
              >
                <FaInstagram size={25} />
              </a>

              {/* Cart icon (right) */}
              <div
                className="insta-overlay insta-right"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    addToCart({
                      id: product._id,
                      name: product.name,
                      image: product.image,
                      price: product.price,
                      size: product.sizes?.[0] || "M",
                      quantity: 1,
                    })
                  );
                  navigate(`/quickshop/${product._id}`);
                }}
              >
                <FaShoppingCart size={23} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardsInstagram;
