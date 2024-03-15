import DeleteIcon from "@material-ui/icons/Delete";
import ViewIcon from "@material-ui/icons/Visibility";
import React, { useState } from "react";
import ordersMockData from "../../mockData/OrdersMockData.js";
import "../../styles/Orders.css";
import "../../styles/Table.css";
import SideBar from "../dashboard/SideBar.js";

const Orders = () => {
  const [orders, setOrders] = useState(ordersMockData);
  const [showOrderDetails, setShowOrderDetails] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Function to handle deleting an order
  const deleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
  };

  //to view order Details
  const viewOrder = (orderId) => {
    const orderDetails = orders.find((order) => order.id === orderId);
    setShowOrderDetails(orderDetails);
  };

  //to update Order Status
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  //to change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="ordersContainer">
      <div style={{ width: "25%" }}>
        <SideBar />
      </div>
      <div className="content">
        <div>
          <h2 className="heading" style={{ marginLeft: "100px" }}>
            Orders
          </h2>
        </div>
        <div style={{ width: "100%", tableLayout: "auto" }}>
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
              {currentItems.map((order) => (
                <tr key={order.id}>
                  <td className="table-body">{order.id}</td>
                  <td className="table-body">{order.customerName}</td>
                  <td className="table-body">{order.orderDate}</td>
                  <td className="table-body">
                    {" "}
                    <select
                      style={{ color: "black" }}
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
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
        </div>
        <div className="paginationButtonsContainer">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={
              currentPage === 1
                ? "paginationButton disabled"
                : "paginationButton"
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
                    ? "paginationButton active"
                    : "paginationButton"
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
                ? "paginationButton disabled"
                : "paginationButton"
            }
          >
            Next
          </button>
        </div>
      </div>
      {showOrderDetails && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: 80,
              borderRadius: 8,
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "auto",
              height: "auto",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                cursor: "pointer",
                fontSize: 30,
                color: "black",
              }}
              onClick={() => {
                setShowOrderDetails(false);
              }}
            >
              &times;
            </span>
            <h2
              style={{
                textAlign: "center",
                color: "#4169e1",
                marginBottom: 20,
              }}
            >
              Order Details
            </h2>
            <p style={{ fontSize: 14, color: "#4169e1", marginBottom: 5 }}>
              <b>Order Id: </b>
              {showOrderDetails.id}
            </p>
            <p style={{ fontSize: 14, color: "#4169e1", marginBottom: 5 }}>
              <b>customerName: </b>
              {showOrderDetails.customerName}
            </p>
            <p style={{ fontSize: 14, color: "#4169e1", marginBottom: 5 }}>
              <b>orderDate: </b>
              {showOrderDetails.orderDate}
            </p>
            <p style={{ fontSize: 14, color: "#4169e1", marginBottom: 5 }}>
              <b>status: </b>
              {showOrderDetails.status}
            </p>
            <p style={{ fontSize: 14, color: "#4169e1", marginBottom: 5 }}>
              <b>expectedDeliveryDate: </b>
              {showOrderDetails.expectedDeliveryDate}
            </p>
            <p style={{ fontSize: 14, color: "#4169e1", marginBottom: 5 }}>
              <b>items: </b>
              {JSON.stringify(showOrderDetails.items)}
            </p>
            <p style={{ fontSize: 14, color: "#4169e1", marginBottom: 5 }}>
              <b>totalAmount: </b>
              {showOrderDetails.totalAmount}
            </p>
            <p style={{ fontSize: 14, color: "#4169e1", marginBottom: 5 }}>
              <b>shippingAddress: </b>
              {showOrderDetails.shippingAddress}
            </p>
            <p style={{ fontSize: 14, color: "#4169e1", marginBottom: 5 }}>
              <b>paymentStatus: </b>
              {showOrderDetails.paymentStatus}
            </p>
            <p style={{ fontSize: 14, color: "#4169e1", marginBottom: 5 }}>
              <b>transactionId: </b>
              {showOrderDetails.transactionId}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
