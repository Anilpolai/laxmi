// src/components/quickshop/LiveViewers.jsx
import React, { useState, useEffect } from "react";

const LiveViewers = () => {
  const [viewers, setViewers] = useState(20);

  useEffect(() => {
    const interval = setInterval(() => {
      // Random change between -3 and +3
      setViewers((prev) => {
        let newCount = prev + (Math.floor(Math.random() * 7) - 3);
        if (newCount < 5) newCount = 5;   // minimum viewers
        if (newCount > 60) newCount = 60; // maximum viewers
        return newCount;
      });
    }, 3000); // change every 30 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="live-viewers">
      👀 <span>{viewers}</span> customers are viewing this product
    </div>
  );
};

export default LiveViewers;
