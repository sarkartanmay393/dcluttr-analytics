"use client";

import React, { useState } from "react";
import SalesChart from "./SalesChart";
import { CalendarDays, ChartLine, ChevronDown } from "lucide-react";
import PieChartComponent from "./PieChartComponent";
import BrandTogglers from "./BrandTogglers";
import SKUDataTable from "./Table";

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

  const handleSKUCheckboxChange = (skuName: string | number) => {
    setSelectedSKUs((prev) => ({
      ...prev,
      [skuName as keyof typeof prev]: !prev[skuName as keyof typeof prev],
    }));
  };

  const handleCityCheckboxChange = (cityName: string | number) => {
    setSelectedCities((prev) => ({
      ...prev,
      [cityName as keyof typeof prev]: !prev[cityName as keyof typeof prev],
    }));
  };

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  const [brands, setBrands] = useState<BrandTab[]>([
    { name: "Blinkit", logo: "/images/blinkit-logo.png", active: true },
    { name: "Zepto", logo: "/images/zepto-logo.png", active: false },
    { name: "Instamart", logo: "/images/instamart-logo.png", active: false },
  ]);

  // State for chart toggle
  const [isChartEnabled, setIsChartEnabled] = useState(true);

  // State for date range dropdown
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(2024, 7, 1), // August 1, 2024
    end: new Date(2024, 7, 3), // August 3, 2024
  });

  // Handle brand selection
  const handleBrandClick = (selectedName: string) => {
    setBrands(
      brands.map((brand) => ({
        ...brand,
        active: brand.name === selectedName,
      }))
    );
  };

  // Handle chart toggle
  const handleChartToggle = () => {
    setIsChartEnabled(!isChartEnabled);
  };

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  // Quick date range options
  const quickRanges = [
    { label: "Last 7 days", days: 7 },
    { label: "Last 30 days", days: 30 },
    { label: "Last 90 days", days: 90 },
  ];

  // Handle quick range selection
  const handleQuickRange = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    setDateRange({ start, end });
    setIsDatePickerOpen(false);
  };

  return (
    <div className="sm:m-4 flex flex-col border-[1px] border-[#D9D9D9] sm:rounded-[10px] bg-[#F8F8F8]">
      <div className="h-[64px] py-2 flex items-center flex-row border-b-[1px] border-[#D9D9D9] justify-between px-3 bg-white rounded-t-xl">
        <h2 className="text-lg font-medium text-[#031B15] text-[14px] pl-4">
          Quick Commerce
        </h2>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-[10px] border-[1px] border-[#D9D9D9] cursor-pointer">
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
          <div
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className="relative flex items-center gap-2 px-3 py-2 rounded-[10px] border-[1px] border-[#D9D9D9] w-full cursor-pointer"
          >
            <CalendarDays size={20} strokeWidth={1.5} />
            <p className="text-[#031B15] text-[14px]">
              {`${formatDate(dateRange.start)} - ${formatDate(dateRange.end)}`}
            </p>
            <ChevronDown size={20} strokeWidth={1.5} />
            {isDatePickerOpen && (
              <div className="cursor-default absolute right-0 top-14 md:top-8 mt-2 w-64 bg-white rounded-xl border border-gray-200 shadow-lg z-50">
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Quick Select
                  </h3>
                  <div className="space-y-2">
                    {quickRanges.map((range) => (
                      <button
                        key={range.days}
                        onClick={() => handleQuickRange(range.days)}
                        className="cursor-pointer w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center flex-row border-b-[1px] h-[64px] border-[#D9D9D9] justify-between px-3 py-2 bg-white">
        <BrandTogglers />
      </div>
      {isToggled && (
        <div className="bg-[#F8F8F8] font-[mul lish] grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 border-b-1 border-[#D9D9D9] gap-4 p-4">
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
