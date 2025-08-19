// CardsInstagram.jsx
import React, { useEffect, useRef, useState } from "react";
import "./cards-instagram.css";
import { FaInstagram } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap import

import img1 from "../../img/fs1.jpg";
import img2 from "../../img/fs2.jpg";
import img3 from "../../img/fs3.jpg";
import img4 from "../../img/fs1.jpg";
import img5 from "../../img/fs2.jpg";

const images = [img1, img2, img3, img4, img5];

function CardsInstagram() {
  const galleryRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate images for seamless loop
  const loopImages = [...images, ...images];

  useEffect(() => {
    let scrollInterval;

    const scrollSpeed = 2; // pixels per tick
    const intervalTime = 30; // ms

    if (!isPaused) {
      scrollInterval = setInterval(() => {
        if (galleryRef.current) {
          galleryRef.current.scrollLeft += scrollSpeed;

          // Reset to start when first set fully scrolled
          if (galleryRef.current.scrollLeft >= galleryRef.current.scrollWidth / 2) {
            galleryRef.current.scrollLeft = 0;
          }
        }
      }, intervalTime);
    }

    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  return (
    <div
      className="instagram-gallery"
      ref={galleryRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="d-flex instagram-slider">
        {loopImages.map((img, idx) => (
          <div className="insta-card me-3" key={idx}>
            <img src={img} alt={`Instagram ${idx}`} className="img-fluid" />
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
