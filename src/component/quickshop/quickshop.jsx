import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { kurti as productData } from "../../jsfile/kurti";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


import "./quickshop.css";

const QuickshopPage = () => {
  const { id } = useParams();
  const product = productData.find(p => p.id === parseInt(id));

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  if (!product) return <p>Product not found!</p>;

  return (
    <div className="quickshop-page">
      <div className="quickshop-content">
        {/* Thumbnails */}
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={product.images.length > 3 ? 3 : product.images.length}
          direction="vertical"
          className="thumbs-swiper"
        >
          {product.images.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} alt={`thumb-${i}`} className="thumb" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Main Carousel */}
        <Swiper
          spaceBetween={10}
          navigation
          pagination={{ clickable: true }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[Navigation, Pagination, Thumbs]}
          className="main-swiper"
        >
          {product.images.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} alt={product.name} className="main-slide" />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Product Info */}
        <div className="quickshop-info">
          <h2>{product.name}</h2>
          <p className="price">₹{product.price}</p>
          {product.discount && <p className="discount">{product.discount}% OFF</p>}
          <p>{product.description || "No description available."}</p>

          {/* Size selection */}
          {product.sizes && (
            <div className="size-selector">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={selectedSize === size ? "active" : ""}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* Quantity */}
          <div className="quantity-selector">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          <button
            className="add-to-cart"
            onClick={() =>
              alert(`Added ${quantity} ${product.name} (${selectedSize}) to cart`)
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickshopPage;
