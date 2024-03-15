import DeleteIcon from "@material-ui/icons/Delete";
import ViewIcon from "@material-ui/icons/Visibility";
import "../../styles/Table.css";

import React, { useState } from "react";

const OrdersTable = ({ orders, viewOrder, deleteOrder }) => {
  const [allOrders, setAllOrders] = useState(orders);
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = allOrders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setAllOrders(updatedOrders);
  };
  return (
    <table>
      <thead className="table-header">
        <tr
          style={{
            backgroundColor: "#4169e1",
          }}
        >
          <th className="table-header">Order Id</th>
          <th className="table-header">Customer Name</th>
          <th className="table-header">Order Date</th>
          <th className="table-header">Status</th>
          <th className="table-header">Actions</th>
        </tr>
      </thead>
      <tbody className="table-body" style={{ color: "black" }}>
        {allOrders.map((order) => (
          <tr key={order.id}>
            <td className="table-body">{order.id}</td>
            <td className="table-body">{order.customerName}</td>
            <td className="table-body">{order.orderDate}</td>
            <td className="table-body">
              {" "}
              <select
                style={{ color: "black" }}
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </td>

            <td className="actions-column">
              <ViewIcon
                onClick={() => viewOrder(order.id)}
                style={{ color: "#4169e1" }}
              />
              <DeleteIcon
                onClick={() => deleteOrder(order.id)}
                style={{ color: "#4169e1" }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default OrdersTable;
