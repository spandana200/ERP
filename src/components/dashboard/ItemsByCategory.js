import Chart from "chart.js/auto";
import React, { useEffect, useRef, useState } from "react";
const ItemsByCategory = ({ orders, products }) => {
  const [categoryData, setCategoryData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const chartRefs = useRef({});

  const generateCategoryColors = (categories) => {
    const colorPalette = [
      "rgba(255, 99, 132, 0.7)",
      "rgba(54, 162, 235, 0.7)",
      "rgba(255, 206, 86, 0.7)",
      "rgba(75, 192, 192, 0.7)",
      "rgba(153, 102, 255, 0.7)",
      "rgba(255, 159, 64, 0.7)",
    ];
    const categoryColors = {};
    categories.forEach((category, index) => {
      categoryColors[category] = colorPalette[index % colorPalette.length];
    });
    return categoryColors;
  };

  useEffect(() => {
    //todays orders
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10); // Get today's date in "yyyy-mm-dd" format
    const todayOrders = orders.filter(
      (order) => order.orderDate === todayString
    );

    // Calculate product counts for each category
    const categoryProducts = {};
    todayOrders.forEach((order) => {
      order.items.forEach((item) => {
        const product = products.find(
          (p) =>
            p.name === item.name &&
            (selectedCategory === "All" || p.category === selectedCategory)
        );
        if (product) {
          if (!categoryProducts[product.category]) {
            categoryProducts[product.category] = {};
          }
          if (!categoryProducts[product.category][product.name]) {
            categoryProducts[product.category][product.name] = 0;
          }
          categoryProducts[product.category][product.name] += item.quantity;
        }
      });
    });
    setCategoryData(categoryProducts);
  }, [orders, products, selectedCategory]);

  useEffect(() => {
    // Create pie chart for each category
    Object.keys(categoryData).forEach((category) => {
      const chartId = `pie-chart-${category}`;
      const chartCanvas = chartRefs.current[chartId];
      if (chartCanvas && Object.keys(categoryData[category]).length > 0) {
        if (chartCanvas.chart) {
          chartCanvas.chart.destroy();
        }
        const chart = new Chart(chartCanvas, {
          type: "pie",
          data: {
            labels: Object.keys(categoryData[category]),
            datasets: [
              {
                data: Object.values(categoryData[category]),
                backgroundColor: Object.values(
                  generateCategoryColors(Object.keys(categoryData[category]))
                ),
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "right",
              },
            },
          },
        });
        chartRefs.current[chartId] = chartCanvas.chart = chart;
      }
    });

    // Clean up on component unmount

    Object.keys(chartRefs.current).forEach((chartId) => {
      if (!categoryData[chartId.replace("pie-chart-", "")]) {
        chartRefs.current[chartId].chart.destroy();
        delete chartRefs.current[chartId];
      }
    });
  }, [categoryData, selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  return (
    <div
      style={{
        color: "#4169e1",
        // border: "1px solid #4169e1"
      }}
    >
      <h4>Today's Orders by Category</h4>
      <div style={{ color: "#4169e1" }}>
        <label style={{ padding: 5, fontSize: "16px" }}>
          Select Category:{" "}
        </label>
        <select
          id={{ padding: 5, fontSize: "16px" }}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="All">All</option>
          {/* Generate dropdown options based on available categories */}
          {Object.keys(categoryData).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div
        id={{
          marginTop: "20px",
        }}
      >
        {/* Render canvas elements for pie charts */}
        {Object.keys(categoryData).map((category) => (
          <canvas
            key={`pie-chart-${category}`}
            id={`pie-chart-${category}`}
            ref={(ref) => {
              chartRefs.current[`pie-chart-${category}`] = ref;
            }}
          />
        ))}
      </div>
    </div>
  );
};
export default ItemsByCategory;
