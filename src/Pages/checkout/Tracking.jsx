import React, { useState } from "react";
import axios from "axios";

function TrackOrder() {
  const [trackingId, setTrackingId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/orders");
      const found = data.find((o) => o.trackingId === trackingId);
      if (found) {
        setOrder(found);
        setError("");
      } else {
        setOrder(null);
        setError("No order found with this Tracking ID");
      }
    } catch (err) {
      setError("Error tracking order");
    }
  };

  return (
    <div className="container my-5">
      <h2>🔍 Track Your Order</h2>
      <input
        type="text"
        className="form-control my-3"
        placeholder="Enter Tracking ID"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleTrack}>
        Track
      </button>

      {error && <p className="text-danger mt-3">{error}</p>}

      {order && (
        <div className="card mt-4 p-3 shadow">
          <h5>Order ID: {order._id}</h5>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ₹{order.totalPrice}</p>
          <p><strong>Tracking ID:</strong> {order.trackingId}</p>
        </div>
      )}
    </div>
  );
}

export default TrackOrder;
