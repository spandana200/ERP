import Chart from "chart.js/auto";
import React, { useEffect, useRef, useState } from "react";
const ItemsByCategory = ({ orders, products }) => {
  const [productData, setProductData] = useState({});
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Filter orders for today
    const today = new Date().toISOString().split("T")[0];
    const todayOrders = orders.filter((order) => order.orderDate === today);

    // Aggregate products by categories
    const productQuantity = {};
    todayOrders.forEach((order) => {
      order.items.forEach((item) => {
        const product = products.find((prod) => prod.name === item.name);
        if (product) {
          if (!productQuantity[product.name]) {
            productQuantity[product.name] = 0;
          }
          productQuantity[product.name] += item.quantity;
        }
      });
    });
    setProductData(productQuantity);
  }, [orders, products]);

  useEffect(() => {
    // Create or update the pie chart
    if (chartRef.current && Object.keys(productData).length > 0) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: Object.keys(productData),
          datasets: [
            {
              label: "Product Quantity",
              data: Object.values(productData),
              backgroundColor: [
                "rgba(255, 99, 132, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(75, 192, 192, 0.7)",
                "rgba(153, 102, 255, 0.7)",
                "rgba(255, 159, 64, 0.7)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });
    }
  }, [productData]);

  return (
    <div style={{ width: "250px", height: "250px", color: "#4169e1" }}>
      <h4>Today's Ordered Products</h4>
      <div style={{ marginTop: "-10px" }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};
export default ItemsByCategory;
