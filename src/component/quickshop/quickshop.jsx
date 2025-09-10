import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../redux/slice/wishlistSlice";
import { selectProductById } from "../../redux/slice/quickshopSlice";
import "./quickshop.css";

import ProductGallery from "./ProductGallery";
import ImageModal from "./ImageModal";
import LiveViewers from "./LiveViewers";
import SizeChartAccordion from "../sizeandpincode/SizeChartAccordion";
import PincodeAccordion from "../sizeandpincode/PincodeAccordion";
import ShippingAccordion from "../sizeandpincode/ShippingAccordion";
import DescriptionAccordion from "../sizeandpincode/Description";
import CareGuideAccordion from "../sizeandpincode/CareGuideAccordion";

const QuickshopPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state) => selectProductById(state, id));
  const wishlist = useSelector((state) => state.wishlist.items);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="p-4 text-red-500">❌ Product not found</div>;
  }

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="quickshop-page">
      <div className="quickshop-content">
        {/* ✅ Left: Product Gallery */}
        <ProductGallery
          images={product.images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onOpenModal={() => setIsModalOpen(true)}
        />

        {/* ✅ Right: Info */}
        <div className="quickshop-right">
          <h2>{product.name}</h2>
          <LiveViewers />
          <p className="price">₹{product.price}</p>
          {product.discount && (
            <p className="discount">{product.discount}% OFF</p>
          )}
          <p>{product.description}</p>

          {/* Sizes */}
          <div className="sizes">
            {product.sizes?.map((size) => (
              <button
                key={size}
                className={selectedSize === size ? "active" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Cart + Wishlist */}
          <div className="product-actions">
            <div className="quantity">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>

            <button className="add-to-cart">Add to Cart</button>

            <button
              className={`wishlist ${isWishlisted ? "active" : ""}`}
              onClick={() => dispatch(toggleWishlist(product.id))}
            >
              {isWishlisted ? "❤️ Wishlisted" : "♡ Add to Wishlist"}
            </button>
          </div>

          {/* Accordions */}
          <ShippingAccordion />
          <CareGuideAccordion />
          <SizeChartAccordion />
          <DescriptionAccordion productId={product.id} />
          <PincodeAccordion />
        </div>
      </div>

      {/* ✅ Fullscreen Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={product.images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
};

export default QuickshopPage;
