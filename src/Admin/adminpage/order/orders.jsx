import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../redux/slice/rootslice";

function Orders() {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (status === "loading") return <p>Loading orders...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <h2>📦 Orders</h2>
      <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
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
              <td>{order.user?.name} ({order.user?.email})</td>
              <td>₹{order.totalPrice}</td>
              <td>{order.status}</td>
              <td>{order.trackingId || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
