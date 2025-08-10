import React from 'react';
import './marktag.css';

const Marktag = () => {
  const offers = [
    "🎉 Big Festive Offer! Up to 50% OFF on Kurtis — By Laxmi Ethnics",
    "💃 Stylish Kurti-Sets starting at ₹799 — Grab Now!",
    "✨ Flat 30% OFF on Tunics — Limited Period Offer!"
  ];

  // Duplicate offers for continuous scroll
  const scrollingOffers = [...offers, ...offers, ...offers];

  return (
    <div className="marquee-container">
      <div className="marquee-wrapper">
        {scrollingOffers.map((offer, i) => (
          <span className="marquee-item" key={i}>
            {offer}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marktag;
