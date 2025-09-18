import "./App.css";
import Kurti from "./Pages/Kurti";
import Home from "./Pages/Home";
import CartPage from "./Pages/addtocart/Cart";
import Kurtiset from "./Pages/products/kuratiset";
import Tunics from "./Pages/products/tunics";
import Coord from "./Pages/products/co-ord";
import { Routes, Route } from "react-router-dom";
import Endlayout from "./component/Endlayout";
import Wishlist from "./component/wishlist/Wishlist";
import QuickshopPage from "./component/quickshop/quickshop";

function App() {
  
  return (
    <>
      <Routes>
        {/* Layout wrapper */}
        <Route element={<Endlayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/quickshop/:id" element={<QuickshopPage />} />
          {/* Products by category */}
          <Route path="/kurti" element={<Kurti category="Kurti" />} />
          <Route path="/kurti-set" element={<Kurtiset category="Kurti Set" />} />
          <Route path="/tunics" element={<Tunics category="Tunics" />} />
          <Route path="/co-ord" element={<Coord category="Co-Ord Set" />} />
          <Route path="/cart" element={<CartPage/>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
