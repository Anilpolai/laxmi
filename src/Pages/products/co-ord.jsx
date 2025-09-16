import React from 'react'
import ProductListing from "../ProductListing";
import banner from "../../img/kurti/homekurti.jpg"; // change if coord banner exists

function coord() {
  return (
// Coord.jsx
<ProductListing
  category="coord"
  title="Co-ord"
  subtitle="Elegance redefined with every co-ord — tradition and style combined."
  banner={banner}
/>

  )
}

export default coord