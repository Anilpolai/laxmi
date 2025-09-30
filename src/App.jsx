import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./redux/slice/rootslice"; // New slice
import { Routes, Route, useLocation } from "react-router-dom";
import Kurti from "./Pages/Kurti";
import Home from "./Pages/Home";
import CartPage from "./Pages/addtocart/Cart";
import Kurtiset from "./Pages/products/kuratiset";
import Tunics from "./Pages/products/tunics";
import Coord from "./Pages/products/co-ord";
import Checkout from "./Pages/checkout/Checkout";
import ThankYou from "./Pages/checkout/ThankYou";
import Contact from "./Pages/contact/contact";
import About from "./Pages/About/About";
import Endlayout from "./component/Endlayout";
import Wishlist from "./component/wishlist/Wishlist";
import QuickshopPage from "./component/quickshop/quickshop";
import Loader from "./Pages/Loader";
import AdminLogin from "./Admin/admin";
import Admin from "./Admin/admin";
import AddProduct from "./Admin/adminpage/productlist/addproduct";
import ProductList from "./Admin/adminpage/productlist/productlist";
import Orders from "./Admin/adminpage/order/orders";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location]);

  // ✅ Fetch products from backend
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <Routes>
      <Route element={<Endlayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/quickshop/:id" element={<QuickshopPage />} />
        <Route path="/kurti" element={<Kurti category="Kurti" />} />
        <Route path="/kurti-set" element={<Kurtiset category="Kurti Set" />} />
        <Route path="/tunics" element={<Tunics category="Tunics" />} />
        <Route path="/co-ord" element={<Coord category="Co-Ord Set" />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route element={<Admin />}>
        <Route path="/products/addproduct" element={<AddProduct />} />
        <Route path="/products/ProductList" element={<ProductList />} />
        <Route path="/orders/orders" element={<Orders/>}/>
      </Route>
    </Routes>
  );
}

export default App;
