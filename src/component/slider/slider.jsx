import React, { useEffect } from 'react';
import $ from '../../jquery/jquery';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'owl.carousel';

import sliderData from '../../js file/silder';
import './slider.css';

const Slider = () => {
  useEffect(() => {
    $('.owl-carousel').owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      nav: true,
      dots: true,
      animateOut: 'fadeOut',
    });
  }, []);

  return (
    <section className="hero-slider py-5">
      <div className="container">
        <div className="owl-carousel">
          {sliderData.map((slide) => (
            <div className="item" key={slide.id}>
              <div className="row align-items-center">
                {/* Left Side Content */}
                <div className="col-md-6 text-start">
                  <h2 className="fw-bold">{slide.title}</h2>
                  <p className="lead">{slide.subtitle}</p>
                  <a href={slide.btnLink} className="btn btn-dark mt-3">
                    {slide.btnText}
                  </a>
                </div>
                {/* Right Side Image */}
                <div className="col-md-6">
                  <div className="image-container zoom-out">
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="img-fluid rounded shadow"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;
