import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminProducts.css";
import ProductList from "./productlist";

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
    } else if (name === "sizes") {
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
        setProducts(products.map(p => p._id === editingId ? res.data : p)); // update product instantly
      } else {
        res = await axios.post("http://localhost:3000/api/products", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProducts([res.data, ...products]); // add new product instantly
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
      descriptionDetails: product.descriptionDetails || {
        fabric: "",
        length: "",
        style: "",
        occasion: "",
      },
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
      setProducts(products.filter(p => p._id !== id)); // remove instantly
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="admin-products">
      <h2>Product Management</h2>

      <form onSubmit={handleSubmit} className="product-form">
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <select name="category" value={formData.category} onChange={handleChange}>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} type="number" />
        <input name="discount" placeholder="Discount" value={formData.discount} onChange={handleChange} type="number" />
        <input name="fabric" placeholder="Fabric" value={formData.fabric} onChange={handleChange} />

        <label>Sizes:</label>
        <select name="sizes" multiple value={formData.sizes} onChange={handleChange}>
          {sizeOptions.map(size => <option key={size} value={size}>{size}</option>)}
        </select>

        <label>Stock Status:</label>
        <select name="stock" value={formData.stock} onChange={handleChange}>
          <option value="in">In Stock</option>
          <option value="out">Out of Stock</option>
        </select>

        <label>
          Best Selling:
          <input type="checkbox" name="bestSelling" checked={formData.bestSelling} onChange={handleChange} />
        </label>

        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />

        <h4>Product Details</h4>
        <table className="desc-table">
          <tbody>
            {["fabric", "length", "style", "occasion"].map(field => (
              <tr key={field}>
                <td>{field.charAt(0).toUpperCase() + field.slice(1)}</td>
                <td>
                  <input name={`desc_${field}`} value={formData.descriptionDetails[field] || ""} onChange={handleChange} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <label>Main Image:</label>
        <input type="file" name="image" onChange={handleChange} />
        <label>Hover Image:</label>
        <input type="file" name="hoverimage" onChange={handleChange} />
        <label>Additional Images:</label>
        <input type="file" name="images" multiple onChange={handleChange} />
        <label>Video:</label>
        <input type="file" name="video" onChange={handleChange} />

        <button type="submit">{editingId ? "Update Product" : "Add Product"}</button>
      </form>

      <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
