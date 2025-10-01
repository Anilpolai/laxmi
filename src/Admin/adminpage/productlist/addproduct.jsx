import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductList from "./ProductList";
import "./AdminProducts.css";

export default function AddProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    category: "kurti",
    price: "",
    stock: "in",
    discount: "",
    fabric: "",
    sizes: [],
    description: "",
    descriptionDetails: { fabric: "", length: "", style: "", occasion: "" },
    image: null,
    hoverimage: null,
    images: [],
    video: null,
    bestSelling: false,
  });

  const [editingId, setEditingId] = useState(null);

  const categories = ["kurti", "kurtiSet", "tunics", "coord"];
  const sizeOptions = ["S", "M", "L", "XL", "XXL"];

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Fetch products error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (files) {
      setFormData({
        ...formData,
        [name]: name === "images" ? Array.from(files) : files[0],
      });
    } else if (name.startsWith("desc_")) {
      setFormData({
        ...formData,
        descriptionDetails: {
          ...formData.descriptionDetails,
          [name.replace("desc_", "")]: value,
        },
      });
    } else if (type === "checkbox" && name === "sizes") {
      const selected = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData({ ...formData, sizes: selected });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("stock", formData.stock === "in" ? 1 : 0);
    data.append("discount", formData.discount);
    data.append("fabric", formData.fabric);
    data.append("sizes", JSON.stringify(formData.sizes));
    data.append("description", formData.description);
    data.append("descriptionDetails", JSON.stringify(formData.descriptionDetails));
    data.append("bestSelling", formData.bestSelling);

    if (formData.image) data.append("image", formData.image);
    if (formData.hoverimage) data.append("hoverimage", formData.hoverimage);
    if (formData.images.length > 0) {
      formData.images.forEach((file) => data.append("images", file));
    }
    if (formData.video) data.append("video", formData.video);

    try {
      let res;
      if (editingId) {
        res = await axios.put(`http://localhost:3000/api/products/${editingId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProducts(products.map((p) => (p._id === editingId ? res.data : p)));
      } else {
        res = await axios.post("http://localhost:3000/api/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProducts([res.data, ...products]);
      }

      setFormData({
        name: "",
        category: "kurti",
        price: "",
        stock: "in",
        discount: "",
        fabric: "",
        sizes: [],
        description: "",
        descriptionDetails: { fabric: "", length: "", style: "", occasion: "" },
        image: null,
        hoverimage: null,
        images: [],
        video: null,
        bestSelling: false,
      });
      setEditingId(null);
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      name: product.name || "",
      category: product.category || "kurti",
      price: product.price || "",
      stock: product.stock > 0 ? "in" : "out",
      discount: product.discount || "",
      fabric: product.fabric || "",
      sizes: product.sizes || [],
      description: product.description || "",
      descriptionDetails: product.descriptionDetails || { fabric: "", length: "", style: "", occasion: "" },
      image: null,
      hoverimage: null,
      images: [],
      video: null,
      bestSelling: product.bestSelling || false,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="container my-4">
      <h2 className="mb-4">Product Management</h2>
      <div className="card shadow-sm mb-4 p-3">
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="form-control mb-2" required />
            <select name="category" value={formData.category} onChange={handleChange} className="form-select mb-2">
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} type="number" className="form-control mb-2" />
            <input name="discount" placeholder="Discount" value={formData.discount} onChange={handleChange} type="number" className="form-control mb-2" />
            <input name="fabric" placeholder="Fabric" value={formData.fabric} onChange={handleChange} className="form-control mb-2" />

            <label>Sizes:</label>
            <div className="mb-2">
              {sizeOptions.map((size) => (
                <div className="form-check form-check-inline" key={size}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="sizes"
                    value={size}
                    checked={formData.sizes.includes(size)}
                    onChange={(e) => {
                      let newSizes = [...formData.sizes];
                      if (e.target.checked) newSizes.push(size);
                      else newSizes = newSizes.filter((s) => s !== size);
                      setFormData({ ...formData, sizes: newSizes });
                    }}
                  />
                  <label className="form-check-label">{size}</label>
                </div>
              ))}
            </div>

            <label>Stock Status:</label>
            <select name="stock" value={formData.stock} onChange={handleChange} className="form-select mb-2">
              <option value="in">In Stock</option>
              <option value="out">Out of Stock</option>
            </select>

            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" name="bestSelling" checked={formData.bestSelling} onChange={handleChange} />
              <label className="form-check-label">Best Selling</label>
            </div>

            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="form-control mb-2" rows="3" />
          </div>

          <div className="col-md-6">
            <h5>Product Details</h5>
            {["fabric", "length", "style", "occasion"].map((field) => (
              <div className="mb-2" key={field}>
                <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                <input name={`desc_${field}`} value={formData.descriptionDetails[field] || ""} onChange={handleChange} className="form-control" />
              </div>
            ))}

            <div className="mb-2">
              <label>Additional Images</label>
              <input type="file" name="images" multiple onChange={handleChange} className="form-control" />
            </div>
            <div className="mb-2">
              <label>Video</label>
              <input type="file" name="video" onChange={handleChange} className="form-control" />
            </div>

            <button type="submit" className="btn btn-primary mt-2">
              {editingId ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>

      <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
