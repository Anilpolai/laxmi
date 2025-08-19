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
  const loopImages = [...images, ...images];

  return (
    <div className="instagram-section">
      <div className="instagram-header text-center">
        <h2>@Yourinstagram</h2>
        <p>Inspire and let yourself be inspired, from one unique fashion to another.</p>
      </div>

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
    </div>
  );
}

export default CardsInstagram;
