import DeleteIcon from "@material-ui/icons/Delete";

import EditIcon from "@material-ui/icons/Edit";
import React from "react";
import "../../styles/Table.css";
const ProductsTable = ({ products, editProduct, deleteProduct }) => {
  return (
    <table className="table-container">
      <thead className="table-header">
        <tr
          style={{
            backgroundColor: "#4169e1",
          }}
        >
          <th className="table-header">Name</th>
          <th className="table-header">Category</th>
          <th className="table-header">Price(in Rs)</th>
          <th className="table-header">Stock Quantity</th>
          <th className="table-header">Actions</th>
        </tr>
      </thead>
      <tbody className="table-body">
        {products.map((product) => (
          <tr key={product.id}>
            <td className="table-body">{product.name}</td>
            <td className="table-body">{product.category}</td>
            <td className="table-body">{product.price}</td>
            <td className="table-body">{product.stockQuantity}</td>
            <td className="actions-column">
              <EditIcon
                onClick={() => editProduct(product)}
                style={{ color: "#4169e1" }}
              />
              <DeleteIcon
                onClick={() => deleteProduct(product.id)}
                style={{ color: "#4169e1" }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ProductsTable;
