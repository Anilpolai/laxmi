import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./CustomerTestimonials.css";

const testimonials = [
  {
    name: "Isabelle Laurent",
    img: "https://randomuser.me/api/portraits/women/50.jpg",
    stars: 5,
    title: "A Touch of Royalty",
    content: "This brand makes me feel elegant and empowered every single time",
    location: "Lyon, France",
  },
  {
    name: "Chiara Romano",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    stars: 5,
    title: "Traditional Meets Modern",
    content:
      "A perfect blend of tradition and modern style. I get compliments every time!",
    location: "Rome, Italy",
  },
  {
    name: "Emma van Dijk",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    stars: 5,
    title: "Perfect for Every Occasion",
    content: "From weddings to festive gatherings, their outfits never disappoint!",
    location: "Amsterdam, Netherlands",
  },
  {
    name: "Elena Petrova",
    img: "https://randomuser.me/api/portraits/women/37.jpg",
    stars: 5,
    title: "Simply Stunning",
    content:
      "The fabric, the stitching, the design—everything exceeded my expectations!",
    location: "Sofia, Bulgaria",
  },
];

export default function CustomerTestimonials() {
  const options = {
    loop: true,
    margin: 20,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3500,
    smartSpeed: 800,
    center: true,
    responsive: {
      0: {
        items: 1,
        nav: false,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  };

  return (
    <div className="testimonial-section">
      <div className="testimonial-heading">
        <h2>Happy Customers</h2>
        <p>Customers love our products and we always strive to please them all.</p>
      </div>

      <OwlCarousel className="owl-theme" {...options}>
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
                {Array(item.stars)
                  .fill(0)
                  .map((_, i) => (
                    <span
                      key={i}
                      style={{ color: "#FFA300", fontSize: "22px" }}
                    >
                      ★
                    </span>
                  ))}
              </div>
              <div className="testimonial-title">{item.title}</div>
              <div className="testimonial-content">{item.content}</div>
              <div className="testimonial-location">{item.location}</div>
            </div>
          </div>
        ))}
      </OwlCarousel>
    </div>
  );
}
