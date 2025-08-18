import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CustomerTestimonials.css";

const testimonials = [
  {
    name: "Isabelle Laurent",
    img: "https://randomuser.me/api/portraits/women/50.jpg",
    stars: 5,
    title: "A Touch of Royalty",
    content: "This brand makes me feel elegant and empowered every single time",
    location: "Lyon, France"
  },
  {
    name: "Chiara Romano",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    stars: 5,
    title: "Traditional Meets Modern",
    content: "A perfect blend of tradition and modern style. I get compliments every time!",
    location: "Rome, Italy"
  },
  {
    name: "Emma van Dijk",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    stars: 5,
    title: "Perfect for Every Occasion",
    content: "From weddings to festive gatherings, their outfits never disappoint!",
    location: "Amsterdam, Netherlands"
  },
  {
    name: "Elena Petrova",
    img: "https://randomuser.me/api/portraits/women/37.jpg",
    stars: 5,
    title: "Simply Stunning",
    content: "The fabric, the stitching, the design—everything exceeded my expectations!",
    location: "Sofia, Bulgaria"
  }
];

// Custom Arrows
function NextArrow({ onClick }) {
  return (
    <div className="custom-arrow next" onClick={onClick}>
      &#8250;
    </div>
  );
}
function PrevArrow({ onClick }) {
  return (
    <div className="custom-arrow prev" onClick={onClick}>
      &#8249;
    </div>
  );
}

export default function CustomerTestimonials() {
  const settings = {
    centerMode: true,
    centerPadding: "60px",
    slidesToShow: 3,
    infinite: true,
    speed: 600,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 950, settings: { slidesToShow: 2, centerPadding: "0px" } },
      { breakpoint: 600, settings: { slidesToShow: 1, centerPadding: "0px", dots: true } }
    ],
  };

  return (
    <div className="testimonial-section">
      <div className="testimonial-heading">
        <h2>Happy Customers</h2>
        <p>
          Customers love our products and we always strive to please them all.
        </p>
      </div>
      <Slider {...settings}>
        {testimonials.map((item, idx) => (
          <div className="testimonial-card" key={idx}>
            <div className="testimonial-header">
              <div className="testimonial-avatar">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="testimonial-name">{item.name}</div>
            </div>

            <div className="testimonial-info">
              <div className="testimonial-stars">
                {Array(item.stars).fill(0).map((_, i) => (
                  <span key={i} style={{ color: "#FFA300", fontSize: "22px" }}>★</span>
                ))}
              </div>
              <div className="testimonial-title">{item.title}</div>
              <div className="testimonial-content">{item.content}</div>
              <div className="testimonial-location">{item.location}</div>
            </div>
          </div>

        ))}
      </Slider>
    </div>
  );
}
