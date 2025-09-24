// CardsInstagram.jsx
import React from "react";
import "./cards-instagram.css";
import { FaInstagram, FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, selectAllProducts } from "../../redux/slice/rootslice"; 
import { useNavigate } from "react-router-dom";

function CardsInstagram() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector(selectAllProducts);

  // ✅ Sirf un products ko lo jinke paas video hai
  const videoProducts = products.filter((p) => p.video);

  // ✅ Infinite scroll feel ke liye repeat kar do
  const loopProducts = [...videoProducts, ...videoProducts, ...videoProducts];

  return (
    <div className="instagram-section">
      <div className="instagram-header text-center">
        <h2>@Yourinstagram</h2>
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
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: product.id,
                      name: product.name,
                      image: product.image,
                      price: product.price,
                      size: product.sizes[0], // ✅ default first size
                      quantity: 1,
                    })
                  )
                }
              >
                <FaShoppingCart size={23}onClick={() => navigate(`/quickshop/${product.id}`)} />
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CardsInstagram;
