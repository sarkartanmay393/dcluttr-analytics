"use client";

import React, { useState } from "react";
import SalesChart from "./SalesChart";
import { CalendarDays, ChartLine, ChevronDown } from "lucide-react";
import PieChartComponent from "./PieChartComponent.jsx";
import {
  cityLevelData,
  cityTotal,
  skuLevelData,
  skuTotal,
} from "../utils/sampleData.jsx";
import BrandTogglers from "./BrandTogglers.jsx";
import SKUDataTable from "./Table.jsx";

const Dashboard = () => {
  const [isToggled, setIsToggled] = useState(true);
  const [selectedSKUs, setSelectedSKUs] = useState({
    "Protein Bar 100g": true,
    "Choco Bar 100g": true,
    SKU3: false,
    SKU4: false,
  });

  const [selectedCities, setSelectedCities] = useState({
    Delhi: true,
    Bengaluru: true,
    SKU3: false,
    SKU4: false,
  });

  const handleSKUCheckboxChange = (skuName) => {
    setSelectedSKUs((prev) => ({
      ...prev,
      [skuName]: !prev[skuName],
    }));
  };

  const handleCityCheckboxChange = (cityName) => {
    setSelectedCities((prev) => ({
      ...prev,
      [cityName]: !prev[cityName],
    }));
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="sm:m-4 flex flex-col border-[1px] border-[#D9D9D9] rounded-[10px] bg-gray-100">
      <div className="h-[64px] flex items-center flex-row border-b-[1px] border-[#D9D9D9] justify-between px-3 py-2 bg-white rounded-t-xl">
        <h2 className="text-lg font-medium text-[#031B15] text-[14px] pl-4">
          Quick Commerce
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-[10px] border-[1px] border-[#D9D9D9] cursor-pointer">
            <label className="relative inline-flex items-center justify-between gap-4 cursor-pointer">
              <ChartLine size={17} strokeWidth={2} className="text-black" />
              <input
                type="checkbox"
                checked={isToggled}
                onChange={handleToggle}
                className="sr-only peer"
              />
              <div
                className={`w-[25px] h-[15px] bg-gray-200 rounded-full peer peer-checked:bg-[#027056] transition-colors duration-300 flex items-center`}
              >
                <div
                  className={`w-[14px] h-[15px] bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    isToggled ? "translate-x-[12px]" : "translate-x-[2px]"
                  } `}
                ></div>
              </div>
            </label>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-[10px] border-[1px] border-[#D9D9D9] w-full cursor-pointer">
            <CalendarDays size={20} strokeWidth={1.5} />
            <p className="text-[#031B15] text-[14px]">
              Aug 01, 024 - Aug 03, 2024
            </p>
            <ChevronDown size={20} strokeWidth={1.5} />
          </div>
        </div>
      </div>
      <div className="flex items-center flex-row border-b-[1px] h-[64px] border-[#D9D9D9] justify-between px-3 py-2 bg-white">
        <BrandTogglers />
      </div>
      {isToggled && (
        <div className="bg-gray-100 font-[mul lish] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 border-b-1 border-[#D9D9D9] gap-4 p-4">
          <SalesChart title="Sales (MRP)" />
          <SalesChart title="Total Quantity Sold" />
          <PieChartComponent />
        </div>
      )}
      <SKUDataTable
        title="SKU Level Data"
        selectedItems={selectedSKUs}
        onCheckboxChange={handleSKUCheckboxChange}
      />
      <SKUDataTable
        title="City Level Data"
        selectedItems={selectedCities}
        onCheckboxChange={handleCityCheckboxChange}
      />
    </div>
  );
};

export default Dashboard;
