import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { ChartService } from "../../services/chartService";

export default function LineDemo() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary",
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    ChartService("prompts", "days", [
      "cost",
      "inputTokens",
      "outputTokens",
    ]).then((chartService) => {
      // console.log(chartService);
      const data = {
        labels: chartService.labels,
        datasets: [
          {
            label: "Cost",
            data: chartService.datasets[0].points,
            fill: false,
            yAxisID: "y",
            borderColor: documentStyle.getPropertyValue("--red-500"),
            tension: 0.4,
          },
          {
            label: "Input",
            data: chartService.datasets[1].points,
            fill: false,
            yAxisID: "y1",
            borderColor: documentStyle.getPropertyValue("--blue-500"),
            tension: 0.4,
          },
          {
            label: "Output",
            data: chartService.datasets[2].points,
            fill: false,
            yAxisID: "y2",
            borderColor: documentStyle.getPropertyValue("--green-500"),
            tension: 0.4,
          },
        ],
      };
      const options = {
        animations: {
          tension: {
            duration: 1000,
            easing: "linear",
            from: 0.5,
            to: 0,
            loop: true,
          },
        },
        maintainAspectRatio: false,
        aspectRatio: 0.5,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
          subtitle: {
            display: true,
            text: "Cost of Ai Chat",
          },
          // title: {
          //   display: true,
          //   text: "Custom Chart Title",
          // },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";

                if (label) {
                  label += ": ";
                }
                if (context.parsed.y !== null) {
                  if (context.dataset.label === "Cost") {
                    label += new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(context.parsed.y);
                  } else {
                    label += new Intl.NumberFormat("en-US", {
                      style: "decimal",
                    }).format(context.parsed.y);
                  }
                }
                return label;
              },
            },
          },
        },
        scales: {
          x: {
            title: "date",
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
              callback: function (value, index, ticks) {
                return "RM" + value;
              },
            },
            grid: {
              color: surfaceBorder,
            },
            title: "cost",
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              drawOnChartArea: false,
              color: surfaceBorder,
            },
            text: "input",
          },
          y2: {
            label: "Output",
            type: "linear",
            display: true,
            position: "right",
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              drawOnChartArea: false,
              color: surfaceBorder,
            },
            text: ["output"],
          },
        },
      };
      setChartData(data);
      setChartOptions(options);
    });
  }, []);

  return (
    <div className="card chart-container">
      <Chart
        type="line"
        className="max-h-15rem"
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
}
