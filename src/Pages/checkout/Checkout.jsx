import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../redux/slice/rootslice";
import axios from "axios";
import "./checkout.css";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart?.items || []);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    payment: "cod",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderPayload = {
        user: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zip: formData.zip,
        },
        items: cartItems,
        payment: formData.payment,
        totalPrice,
      };

      const res = await axios.post("http://localhost:3000/api/order", orderPayload);

      console.log("Order placed:", res.data);

      dispatch(clearCart());
      navigate("/thank-you");
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };


  return (
    <Container className="checkout-page py-5">
      <h2 className="mb-4 text-center">Checkout</h2>
      <Row>
        {/* Billing / Shipping Form */}
        <Col md={7}>
          <Card className="p-4 shadow-sm checkout-form">
            <h4 className="mb-3">Billing Details</h4>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <h5 className="mt-4">Payment Method</h5>
              <Form.Check
                type="radio"
                name="payment"
                value="cod"
                label="Cash on Delivery"
                checked={formData.payment === "cod"}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                name="payment"
                value="online"
                label="Credit / Debit / UPI"
                checked={formData.payment === "online"}
                onChange={handleChange}
              />

              <Button type="submit" className="mt-4 w-100 checkout-btn">
                Place Order
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col md={5}>
          <Card className="p-4 shadow-sm order-summary">
            <h4 className="mb-3">Order Summary</h4>
            {cartItems.map((item) => (
              <div
                key={item.id + item.size}
                className="d-flex mb-3 align-items-center border-bottom pb-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  width={60}
                  className="me-3 rounded"
                />
                <div className="flex-grow-1">
                  <p className="mb-1 fw-bold">{item.name}</p>
                  <small>
                    {item.size} × {item.quantity}
                  </small>
                </div>
                <p className="mb-0 fw-semibold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}

            <div className="d-flex justify-content-between mt-3 fw-bold">
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
