import React from "react";
import "../../Pages/kurti.css";

function KurtiFilter({
  showFilter,
  setShowFilter,
  availability,
  setAvailability,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  discount,
  setDiscount,
  fabric,
  setFabric,
}) {
  return (
    <aside className={`kurti-filter ${showFilter ? "open" : ""}`}>
      <button className="filter-close" onClick={() => setShowFilter(false)}>
        ✕
      </button>
      <h3>Filter</h3>


      {/* Availability */}
      <div className="filter-box">
        <h4>Availability</h4>
        <label>
          <input
            type="radio"
            name="avail"
            value="all"
            checked={availability === "all"}
            onChange={(e) => setAvailability(e.target.value)}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="avail"
            value="in"
            checked={availability === "in"}
            onChange={(e) => setAvailability(e.target.value)}
          />
          In Stock
        </label>
        <label>
          <input
            type="radio"
            name="avail"
            value="out"
            checked={availability === "out"}
            onChange={(e) => setAvailability(e.target.value)}
          />
          Out of Stock
        </label>
      </div>

      {/* Price */}
      <div className="filter-box">
        <h4>Price (₹)</h4>
        <div className="price-inputs">
          <input
            type="text"
            value={minPrice}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              setMinPrice(Number(e.target.value) || 0);
            }}
          />
          <span>–</span>
          <input
            type="text"
            value={maxPrice}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              setMaxPrice(Number(e.target.value) || 0);
            }}
          />
        </div>

        <input
          type="range"
          min="500"
          max="5000"
          step="100"
          value={maxPrice}
          onChange={(e) => {
            let val = Number(e.target.value);
            if (val < minPrice) val = minPrice;
            setMaxPrice(val);
          }}
        />
        <p>
          Range: <strong>₹{minPrice}</strong> – <strong>₹{maxPrice}</strong>
        </p>
      </div>

      {/* Discount Filter */}
      <div className="filter-box">
        <h4>Discount</h4>
        <label>
          <input
            type="radio"
            name="discount"
            value="all"
            checked={discount === "all"}
            onChange={(e) => setDiscount(e.target.value)}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="discount"
            value="10"
            checked={discount === "10"}
            onChange={(e) => setDiscount(e.target.value)}
          />
          10% & above
        </label>
        <label>
          <input
            type="radio"
            name="discount"
            value="20"
            checked={discount === "20"}
            onChange={(e) => setDiscount(e.target.value)}
          />
          20% & above
        </label>
        <label>
          <input
            type="radio"
            name="discount"
            value="30"
            checked={discount === "30"}
            onChange={(e) => setDiscount(e.target.value)}
          />
          30% & above
        </label>
      </div>

      {/* Fabric */}
      <div className="filter-box">
        <h4>Fabric</h4>
        <label>
          <input
            type="radio"
            name="fabric"
            value="all"
            checked={fabric === "all"}
            onChange={(e) => setFabric(e.target.value)}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="fabric"
            value="cotton"
            checked={fabric === "cotton"}
            onChange={(e) => setFabric(e.target.value)}
          />
          Cotton
        </label>
        <label>
          <input
            type="radio"
            name="fabric"
            value="silk"
            checked={fabric === "silk"}
            onChange={(e) => setFabric(e.target.value)}
          />
          Silk
        </label>
        <label>
          <input
            type="radio"
            name="fabric"
            value="rayon"
            checked={fabric === "rayon"}
            onChange={(e) => setFabric(e.target.value)}
          />
          Rayon
        </label>
      </div>


      <button
        className="reset-btn"
        onClick={() => {
          setAvailability("all");
          setMinPrice(500);
          setMaxPrice(5000);
          setDiscount("all");
          setFabric("all");
        }}
      >
        Reset Filters
      </button>

    </aside>
  );
}

export default KurtiFilter;
