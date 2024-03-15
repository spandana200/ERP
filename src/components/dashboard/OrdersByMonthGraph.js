import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";

var Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const OrdersByMonthGraph = ({ orders }) => {
  // const orders = ordersMockData;

  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy previous chart instance
    }
    if (orders.length > 0) {
      const ctx = document.getElementById("myChart").getContext("2d");
      const data = prepareData(orders);
      // Destroy the previous chart instance if it exists

      const config = {
        type: "bar",
        data: {
          axis: "y",
          labels: data.labels,
          datasets: [
            {
              label: "Number of orders",
              data: data.values,
              backgroundColor: "#4169e1",
              borderColor: "#4169e1",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };
      chartRef.current = new Chart(ctx, config);
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Destroy the chart instance when the component unmounts
      }
    };
  }, [orders]);

  const prepareData = (orders) => {
    const monthlyOrders = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
      Aug: 0,
      Sep: 0,
      Oct: 0,
      Nov: 0,
      Dec: 0,
    };

    orders.forEach((order) => {
      const month = parseInt(order.orderDate.slice(5, 7)) - 1; // Extract year-month

      if (monthlyOrders[Months[month]]) {
        monthlyOrders[Months[month]]++;
      } else {
        monthlyOrders[Months[month]] = 1;
      }
    });

    const labels = Object.keys(monthlyOrders);
    const values = Object.values(monthlyOrders);
    return { labels, values };
  };
  return <canvas id="myChart"></canvas>;
};
export default OrdersByMonthGraph;
