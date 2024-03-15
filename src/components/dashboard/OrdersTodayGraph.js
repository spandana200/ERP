import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";

const OrdersGraph = ({ orders }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy previous chart instance
    }
    if (orders.length > 0) {
      const ctx = document.getElementById("Chart").getContext("2d");
      const data = prepareData(orders);

      const config = {
        type: "bar",
        data: {
          labels: ["No.of Orders", "Pending", "Shipped", "Delivered"],
          datasets: [
            {
              label: "Overview of Today Orders",
              data: data,
              backgroundColor: [
                "rgba(65, 105, 225,0.6)",
                "rgba(249, 105, 14,0.6)",
                "rgba(255, 255, 0, 0.6)",
                "rgba(76, 187, 23,0.6)",
              ],
              borderColor: [
                "rgba(65, 105, 225,1)",
                "rgba(249, 105, 14,1)",
                "rgba(255, 255, 0, 1)",
                "rgba(76, 187, 23,1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          indexAxis: "y",
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        },
      };
      chartRef.current = new Chart(ctx, config);
    }
    // Clean up on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [orders]);

  const prepareData = (orders) => {
    // Filter orders for today
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10); // Get today's date in "yyyy-mm-dd" format
    const todayOrders = orders.filter(
      (order) => order.orderDate === todayString
    );

    // Count orders by status
    const total = todayOrders.length;
    const pending = todayOrders.filter(
      (order) => order.status === "Pending"
    ).length;
    const shipped = todayOrders.filter(
      (order) => order.status === "Shipped"
    ).length;
    const delivered = todayOrders.filter(
      (order) => order.status === "Delivered"
    ).length;

    const values = [total, pending, shipped, delivered];
    return values;
  };

  return <canvas id="Chart"></canvas>;
};

export default OrdersGraph;
