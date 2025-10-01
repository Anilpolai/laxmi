import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function List() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "in",
    discount: "",
    fabric: "",
    sizes: [],
    description: "",
    descriptionDetails: { fabric: "", length: "", style: "", occasion: "" },
    bestSelling: false,
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      category: product.category || "",
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
      bestSelling: product.bestSelling || false,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "bestSelling") {
      setFormData({ ...formData, [name]: checked });
    } else if (name.startsWith("desc_")) {
      setFormData({
        ...formData,
        descriptionDetails: {
          ...formData.descriptionDetails,
          [name.replace("desc_", "")]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("stock", formData.stock === "in" ? 1 : 0);
      data.append("discount", formData.discount);
      data.append("fabric", formData.fabric);
      data.append("sizes", JSON.stringify(formData.sizes));
      data.append("description", formData.description);
      data.append(
        "descriptionDetails",
        JSON.stringify(formData.descriptionDetails)
      );
      data.append("bestSelling", formData.bestSelling);

      const res = await axios.put(
        `http://localhost:3000/api/products/${editingProduct._id}`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setProducts(
        products.map((p) => (p._id === editingProduct._id ? res.data : p))
      );
      setShowModal(false);
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <>
      <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Stock</Form.Label>
              <Form.Select
                name="stock"
                value={formData.stock}
                onChange={handleChange}
              >
                <option value="in">In Stock</option>
                <option value="out">Out of Stock</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Check
                type="checkbox"
                label="Best Selling"
                name="bestSelling"
                checked={formData.bestSelling}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Update Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
