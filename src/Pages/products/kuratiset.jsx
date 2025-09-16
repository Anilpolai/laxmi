import React from 'react';
import ProductListing from "../ProductListing";
import banner from "../../img/kurti/homekurti.jpg"; // Change banner if needed

function KurtiSet() {
  return (
    <ProductListing
      category="kurti-set"
      title="Kurti Set"
      subtitle="Trendy kurti sets with dupattas for every occasion."
      banner={banner}
    />
  );
}

export default KurtiSet;
