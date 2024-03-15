import GroupsOutlinedIcon from "@material-ui/icons/GroupOutlined";
import React from "react";
import clientsMockData from "../../mockData/ClientsMockData";
import ordersMockData from "../../mockData/OrdersMockData";
import productsMockData from "../../mockData/ProductsMockData";

import appointments from "../../mockData/AppointmentsMockData";
import ItemsByCategory from "../dashboard/ItemsByCategory";
import OrdersByMonthGraph from "../dashboard/OrdersByMonthGraph";
import OrdersTodayGraph from "../dashboard/OrdersTodayGraph";
import ProductsGraph from "../dashboard/ProductsGraph";
import SideBar from "../dashboard/SideBar";
function Dashboard() {
  const orders = ordersMockData;
  const products = productsMockData;

  const topSellingProducts = () => {
    let orderedProductDict = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (orderedProductDict[item.name]) {
          orderedProductDict[item.name] += item.quantity;
        } else {
          orderedProductDict[item.name] = item.quantity;
        }
      });
    });
    var dictArray = Object.keys(orderedProductDict).map((key) => {
      return [key, orderedProductDict[key]];
    });
    dictArray.sort((first, second) => {
      return first[1] - second[1];
    });
    var topFiveProducts = dictArray
      .map((e) => {
        return e[0];
      })
      .slice(0, 5);
    return topFiveProducts;
  };

  const todayAppointments = () => {
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10); // Get today's date in "yyyy-mm-dd" format
    const todayAppointments = appointments.filter(
      (appointment) => appointment.appointmentDate === todayString
    );
    return todayAppointments.length;
  };
  return (
    <div style={{ margin: 0, height: "100vh" }}>
      <h2
        style={{
          position: "relative",
          color: "#4169e1",
          textAlign: "center",
        }}
      >
        Dashboard
      </h2>
      <div
        className="dashboard-content "
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* side panel */}
        <div className="dashboard-side-panel" style={{ height: "75vh" }}>
          <SideBar />
        </div>
        <div>
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",

              marginLeft: "100px",
              height: "auto",
            }}
          >
            <div
              style={{
                position: "relative",
                height: "45vh",
                background: "white",
                width: "450px",

                padding: 5,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginLeft: "10px",
                }}
              ></div>

              {/* horizontal chart overview of todays order*/}
              <div className="vertical-graph" style={{ height: "200px" }}>
                <OrdersTodayGraph orders={orders} />
              </div>
            </div>
            {/* total number of clients in erp*/}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#4169e1",
                color: "white",
                height: "auto",
                width: "auto",
                position: "absolute",
                marginLeft: "430px",
                marginTop: "20px",
              }}
            >
              <GroupsOutlinedIcon
                fontSize="large"
                style={{ margin: 10, color: "white" }}
              />
              <h3
                style={{
                  width: "auto",
                  padding: "5px",
                  margin: "10px",
                  fontSize: "20",
                }}
              >
                Total Clients: {clientsMockData.length}
              </h3>
              <h3
                style={{
                  width: "auto",
                  padding: "5px",
                  margin: "10px",
                  fontSize: "20",
                }}
              >
                Todays Appointments: {todayAppointments()}
              </h3>
            </div>
            {/* top five selling products*/}
            <div
              className="top-selling-products"
              style={{
                position: "relative",
                width: "300px",
                height: "150px",

                color: "white",
                background: "#4169e1",
                display: "flex",
                flexDirection: "row",

                marginLeft: "250px",
                padding: 7,
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <div>
                <h3 style={{ margin: 40 }}>Top Selling products</h3>
              </div>
              <div style={{ marginRight: 40, fontSize: 16 }}>
                <ul>
                  {topSellingProducts().map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* vertical graph for orders by month*/}

          <div
            style={{
              display: "flex",
              borderColor: "#4169e1",
              width: "420px",
              height: "220px",
              marginLeft: "100px",
              // border: "1px solid #4169e1",
              color: "#4169e1",
              padding: 2,
              marginBottom: "0vh",
            }}
          >
            <OrdersByMonthGraph orders={orders} />
          </div>
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "row",
              marginLeft: "550px",
              marginTop: "-320px",
            }}
          >
            {/* pie chart for products by category for todays order*/}
            <div className="pie-chart">
              <ItemsByCategory products={products} orders={orders} />
            </div>
            {/* doughnut graph for products based on category*/}
            <div className="doughnut-graph">
              <h4 style={{ textAlign: "center" }}>
                Products Based on Category
              </h4>

              <ProductsGraph products={products} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
