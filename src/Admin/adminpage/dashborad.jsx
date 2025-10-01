import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { FiShoppingCart, FiUsers, FiPackage } from "react-icons/fi";
import { MdAttachMoney } from "react-icons/md";
import "./dashboard.css"; // CSS below

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("month"); // "week" | "month" | "year"
  const [chartType, setChartType] = useState("line"); // "line" or "bar"

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const [ordRes, prodRes] = await Promise.all([
          axios.get("http://localhost:3000/api/order"), // get all orders
          axios.get("http://localhost:3000/api/products"),
        ]);
        setOrders(ordRes.data || []);
        setProducts(prodRes.data || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  // helpers
  const formatDateKey = (date, r) => {
    const d = new Date(date);
    if (r === "week") {
      // return "YYYY-Www"
      const start = new Date(d);
      const day = (d.getDay() + 6) % 7; // iso week start Monday
      start.setDate(d.getDate() - day);
      return start.toISOString().slice(0, 10);
    }
    if (r === "month") {
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    }
    // year
    return `${d.getFullYear()}`;
  };

  // aggregates for chart
  const chartData = useMemo(() => {
    if (!orders) return [];

    const map = new Map();
    const now = new Date();

    // choose window: last 7 days / last 12 months / last 12 years
    let windowSize = 12;
    if (range === "week") windowSize = 7;
    if (range === "month") windowSize = 12;
    if (range === "year") windowSize = 5;

    // prepare keys (so chart always shows empty keys)
    const keys = [];
    if (range === "week") {
      // last 7 days
      for (let i = windowSize - 1; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(now.getDate() - i);
        keys.push(d.toISOString().slice(0, 10));
      }
    } else if (range === "month") {
      // last 12 months
      for (let i = windowSize - 1; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        keys.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
      }
    } else {
      // last 5 years
      for (let i = windowSize - 1; i >= 0; i--) {
        const d = new Date(now.getFullYear() - i, 0, 1);
        keys.push(String(d.getFullYear()));
      }
    }

    // aggregate
    orders.forEach((o) => {
      const key = formatDateKey(o.createdAt, range === "week" ? "week" : range);
      const k = range === "week" ? key : key;
      const prev = map.get(k) || { revenue: 0, orders: 0 };
      map.set(k, {
        revenue: prev.revenue + Number(o.totalPrice || 0),
        orders: prev.orders + 1,
      });
    });

    // build array
    return keys.map((k) => ({
      name:
        range === "week"
          ? k.slice(5) // "MM-DD"
          : range === "month"
          ? k // "YYYY-MM"
          : k,
      revenue: map.get(k)?.revenue || 0,
      orders: map.get(k)?.orders || 0,
    }));
  }, [orders, range]);

  // top stats
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((s, o) => s + Number(o.totalPrice || 0), 0);
    const totalCustomers = new Set(orders.map((o) => (o.user?.email || o.user?.id || o.user))).size;
    const pending = orders.filter((o) => o.status === "pending" || o.status === "processing").length;
    return {
      totalOrders,
      totalRevenue,
      totalCustomers,
      pending,
    };
  }, [orders]);

  const recentOrders = useMemo(() => {
    return [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);
  }, [orders]);

  const topProducts = useMemo(() => {
    const map = new Map();
    orders.forEach((o) => {
      (o.items || []).forEach((it) => {
        const id = it.id || it.productId || it._id;
        const prev = map.get(id) || { name: it.name || it.title, qty: 0 };
        prev.qty += Number(it.quantity || it.qty || 1);
        map.set(id, prev);
      });
    });
    return Array.from(map.entries())
      .map(([id, val]) => ({ id, ...val }))
      .sort((a, b) => b.qty - a.qty)
      .slice(0, 5);
  }, [orders]);

  if (loading) return <div className="adm-loading">Loading dashboard...</div>;

  return (
    <div className="adm-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="adm-stats">
        <StatCard title="Total Orders" value={stats.totalOrders} icon={<FiShoppingCart />} />
        <StatCard title="Revenue" value={`₹${Number(stats.totalRevenue).toFixed(2)}`} icon={<MdAttachMoney />} />
        <StatCard title="Customers" value={stats.totalCustomers} icon={<FiUsers />} />
        <StatCard title="Pending Orders" value={stats.pending} icon={<FiPackage />} />
      </div>

      <div className="adm-main-grid">
        <section className="adm-chart-card">
          <div className="adm-chart-header">
            <div className="adm-range">
              <button className={range === "week" ? "active" : ""} onClick={() => setRange("week")}>Week</button>
              <button className={range === "month" ? "active" : ""} onClick={() => setRange("month")}>Month</button>
              <button className={range === "year" ? "active" : ""} onClick={() => setRange("year")}>Year</button>
            </div>

            <div className="adm-chart-controls">
              <button onClick={() => setChartType("line")} className={chartType === "line" ? "active" : ""}>Line</button>
              <button onClick={() => setChartType("bar")} className={chartType === "bar" ? "active" : ""}>Bar</button>
            </div>
          </div>

          <div className="adm-chart-body">
            <ResponsiveContainer width="100%" height={300}>
              {chartType === "line" ? (
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              ) : (
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" barSize={20} fill="#82ca9d" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </section>

        <section className="adm-orders-card">
          <h3>Recent Orders</h3>
          <div className="adm-orders-list">
            {recentOrders.length === 0 && <div>No orders yet</div>}
            {recentOrders.map((o) => (
              <div key={o._id || o.id} className="adm-order-item">
                <div>
                  <strong>{o.user?.name || o.user?.email || "Customer"}</strong>
                  <div className="muted">{new Date(o.createdAt).toLocaleString()}</div>
                </div>
                <div className="adm-order-right">
                  <div className="muted">₹{Number(o.totalPrice || 0).toFixed(2)}</div>
                  <div className={`status ${o.status || "unknown"}`}>{o.status || "unknown"}</div>
                </div>
              </div>
            ))}
          </div>

          <h4 style={{ marginTop: 16 }}>Top Products</h4>
          <ul className="adm-top-products">
            {topProducts.map((p) => (
              <li key={p.id}>
                <span>{p.name || p.id}</span>
                <strong>{p.qty}</strong>
              </li>
            ))}
            {topProducts.length === 0 && <li>No product sales yet</li>}
          </ul>
        </section>
      </div>

      <section className="adm-table-section">
        <h3>All Orders</h3>
        <OrdersTable orders={orders} onRefresh={() => { /* optionally reload */ }} />
      </section>
    </div>
  );
}

/* ---------- Small subcomponents ---------- */

function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-left">
        <div className="stat-icon">{icon}</div>
      </div>
      <div className="stat-right">
        <div className="stat-title">{title}</div>
        <div className="stat-value">{value}</div>
      </div>
    </div>
  );
}

function OrdersTable({ orders }) {
  return (
    <div className="orders-table-wrapper">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Total</th>
            <th>Status</th>
            <th>Tracking</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && (
            <tr><td colSpan="7" style={{ textAlign: "center" }}>No orders</td></tr>
          )}
          {orders.map((o) => (
            <tr key={o._id || o.id}>
              <td>{(o._id || o.id || "").slice?.(0, 8)}</td>
              <td>{o.user?.name || o.user?.email || "Guest"}</td>
              <td>{(o.items || []).reduce((s, it) => s + (it.quantity || it.qty || 1), 0)}</td>
              <td>₹{Number(o.totalPrice || 0).toFixed(2)}</td>
              <td><span className={`badge ${o.status || "unknown"}`}>{o.status || "unknown"}</span></td>
              <td>{o.trackingId || "-"}</td>
              <td>{new Date(o.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
