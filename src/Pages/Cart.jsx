import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../redux/slice/rootslice";
import './cart.css';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return <div className="cart-page empty">🛒 Your cart is empty</div>;
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {/* Table header */}
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
      </table>

      {/* Cart items */}
      <div className="cart-items-wrapper">
        {cartItems.map((item) => (
          <div key={item.id + item.size} className="cart-item-row">
            {/* Product column */}
            <div className="product-column">
              <img src={item.image} alt={item.name} />
              <div className="product-details">
                <p><strong>{item.name}</strong></p>
                <p>{item.size}</p>
                <button
                  className="remove-btn"
                  onClick={() =>
                    dispatch(removeFromCart({ id: item.id, size: item.size }))
                  }
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Quantity column */}
            <div className="quantity-column">
              <div className="quantity-control">
                <button
                  onClick={() =>
                    dispatch(updateQuantity({
                      id: item.id,
                      size: item.size,
                      quantity: Math.max(1, item.quantity - 1),
                    }))
                  }
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch(updateQuantity({
                      id: item.id,
                      size: item.size,
                      quantity: item.quantity + 1,
                    }))
                  }
                >
                  +
                </button>
              </div>
            </div>

            {/* Total column */}
            <div className="total-column">
              <p>₹{(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Cart summary */}
      <div className="cart-summary">
        <h3>Cart Summary</h3>
        <p>Total Items: {cartItems.length}</p>
        <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
        <button
          className="checkout-btn"
          onClick={() => alert("Checkout not implemented")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
