import React, { useState, useEffect } from "react";

function Filter({ products, onFilter }) {
  const [availability, setAvailability] = useState("all");
  const [minPrice, setMinPrice] = useState(500);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [discount, setDiscount] = useState("all");
  const [fabric, setFabric] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    let updated = products.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );

    // Availability filter
    if (availability === "in") updated = updated.filter((p) => p.stock > 0);
    if (availability === "out") updated = updated.filter((p) => p.stock === 0);

    // Discount filter
    if (discount !== "all") {
      const minDisc = Number(discount);
      updated = updated.filter((p) => p.discount >= minDisc);
    }

    // Fabric filter
    if (fabric !== "all") {
      updated = updated.filter(
        (p) => p.fabric?.toLowerCase() === fabric.toLowerCase()
      );
    }

    // Sorting
    if (sortBy === "low-high") updated.sort((a, b) => a.price - b.price);
    if (sortBy === "high-low") updated.sort((a, b) => b.price - a.price);

    onFilter(updated); // send filtered products back to parent
  }, [availability, minPrice, maxPrice, discount, fabric, sortBy, products]);

  return (
    <aside className="kurti-filter">
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
            onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
          />
          <span>–</span>
          <input
            type="text"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value) || 0)}
          />
        </div>
        <input
          type="range"
          min="500"
          max="5000"
          step="100"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
        <p>
          Range: <strong>₹{minPrice}</strong> – <strong>₹{maxPrice}</strong>
        </p>
      </div>

      {/* Discount */}
      <div className="filter-box">
        <h4>Discount</h4>
        {["all", "10", "20", "30"].map((d) => (
          <label key={d}>
            <input
              type="radio"
              name="discount"
              value={d}
              checked={discount === d}
              onChange={(e) => setDiscount(e.target.value)}
            />
            {d === "all" ? "All" : `${d}% & above`}
          </label>
        ))}
      </div>

      {/* Sort */}
      <div className="filter-box">
        <h4>Sort By</h4>
        {["default", "low-high", "high-low"].map((s) => (
          <label key={s}>
            <input
              type="radio"
              name="sort"
              value={s}
              checked={sortBy === s}
              onChange={(e) => setSortBy(e.target.value)}
            />
            {s === "default"
              ? "Default"
              : s === "low-high"
              ? "Price: Low to High"
              : "Price: High to Low"}
          </label>
        ))}
      </div>

      {/* Fabric */}
      <div className="filter-box">
        <h4>Fabric</h4>
        {["all", "cotton", "silk", "rayon"].map((f) => (
          <label key={f}>
            <input
              type="radio"
              name="fabric"
              value={f}
              checked={fabric === f}
              onChange={(e) => setFabric(e.target.value)}
            />
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </label>
        ))}
      </div>
    </aside>
  );
}

export default Filter;
