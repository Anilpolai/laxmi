import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./thankyou.css";

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <Container className="thankyou-page d-flex flex-column justify-content-center align-items-center text-center py-5">
      <div className="thankyou-card shadow-sm p-5 rounded">
        <h1 className="mb-3">🎉 Thank You!</h1>
        <p className="mb-4">
          Your order has been placed successfully. We’ll notify you once it’s shipped.
        </p>
        <Button variant="primary" onClick={() => navigate("/")}>
          Continue Shopping
        </Button>
      </div>
    </Container>
  );
};

export default ThankYouPage;
