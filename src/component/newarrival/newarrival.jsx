import React, { useState, useEffect } from "react";
import "./newarrival.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import fs1 from "../../img/fs1.jpg";
import fs2 from "../../img/fs2.jpg";
import fs3 from "../../img/fs3.jpg";

const NewArrival = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const topBoxes = [
    {
      img: fs1,
      offer: "LIMITED TIME OFFER.",
      title: "Colour Spotlight",
      btn: "Shop Now",
    },
    {
      img: fs2,
      offer: "SAVE 10—30% DRESSES",
      title: "Everyday Luxury",
      btn: "Shop Now",
    },
  ];

  // 🔹 Owl Carousel settings
  const options = {
    items: 1,
    margin: 16,   // ✅ Gap between slides
    dots: true,
    nav: false,
    autoplay: true,
    autoplayTimeout: 3500,
    smartSpeed: 800,
    loop: true,
  };

  return (
    <div className="newarrival">
      {isMobile ? (
        // 🔹 MOBILE: Full-width Black Background Slider with Owl
        <div className="top-slider">
          <OwlCarousel className="owl-theme" {...options}>
            {topBoxes.map((box, i) => (
              <div className="sectionbox mobile-section" key={i}>
                <img src={box.img} alt={box.title} className="main-img2" />
                <div className="img-overlay">
                  <span className="offer-text">{box.offer}</span>
                  <h2>{box.title}</h2>
                  <button className="shop-btn">{box.btn}</button>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
      ) : (
        // 🔹 DESKTOP: Side-by-side
        <div className="newstyle">
          {topBoxes.map((box, i) => (
            <div className="sectionbox" key={i}>
              <img src={box.img} alt={box.title} className="main-img2" />
              <div className="img-overlay">
                <span className="offer-text">{box.offer}</span>
                <h2>{box.title}</h2>
                <button className="shop-btn">{box.btn}</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Latest Styles */}
      <div className="latest-styles sectionbox">
        <img src={fs3} alt="Latest Styles" className="main-img2" />
        <div className="img-center-overlay">
          <h2>Tradition Meets Glamour – Discover Our Latest Styles</h2>
          <button className="shop-btn">Shop New Arrivals</button>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
