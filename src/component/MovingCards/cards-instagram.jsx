// CardsInstagram.jsx
import React from "react";
import "./cards-instagram.css";
import { FaInstagram, FaShoppingCart } from "react-icons/fa";

// ✅ Use URLs directly instead of import
const videos = [
  "https://www.snehalcreation.co.in/backend/uploads/gallery_images/2813_MM-1015.mp4",
  "https://www.snehalcreation.co.in/backend/uploads/gallery_images/2814_MM-1016.mp4",
  "https://www.snehalcreation.co.in/backend/uploads/gallery_images/2814_MM-1016.mp4",
  "https://www.snehalcreation.co.in/backend/uploads/gallery_images/2813_MM-1015.mp4",
];

function CardsInstagram() {
  const loopVideos = [...videos, ...videos];

  return (
    <div className="instagram-section">
      <div className="instagram-header text-center">
        <h2>@Yourinstagram</h2>
        <p>
          Inspire and let yourself be inspired, from one unique fashion to
          another.
        </p>
      </div>

      <div className="instagram-gallery">
        <div className="instagram-slider">
          {loopVideos.map((video, idx) => (
            <div className="insta-card" key={idx}>
              <video
                src={video}
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
              <div className="insta-overlay insta-right">
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
