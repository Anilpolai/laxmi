import React from 'react';
import { useSelector } from 'react-redux';
import './categories.css';

export default function CategorySection() {
  const categories = useSelector((state) => state.categories.list);

  return (
    <div className="categories-container">
      {categories.map((cat, index) => (
        <div className="category-item" key={index} onClick={() => alert(`Clicked ${cat.name}`)}>
          <div className="category-image">
            <img src={cat.img} alt={cat.name} />
          </div>
          <p className="category-name">{cat.name}</p>
        </div>
      ))}
    </div>
  );
}
