import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../redux/slice/rootslice";
import "./orders.css";

function Orders() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === "loading") return <p>Loading orders...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="orders-container">
      {/* ✅ Heading bar */}
      <div className="orders-header">
        <h2>📦 Orders</h2>
        <span className="orders-count">
          Total: {list.length} orders
        </span>
      </div>

      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Tracking ID</th>
            </tr>
          </thead>
          <tbody>
            {list.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>
                  {order.user?.name} <br />
                  <small>{order.user?.email}</small>
                </td>
                <td>₹{order.totalPrice}</td>
                <td>
                  <span
                    className={`status-badge ${
                      order.status?.toLowerCase() || "pending"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>{order.trackingId || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
