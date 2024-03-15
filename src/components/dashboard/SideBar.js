import CalendarMonthIcon from "@material-ui/icons/CalendarToday";
import EventIcon from "@material-ui/icons/Event";
import HomeIcon from "@material-ui/icons/Home";
import PeopleIcon from "@material-ui/icons/People";
import React from "react";
import { Link } from "react-router-dom";
import OrdersIcon from "../../assets/orders.svg";
import ProductsIcon from "../../assets/product.svg";
import "../../styles/SideBar.css";
function SideBar() {
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-link">
        <HomeIcon />
        Home
      </Link>
      <Link to="/products" className="sidebar-link">
        <img src={ProductsIcon} alt="Product Icon" />
        Products
      </Link>
      <Link to="/orders" className="sidebar-link">
        <img src={OrdersIcon} alt="Order Icon" />
        Orders
      </Link>
      <Link to="/clients" className="sidebar-link">
        <PeopleIcon />
        Clients
      </Link>
      <Link to="/appointments" className="sidebar-link">
        <EventIcon />
        Appointments
      </Link>
      <Link to="/ordersCalendarView" className="sidebar-link">
        <CalendarMonthIcon />
        Calender
      </Link>
    </div>
  );
}

export default SideBar;
