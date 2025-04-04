import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { CircleHelp } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SalesChart = ({ title = "Sales (MRP)" }) => {
  const data = {
    labels: ["09", "10", "11", "12", "13", "14", "15"],
    datasets: [
      {
        label: "This Month",
        data: [0, 2.0, 1.8, 3.0, 2.5, 4.0, 5.0],
        borderColor: "#1D874F",
        backgroundColor: "rgba(46, 183, 111, 0.1)",
        fill: true,
        tension: 0,
        pointRadius: 0,
        borderWidth: 1,
      },
      {
        label: "Last Month",
        data: [2, 0, 3, 2, 4, 3, 5],
        borderColor: "rgba(219, 53, 0, 0.8)",
        borderDash: [2, 2],
        backgroundColor: "transparent",
        fill: false,
        tension: 0,
        pointRadius: 0,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        align: "start",
        labels: {
          usePointStyle: true,
          pointStyle: 'dot',
          padding: 12,
          font: {
            family: "Mulish",
            size: 13,
            weight: 400,
          },
          color: "#7D7D7E",
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "Mulish",
            size: 12,
            weight: 500,
          },
          color: "#6B7583",
          padding: 8,
        },
      },
      y: {
        min: 0,
        max: 6,
        ticks: {
          stepSize: 1.5,
          font: {
            family: "Mulish",
            size: 12,
            weight: 500,
          },
          color: "#8C9198",
          padding: 8,
        },
        grid: {
          color: "#EDEDED",
          drawBorder: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl border-[1px] border-gray-200 w-full">
      <div className="flex items-center justify-between p-3 border-b border-[#F1F1F1] h-[44px]">
        <h2 className="text-[14px] font-mulish text-[#515153] tracking-[-1.86%]">
          {title}
        </h2>
        <div className="relative group cursor-pointer">
          <CircleHelp size={16} className="text-[#031B15]" />
          <span className="text-nowrap absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
            Sales Chart
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between px-3 py-3">
        <div className="text-[24px] font-bold font-mulish text-[#031B15] tracking-[-1.08%]">
          125.49
        </div>
        <div className="flex flex-col items-end w-[141px]">
          <div className="flex items-center gap-[3px]">
            <span className="text-[#1D874F] text-[15px] font-bold font-mulish tracking-[-1.73%]">
              ↑ 2.4%
            </span>
          </div>
          <span className="text-[13px] font-normal font-mulish text-[rgba(3,27,21,0.6)] tracking-[-2%]">
            vs 119.69 last month
          </span>
        </div>
      </div>
      <div className="h-[160px] px-3">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesChart;
