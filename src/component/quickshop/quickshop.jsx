import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist, selectProductById, selectReviewsByProduct } from "../../redux/slice/rootslice";
import "./quickshop.css";

import ProductGallery from "./ProductGallery";
import ImageModal from "./ImageModal";
import LiveViewers from "./LiveViewers";
import { RxDividerVertical } from "react-icons/rx";
import SizeChartAccordion from "../sizeandpincode/SizeChartAccordion";
import PincodeAccordion from "../sizeandpincode/PincodeAccordion";
import ShippingAccordion from "../sizeandpincode/ShippingAccordion";
import DescriptionAccordion from "../sizeandpincode/Description";
import CareGuideAccordion from "../sizeandpincode/CareGuideAccordion";
import SimilarProducts from "./SimilarProducts";
import Review from "../review/review";
import ReviewList from "../review/reviewList";

const QuickshopPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state) => selectProductById(state, id));
  const wishlist = useSelector((state) => state.wishlist.items);
  const reviews = useSelector((state) => selectReviewsByProduct(state, id));

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div className="p-4 text-red-500">❌ Product not found</div>;
  }

  const isWishlisted = wishlist.includes(product.id);

  return (
    <>
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
                onClick={() => dispatch(toggleWishlist(product.id))}>
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
      </div>.

      {/* ✅ Review Section */}
      <div className="review-wrapper">
        <h2>Customer Reviews</h2>
        <div className="review-section">
          {/* Left side → Review List */}
          <div className="review-left">
            <ReviewList reviews={reviews} />
          </div>

          {/* Divider Line */}
          <div className="review-divider-line"><RxDividerVertical /></div>

          {/* Right side → Button */}
          <div className="review-right">
            <button
              className="review-btn"
              onClick={() => setIsReviewModalOpen(true)}
            >
              Write a Review
            </button>
          </div>
        </div>
      </div>

      {isReviewModalOpen && (
        <div className="review-modal open">
          <div className="review-modal-content">
            <button
              className="close-btn"
              onClick={() => setIsReviewModalOpen(false)}
            >
              ✖
            </button>
            <Review
              productId={product.id}
              onClose={() => setIsReviewModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* ✅ Similar Products Section */}
      {/* <SimilarProducts currentProductId={product.id} category={product.category} /> */}
    </>
  );
};

export default QuickshopPage;
