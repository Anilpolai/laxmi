import React, { useState } from "react";
import axios from "axios";

function UpdateTrackingModal({ orderId, onClose, onUpdated }) {
  const [trackingId, setTrackingId] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = async () => {
    try {
      const { data } = await axios.put(`/api/orders/${orderId}/status`, { trackingId, status });
      alert("Tracking updated!");
      onUpdated(data.order);
      onClose();
    } catch (error) {
      alert("Error updating tracking");
    }
  };

  return (
    <div className="modal">
      <h3>Update Tracking</h3>
      <input value={trackingId} onChange={(e) => setTrackingId(e.target.value)} placeholder="Tracking ID" />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>Pending</option>
        <option>Processing</option>
        <option>Shipped</option>
        <option>Delivered</option>
        <option>Cancelled</option>
      </select>
      <button onClick={handleSubmit}>Update</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}
