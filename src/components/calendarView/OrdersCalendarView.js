import HomeIcon from "@material-ui/icons/Home";
import React, { useState } from "react";

import { Link } from "react-router-dom";

import { Calendar } from "react-calendar";
import ordersMockData from "../../mockData/OrdersMockData";

// const localizer = momentLocalizer(moment);

function OrdersCalendarView() {
  const [orders, setOrders] = useState(ordersMockData);
  const [showOrders, setShowOrders] = useState(false);
  const [dueOrders, setDueOrders] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const filterOrdersForDate = (date) => {
    const formattedDate = formatDate(date);
    const filteredOrders = orders.filter(
      (order) => order.expectedDeliveryDate === formattedDate
    );
    return filteredOrders;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDueOrders(filterOrdersForDate(date));
    setShowOrders(true);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            textDecorationLine: "none",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            color: "#4169e1",
          }}
        >
          <HomeIcon />
          Home
        </Link>

        <h2
          style={{ textAlign: "center", marginLeft: "250px", color: "#4169e1" }}
        >
          Orders Calendar
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <Calendar
            value={selectedDate}
            onChange={handleDateChange}
            tileContent={({ date }) => {
              if (formatDate(date) === formatDate(new Date())) {
                return <p style={{ color: "red" }}> today</p>;
              }
              return <p> </p>;
            }}
          />
        </div>
      </div>
      {showOrders && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            color: "white",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              cursor: "pointer",
              fontSize: 30,
              color: "white",
            }}
            onClick={() => {
              setShowOrders(false);
            }}
          >
            &times;
          </span>
          <h3>Orders due for delivery on {formatDate(selectedDate)}</h3>
          {dueOrders && dueOrders.length > 0 ? (
            <ul>
              {dueOrders.map((order) => (
                <li key={order.id}>{order.customerName}</li>
              ))}
            </ul>
          ) : (
            <div>
              <p>No Due orders on this date </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OrdersCalendarView;
