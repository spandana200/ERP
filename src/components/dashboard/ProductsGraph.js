import React from "react";
import { Doughnut } from "react-chartjs-2";

const ProductsGraph = ({ products }) => {
  const getCategoryCounts = (products) => {
    const categoryCounts = {};
    products.forEach((product) => {
      if (categoryCounts[product.category]) {
        categoryCounts[product.category]++;
      } else {
        categoryCounts[product.category] = 1;
      }
    });
    return {
      labels: Object.keys(categoryCounts),
      data: Object.values(categoryCounts),
    };
  };

  const generateColors = (count) => {
    const colors = [];
    const colorPalette = [
      "rgba(255, 99, 132, 0.6)",
      "rgba(54, 162, 235, 0.6)",
      "rgba(255, 206, 86, 0.6)",
      "rgba(75, 192, 192, 0.6)",
      "rgba(153, 102, 255, 0.6)",
    ];

    for (let i = 0; i < count; i++) {
      colors.push(colorPalette[i % colorPalette.length]);
    }

    return colors;
  };

  const data = {
    labels: getCategoryCounts(products).labels,
    datasets: [
      {
        label: "Products by Category",
        data: getCategoryCounts(products).data,
        backgroundColor: generateColors(
          getCategoryCounts(products).labels.length
        ),
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "right", // Position legend on the right side
        labels: {
          boxWidth: 10, // Adjust the size of the colored boxes
          usePointStyle: true, // Use point style for legend markers
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = "No.of Products" || "";
            const value = context.formattedValue || "";
            const dataset = context.dataset || {};
            const total = dataset.data.reduce((acc, curr) => acc + curr, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`; // Include percentage in the label string
          },
        },
        bodyColor: "white", // Set label color to white
      },
    },
  };
  return <Doughnut data={data} options={options} />;
};
export default ProductsGraph;
