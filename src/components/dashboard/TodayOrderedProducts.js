// // import Chart from "chart.js/auto";
// // import React, { useEffect, useRef, useState } from "react";

// // const ItemsByCategory = ({ orders, products }) => {
// //   const [categoryData, setCategoryData] = useState({});
// //   const [selectedCategory, setSelectedCategory] = useState("All");
// //   const chartRefs = useRef({});

// //   const generateCategoryColors = (categories) => {
// //     const colorPalette = [
// //       "rgba(255, 99, 132, 0.7)",
// //       "rgba(54, 162, 235, 0.7)",
// //       "rgba(255, 206, 86, 0.7)",
// //       "rgba(75, 192, 192, 0.7)",
// //       "rgba(153, 102, 255, 0.7)",
// //       "rgba(255, 159, 64, 0.7)",
// //     ];
// //     const categoryColors = {};
// //     categories.forEach((category, index) => {
// //       categoryColors[category] = colorPalette[index % colorPalette.length];
// //     });
// //     return categoryColors;
// //   };

// //   useEffect(() => {
// //     const today = new Date();
// //     const todayString = today.toISOString().slice(0, 10);
// //     const todayOrders = orders.filter(
// //       (order) => order.orderDate === todayString
// //     );

// //     const categoryProducts = {};

// //     todayOrders.forEach((order) => {
// //       order.items.forEach((item) => {
// //         const product = products.find(
// //           (p) =>
// //             p.name === item.name &&
// //             (selectedCategory === "All" || p.category === selectedCategory)
// //         );
// //         if (product) {
// //           if (!categoryProducts[product.category]) {
// //             categoryProducts[product.category] = {};
// //           }
// //           if (!categoryProducts[product.category][product.name]) {
// //             categoryProducts[product.category][product.name] = 0;
// //           }
// //           categoryProducts[product.category][product.name] += item.quantity;
// //         }
// //       });
// //     });

// //     setCategoryData(categoryProducts);
// //   }, [orders, products, selectedCategory]);

// //   useEffect(() => {
// //     Object.keys(categoryData).forEach((category) => {
// //       const chartId = `pie-chart-${category}`;
// //       const chartCanvas = chartRefs.current[chartId];
// //       if (chartCanvas && Object.keys(categoryData[category]).length > 0) {
// //         if (chartCanvas.chart) {
// //           chartCanvas.chart.destroy();
// //         }
// //         const chart = new Chart(chartCanvas, {
// //           type: "pie",
// //           data: {
// //             labels: Object.keys(categoryData[category]),
// //             datasets: [
// //               {
// //                 data: Object.values(categoryData[category]),
// //                 backgroundColor: Object.values(
// //                   generateCategoryColors(Object.keys(categoryData[category]))
// //                 ),
// //                 borderWidth: 1,
// //               },
// //             ],
// //           },
// //           options: {
// //             responsive: true,
// //             plugins: {
// //               legend: {
// //                 position: "right",
// //               },
// //             },
// //           },
// //         });
// //         chartRefs.current[chartId] = { canvas: chartCanvas, chart };
// //       }
// //     });

// //     Object.keys(chartRefs.current).forEach((chartId) => {
// //       if (!categoryData[chartId.replace("pie-chart-", "")]) {
// //         if (chartRefs.current[chartId].chart) {
// //           chartRefs.current[chartId].chart.destroy();
// //         }
// //         delete chartRefs.current[chartId];
// //       }

// //     });
// //   }, [categoryData, selectedCategory]);

// //   const handleCategoryChange = (e) => {
// //     setSelectedCategory(e.target.value);
// //   };

// //   return (
// //     <div style={{ color: "#4169e1" }}>
// //       <h4>Today's Orders by Category</h4>
// //       <div style={{ color: "#4169e1" }}>
// //         <label style={{ padding: 5, fontSize: "16px" }}>
// //           Select Category:{" "}
// //         </label>
// //         <select
// //           style={{ padding: 5, fontSize: "16px" }}
// //           value={selectedCategory}
// //           onChange={handleCategoryChange}
// //         >
// //           <option value="All">All</option>
// //           {Object.keys(categoryData).map((category) => (
// //             <option key={category} value={category}>
// //               {category}
// //             </option>
// //           ))}
// //         </select>
// //       </div>
// //       <div style={{ marginTop: "20px" }}>
// //         {Object.keys(categoryData).map((category) => (
// //           <canvas
// //             key={`pie-chart-${category}`}
// //             id={`pie-chart-${category}`}
// //             ref={(ref) => {
// //               chartRefs.current[`pie-chart-${category}`] = ref;
// //             }}
// //           />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ItemsByCategory;
// import Chart from "chart.js/auto";
// import React, { useEffect, useRef, useState } from "react";

