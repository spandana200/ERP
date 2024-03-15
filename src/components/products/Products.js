import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import productsMockData from "../../mockData/ProductsMockData";
import "../../styles/Products.css";
import SideBar from "../dashboard/SideBar";
import ProductsTable from "./ProductsTable";
const Products = () => {
  const [products, setProducts] = useState(productsMockData);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: 0.0,
    stockQuantity: 0,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [showEditProductPopup, setShowEditProductPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Extract categories from products data
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  // Function to add a new product
  const addProduct = () => {
    // Check if the product already exists
    const isProductExists = products.some(
      (product) => product.name.toLowerCase() === newProduct.name.toLowerCase()
    );

    if (
      isProductExists ||
      newProduct.name.length === 0 ||
      newProduct.category.length === 0 ||
      newProduct.price === 0 ||
      newProduct.stockQuantity === 0
    ) {
      setShowWarning(true);
      return;
    }
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setNewProduct({ name: "", category: "", price: 0.0, stockQuantity: 0 });
    setShowWarning(false);
    setShowAddProductPopup(false);
  };

  // Function to delete a product
  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Function to edit a product
  const editProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      price: product.price,
      stockQuantity: product.stockQuantity,
    });
    setShowWarning(false);
    setShowEditProductPopup(true);
  };

  // Function to save edited product
  const saveEdit = () => {
    const updatedProducts = products.map((product) =>
      product.id === editingProduct.id
        ? {
            ...product,
            name: newProduct.name,
            category: newProduct.category,
            price: newProduct.price,
            stockQuantity: newProduct.stockQuantity,
          }
        : product
    );
    setProducts(updatedProducts);
    setEditingProduct(null);
    setNewProduct({ name: "", category: "", price: 0.0, stockQuantity: 0 });
    setShowEditProductPopup(false);
  };

  // to change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAddIcon = () => {
    setShowAddProductPopup(true);
    setNewProduct({ name: "", category: "", price: 0.0, stockQuantity: 0 });
    setShowWarning(false);
  };

  return (
    <div className="container">
      <div style={{ width: "25%" }}>
        <SideBar />
      </div>
      <div className="content" style={{ marginLeft: "100px", width: "auto" }}>
        <h2 className="heading">Products</h2>
        <div className="addButtonContainer">
          <button onClick={handleAddIcon} className="addButton">
            <AddIcon />
            <b>Add Product</b>
          </button>
        </div>
        {showAddProductPopup ? (
          <div className="popup">
            <div className="popupContent">
              <span
                className="closeButton"
                onClick={() => setShowAddProductPopup(false)}
              >
                &times;
              </span>
              <h2 className="formHeading">Add new product</h2>

              {/* Form to add new product */}

              <label className="formLabel">
                <b>Product Name:</b>{" "}
              </label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="formInput"
              />

              <label className="formLabel">
                <b>Product Category:</b>{" "}
              </label>
              {/* <input
                type="text"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="formInput"
              /> */}
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="formInput"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <label className="formLabel">
                <b>Product Price:</b>{" "}
              </label>
              <input
                type="number"
                value={newProduct.price}
                step="any"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                className="formInput"
              />

              <label className="formLabel">
                <b>Stock Quantity: </b>
              </label>
              <input
                type="number"
                value={newProduct.stockQuantity}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stockQuantity: parseInt(e.target.value),
                  })
                }
                className="formInput"
              />

              <button onClick={addProduct} className="actionButton">
                Add Product
              </button>

              {/* Warning message */}
              {showWarning && (
                <p className="warningMessage">
                  Product already exists or Invalid Product Details
                </p>
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        {showEditProductPopup && (
          <div className="popup">
            <div className="popupContent">
              <span
                className="closeButton"
                onClick={() => {
                  setShowEditProductPopup(false);
                }}
              >
                &times;
              </span>
              <h2 className="formHeading">Edit the product</h2>

              {/* Form to edit product */}

              <label className="formLabel">
                <b>Product Name:</b>{" "}
              </label>
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="formInput"
              />

              <label className="formLabel">
                <b>Product Category:</b>{" "}
              </label>
              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
                className="formInput"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <label className="formLabel">
                <b>Product Price:</b>{" "}
              </label>
              <input
                type="number"
                value={newProduct.price}
                step="any"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: parseFloat(e.target.value),
                  })
                }
                className="formInput"
              />

              <label className="formLabel">
                <b>Stock Quantity: </b>
              </label>
              <input
                type="number"
                value={newProduct.stockQuantity}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stockQuantity: parseInt(e.target.value),
                  })
                }
                className="formInput"
              />

              <button onClick={saveEdit} className="actionButton">
                Save
              </button>
            </div>
          </div>
        )}

        <div>
          {/* Display products in a table */}

          <div className="tableContainer">
            <ProductsTable
              products={currentItems}
              editProduct={editProduct}
              deleteProduct={deleteProduct}
            />

            <div className="paginationButtons">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={
                  currentPage === 1 ? "pageButton disabled" : "pageButton"
                }
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={
                      currentPage === pageNumber
                        ? "pageButton active"
                        : "pageButton"
                    }
                  >
                    {pageNumber}
                  </button>
                )
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={
                  currentPage === totalPages
                    ? "pageButton disabled"
                    : "pageButton"
                }
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
