// CardsInstagram.jsx
import React from "react";
import "./cards-instagram.css";
import { FaInstagram } from "react-icons/fa";

import img1 from "../../img/fs1.jpg";
import img2 from "../../img/fs2.jpg";
import img3 from "../../img/fs3.jpg";
import img4 from "../../img/fs1.jpg";
import img5 from "../../img/fs2.jpg";

const images = [img1, img2, img3, img4, img5];

function CardsInstagram() {
  // Duplicate images for seamless loop
  const loopImages = [...images, ...images];

  return (
    <div className="instagram-gallery">
      <div className="instagram-slider">
        {loopImages.map((img, idx) => (
          <div className="insta-card" key={idx}>
            <img src={img} alt={`Instagram ${idx}`} />
            <a
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="insta-overlay"
            >
              <FaInstagram size={36} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardsInstagram;