// const ItemsByCategory = ({ orders, products }) => {
//   const [categoryData, setCategoryData] = useState({});
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const chartRefs = useRef({});

//   const generateCategoryColors = (categories) => {
//     const colorPalette = [
//       "rgba(255, 99, 132, 0.7)",
//       "rgba(54, 162, 235, 0.7)",
//       "rgba(255, 206, 86, 0.7)",
//       "rgba(75, 192, 192, 0.7)",
//       "rgba(153, 102, 255, 0.7)",
//       "rgba(255, 159, 64, 0.7)",
//     ];
//     const categoryColors = {};
//     categories.forEach((category, index) => {
//       categoryColors[category] = colorPalette[index % colorPalette.length];
//     });
//     return categoryColors;
//   };

//   useEffect(() => {
//     const today = new Date();
//     const todayString = today.toISOString().slice(0, 10);
//     const todayOrders = orders.filter(
//       (order) => order.orderDate === todayString
//     );

//     const categoryProducts = {};

//     todayOrders.forEach((order) => {
//       order.items.forEach((item) => {
//         const product = products.find(
//           (p) =>
//             p.name === item.name &&
//             (selectedCategory === "All" || p.category === selectedCategory)
//         );
//         if (product) {
//           if (!categoryProducts[product.category]) {
//             categoryProducts[product.category] = {};
//           }
//           if (!categoryProducts[product.category][product.name]) {
//             categoryProducts[product.category][product.name] = 0;
//           }
//           categoryProducts[product.category][product.name] += item.quantity;
//         }
//       });
//     });

//     setCategoryData(categoryProducts);
//   }, [orders, products, selectedCategory]);

//   useEffect(() => {
//     // Destroy existing charts
//     Object.values(chartRefs.current).forEach((chart) => {
//       if (chart) {
//         chart = null; // Clear the chart
//       }
//     });

//     // Create new charts
//     Object.keys(categoryData).forEach((category) => {
//       const chartId = `pie-chart-${category}`;
//       const chartCanvas = chartRefs.current[chartId];
//       if (chartCanvas && Object.keys(categoryData[category]).length > 0) {
//         const ctx = chartCanvas.getContext("2d");
//         const newChart = new Chart(ctx, {
//           type: "pie",
//           data: {
//             labels: Object.keys(categoryData[category]),
//             datasets: [
//               {
//                 data: Object.values(categoryData[category]),
//                 backgroundColor: Object.values(
//                   generateCategoryColors(Object.keys(categoryData[category]))
//                 ),
//                 borderWidth: 1,
//               },
//             ],
//           },
//           options: {
//             responsive: true,
//             plugins: {
//               legend: {
//                 position: "right",
//               },
//             },
//           },
//         });
//         chartRefs.current[chartId] = newChart;
//       }
//     });
//   }, [categoryData]);

//   const handleCategoryChange = (e) => {
//     setSelectedCategory(e.target.value);
//   };

//   return (
//     <div style={{ color: "#4169e1" }}>
//       <h4>Today's Orders by Category</h4>
//       <div style={{ color: "#4169e1" }}>
//         <label style={{ padding: 5, fontSize: "16px" }}>
//           Select Category:{" "}
//         </label>
//         <select
//           style={{ padding: 5, fontSize: "16px" }}
//           value={selectedCategory}
//           onChange={handleCategoryChange}
//         >
//           <option value="All">All</option>
//           {Object.keys(categoryData).map((category) => (
//             <option key={category} value={category}>
//               {category}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div style={{ marginTop: "20px" }}>
//         {Object.keys(categoryData).map((category) => (
//           <canvas
//             key={`pie-chart-${category}`}
//             id={`pie-chart-${category}`}
//             ref={(ref) => {
//               chartRefs.current[`pie-chart-${category}`] = ref;
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ItemsByCategory;
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
