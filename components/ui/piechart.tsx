"use client";
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  PieController,
  ArcElement,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "chart.js";

Chart.register(PieController, ArcElement, CategoryScale, Tooltip, Legend);

interface PieChartProps {
  datapoints: { [key: string]: number };
  className?: string; // Add this line
}

const PieChartColors = ["#FD7270", "#FEE15E", "#D4E78B", "#5D2BFF", "#FFFFFF"];

const PieChartComponent = ({ datapoints, className }: PieChartProps) => {
  const labels = Object.keys(datapoints);
  const dataPointsArray = Object.values(datapoints);
  const [legendPosition, setLegendPosition] = useState<'right' | 'bottom'>('right');
  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth <= 768) { // assuming 768px is your breakpoint for mobile
            setLegendPosition('bottom');
        } else {
            setLegendPosition('right');
        }
    }

    // Call the function once to set the initial state
    handleResize();

    // Add the event listener
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
        window.removeEventListener('resize', handleResize);
    }
}, []);



  const chartData = {
    labels: labels,
    datasets: [
      {
        data: dataPointsArray,
        backgroundColor: PieChartColors.slice(0, dataPointsArray.length),
        hoverBackgroundColor: PieChartColors.slice(0, dataPointsArray.length),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 1.5, // Adjust this value based on your needs
    layout: {
        padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        }
    },
    plugins: {
      legend: {
        position: legendPosition as any,

        labels: {
          font: {
            family: "Poppins", // Add this line
          },

          usePointStyle: true,
          generateLabels: function (chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: any, i: any) => {
                const meta = chart.getDatasetMeta(0);
                const ds = data.datasets[0];
                const arc = meta.data[i];
                const custom = (arc && arc.custom) || {};
                const arcOpts = chart.options.elements.arc;
                const fill = custom.backgroundColor
                  ? custom.backgroundColor
                  : ds.backgroundColor && ds.backgroundColor[i]
                  ? ds.backgroundColor[i]
                  : arcOpts.backgroundColor;
                const stroke = custom.borderColor
                  ? custom.borderColor
                  : ds.borderColor && ds.borderColor[i]
                  ? ds.borderColor[i]
                  : arcOpts.borderColor;
                const bw = custom.borderWidth
                  ? custom.borderWidth
                  : ds.borderWidth && ds.borderWidth[i]
                  ? ds.borderWidth[i]
                  : arcOpts.borderWidth;

                return {
                  text: `${label}: ${ds.data[i]}`, // Adjusted here
                  fillStyle: fill,
                  strokeStyle: stroke,
                  lineWidth: bw,
                  hidden: isNaN(ds.data[i]) || meta.data[i].hidden,
                  index: i,
                };
              });
            }
            return [];
          },
        },
      },      
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            let value = context.parsed;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className={className}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChartComponent;
