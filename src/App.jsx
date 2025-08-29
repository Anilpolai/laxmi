import "./App.css";
import Kurti from "./Pages/Kurti";
import Home from "./Pages/Home";
import Kurtiset from "./Pages/products/kurati-set";
import Tunics from "./Pages/products/tunics";
import Coord from "./Pages/products/co-ord";
import { Routes, Route } from "react-router-dom";
import Endlayout from "./component/Endlayout";
import Wishlist from "./component/wishlist/Wishlist";

function App() {
  return (
    <>
      <Routes>
        {/* Layout wrapper */}
        <Route element={<Endlayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist/>} />

          {/* Products by category */}
          <Route path="/kurti" element={<Kurti category="Kurti" />} />
          <Route path="/kurti-set" element={<Kurtiset category="Kurti Set" />} />
          <Route path="/tunics" element={<Tunics category="Tunics" />} />
          <Route path="/co-ord" element={<Coord category="Co-Ord Set" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
