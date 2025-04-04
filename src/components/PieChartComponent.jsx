import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { CircleHelp } from "lucide-react";
ChartJS.register(ArcElement, Tooltip);

const data = {
  labels: ["New Delhi", "Mumbai", "West Bengal", "Others"],
  datasets: [
    {
      data: [26.5, 36.4, 12.2, 24.3],
      backgroundColor: ["#4B40EE", "#FF6B6B", "#FFD700", "#D3D3D3"],
      borderWidth: 0,
      borderColor: "#fff",
    },
  ],
};

const PieChartComponent = () => {
  const totalValue = data.datasets[0].data.reduce(
    (sum, value) => sum + value,
    0
  );
  const percentages = [35, 23, 21, 9];
  const changes = [1.12, -3.3, -2.3, 1.009];

  const options = {
    cutout: "70%",
    circumference: 180,
    rotation: -90,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      centerText: {
        beforeDraw(chart) {
          const { ctx, chartArea } = chart;
          ctx.save();
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const centerX = (chartArea.left + chartArea.right) / 2;
          const centerY = (chartArea.top + chartArea.bottom) / 2 + 20;
          ctx.font = "13px Mulish";
          ctx.fillStyle = "#7D7D7E";
          ctx.fillText("Total", centerX, centerY - 20);
          ctx.font = "bold 18px Mulish";
          ctx.fillStyle = "#000";
          ctx.fillText(`₹${totalValue.toFixed(1)}L`, centerX, centerY);
          ctx.font = "13px Mulish";
          ctx.fillStyle = "#1D874F";
          ctx.fillText("↑ 2.2%", centerX, centerY + 20);
          ctx.restore();
        },
      },
    },
  };

  const plugins = [
    {
      id: "centerText",
      beforeDraw: options.plugins.centerText.beforeDraw,
    },
  ];

  return (
    <div className="bg-white rounded-lg border-[1px] border-gray-200 w-full">
      <div className="flex items-center justify-between p-3 border-b border-[#F1F1F1] h-[44px]">
        <h2 className="text-[14px] font-mulish text-[#515153] tracking-[-1.86%]">
          Top Cities
        </h2>
        <div className="relative group cursor-pointer">
          <CircleHelp size={16} className="text-[#031B15]" />
          <span className="text-nowrap absolute bottom-full mb-1 hidden group-hover:block bg-black text-white text-xs rounded py-1 px-2">
            Top cities Chart
          </span>
        </div>
      </div>
      <div className="relative w-full flex justify-center items-center py-2">
        <div className="w-[190px] h-[100px]">
          <Doughnut data={data} options={options} plugins={plugins} />
        </div>
      </div>
      <div className="flex flex-col px-4 gap-2 py-1">
        {data.labels.map((label, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center w-[45%]">
              <span
                className="w-1 h-1 rounded-full mr-2"
                style={{
                  backgroundColor: data.datasets[0].backgroundColor[index],
                }}
              ></span>
              <span className="text-[12px] text-[#7D7D7E]">{label}</span>
            </div>
            <div className="flex items-center flex-1 gap-4">
              <span className="text-[12px] text-[#000000] font-bold w-[20%]">
                ₹{data.datasets[0].data[index]}L
              </span>
              <span className="text-[12px] bg-[#F7F7F7] text-[#7D7D7E] px-0.5 rounded-[2px] flex-1">{percentages[index]}%</span>
              <span
                className={`text-[12px] w-[55%] ${
                  changes[index] >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {changes[index] >= 0 ? "↑" : "↓"} {Math.abs(changes[index])}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartComponent;
