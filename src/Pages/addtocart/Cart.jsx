import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../../redux/slice/rootslice";
import CartSummary from "./CartSummary";
import { motion } from "framer-motion";
import "./cart.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

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

      <div className="cart-layout">
        {/* Left: Cart Items */}
        <motion.div
          className="cart-items-section"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <table className="cart-table">
            <thead>
              <tr>
                <th className="text-left">Product</th>
                <th className="text-center">Quantity</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <motion.tbody>
              {cartItems.map((item) => (
                <motion.tr
                  key={item.id + item.size}
                  className="cart-item-row"
                  variants={itemVariants}
                >
                  {/* Product column */}
                  <td className="product-column text-left">
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
                  </td>

                  {/* Quantity column */}
                  <td className="quantity-column text-center">
                    <div className="quantity-control">
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              size: item.size,
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          )
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.id,
                              size: item.size,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Total column */}
                  <td className="total-column text-right">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </motion.div>

        {/* Right: Cart Summary */}
        <CartSummary cartItems={cartItems} totalPrice={totalPrice} />
      </div>
    </div>
  );
};

export default CartPage;
