import React from "react";
import OwlCarousel from "react-owl-carousel";
import "./shopswiper.css";

export default function ShopSwiper() {
  const products = [
    {
      id: 1,
      img: "https://www.anantexports.in/cdn/shop/files/IMG-20240315-WA0054.jpg?v=1710444561",
      name: "Layla Smock Dress in Black Linen",
      price: "$300.00",
      oldPrice: "$350.00",
    },
    {
      id: 2,
      img: "https://www.anantexports.in/cdn/shop/files/IMG-20240315-WA0054.jpg?v=1710444561",
      name: "Calissa Midi Dress in Navy Linen",
      price: "$250.00",
    },
    {
      id: 3,
      img: "https://www.anantexports.in/cdn/shop/files/IMG-20240315-WA0054.jpg?v=1710444561",
      name: "Wear Sequins Embroidered Navy",
      price: "$245.00",
    },
    {
      id: 4,
      img: "https://www.anantexports.in/cdn/shop/files/IMG-20240315-WA0054.jpg?v=1710444561",
      name: "Violet Maxi Dress in Navy Spot",
      price: "$150.00",
    },
    {
      id: 5,
      img: "https://www.anantexports.in/cdn/shop/files/IMG-20240315-WA0054.jpg?v=1710444561",
      name: "Paris Dream Dress - Gold Aqua",
      price: "$240.00",
    },
  ];

  const options = {
    loop: true,
    margin: 15,
    nav: true,
    dots: false, // default
    responsive: {
      0: {
        items: 2,
        dots: true,   // ✅ mobile पर dots दिखेंगे
        nav: false,
      },
      600: {
        items: 2,
        dots: true,
        nav: false,
      },
      1000: {
        items: 5,
        dots: false,  // ✅ desktop पर dots hide
        nav: true,
      },
    },
  };

  return (
    <div className="shop-swiper-section">
      <div className="shop-swiper-heading">
        <h2>Shop the Look</h2>
        <p>Unmatched design — superior performance and customer satisfaction in one.</p>
      </div>

      <OwlCarousel className="owl-theme" {...options}>
        {products.map((item) => (
          <div key={item.id} className="shop-slide">
            <div className="shop-slide-inner">
              <img className="shop-main-img" src={item.img} alt={item.name} />
              <div className="shop-card-overlay">
                <img className="shop-thumb" src={item.img} alt="mini" />
                <div className="shop-card-info">
                  <div className="shop-card-title">{item.name}</div>
                  <div className="shop-card-price">
                    {item.price}
                    {item.oldPrice && (
                      <span className="shop-card-oldprice">{item.oldPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
}
