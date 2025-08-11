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
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            nav: true,
            dots: false,
            navText: [
                '<span class="custom-nav-btn prev-btn">&#10094;</span>',
                '<span class="custom-nav-btn next-btn">&#10095;</span>'
            ],
            animateOut: 'fadeOut',
        });

        $('.owl-carousel').on('changed.owl.carousel', function () {
            $('.slider-text h5, .slider-text h2, .slider-text p, .slider-text a').removeClass('animate');
            setTimeout(() => {
                $('.owl-item.active .slider-text h5').addClass('animate delay-1');
                $('.owl-item.active .slider-text h2').addClass('animate delay-2');
                $('.owl-item.active .slider-text p').addClass('animate delay-3');
                $('.owl-item.active .slider-text a').addClass('animate delay-4');
            }, 400);
        });
    }, []);

    return (
        <section className="hero-slider">
            <div className="container-fluid p-0">
                <div className="owl-carousel">
                    {sliderData.map((slide , index) => (
                        <div className="item" key={slide.id || index}>
                            <div className="row align-items-center gx-0">
                                {/* Left Side Text */}
                                <div className="col-md-4 text-start slider-text">
                                    <h5 className="lead">{slide.subtitle}</h5>
                                    <h2 className="text-header heading-letter-spacing">{slide.title}</h2>
                                    <p className="lead">{slide.description}</p>
                                    <a href={slide.btnLink} className="btn slider-btn mt-3">
                                        {slide.btnText}
                                    </a>
                                </div>

                                {/* Right Side Image */}
                                <div className="col-md-8 slider-img">
                                    <div className="image-container">
                                        <img
                                            src={slide.img}
                                            alt={slide.title}
                                            className="img-fluid"
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
