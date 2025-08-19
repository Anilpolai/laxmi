// CardsInstagram.jsx
import React from "react";
import "./cards-instagram.css";
import { FaInstagram, FaShoppingCart } from "react-icons/fa";

// Import videos
import vid1 from "../../img/video/v1.mp4";
import vid2 from "../../img/video/v2.mp4";
import vid3 from "../../img/video/v3.mp4";
import vid4 from "../../img/video/v4.mp4";

const videos = [vid1, vid2, vid3, vid4];

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
