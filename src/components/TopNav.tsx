import React, { useState } from 'react';
import Image from 'next/image';

type BrandTab = {
  name: string;
  logo: string;
  active: boolean;
};

type DateRange = {
  start: Date;
  end: Date;
};

const TopNav: React.FC = () => {
  // State for brands
  const [brands, setBrands] = useState<BrandTab[]>([
    { name: 'Blinkit', logo: '/images/blinkit-logo.png', active: true },
    { name: 'Zepto', logo: '/images/zepto-logo.png', active: false },
    { name: 'Instamart', logo: '/images/instamart-logo.png', active: false },
  ]);

  // State for chart toggle
  const [isChartEnabled, setIsChartEnabled] = useState(true);

  // State for date range dropdown
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(2024, 7, 1), // August 1, 2024
    end: new Date(2024, 7, 3),   // August 3, 2024
  });

  // Handle brand selection
  const handleBrandClick = (selectedName: string) => {
    setBrands(brands.map(brand => ({
      ...brand,
      active: brand.name === selectedName
    })));
  };

  // Handle chart toggle
  const handleChartToggle = () => {
    setIsChartEnabled(!isChartEnabled);
  };

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  };

  // Quick date range options
  const quickRanges = [
    { label: 'Last 7 days', days: 7 },
    { label: 'Last 30 days', days: 30 },
    { label: 'Last 90 days', days: 90 },
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
    <div className="flex flex-col w-full">
      {/* Top Nav 1 - Main Navigation */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#EBEBEB]">
        {/* Left - Title */}
        <div className="flex items-center gap-1">
          <span className="font-mulish text-sm font-medium text-[#031B15] tracking-tight">
            Quick Commerce
          </span>
        </div>

        {/* Right - Controls */}
        <div className="flex items-center gap-2">
          {/* Chart Toggle Button */}
          <button 
            onClick={handleChartToggle}
            className="flex items-center justify-center h-10 px-4 gap-2 border border-[#D9D9D9] rounded-[10px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] hover:bg-gray-50 transition-colors"
          >
            <Image 
              src="/icons/chart-line.svg" 
              alt="Chart" 
              width={20} 
              height={20} 
              className={`${isChartEnabled ? 'text-[#027056]' : 'text-[#031B15] opacity-50'}`}
            />
            <Image 
              src="/images/toggle-on.svg" 
              alt="Toggle" 
              width={20} 
              height={20} 
              className={`${isChartEnabled ? 'text-[#027056]' : 'text-[#031B15] opacity-50'} transform transition-transform ${!isChartEnabled ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Date Range Button */}
          <div className="relative">
            <button 
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className="flex items-center justify-center h-10 px-4 gap-2 border border-[#D9D9D9] rounded-[10px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)] hover:bg-gray-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6667 3.33333H3.33333C2.41286 3.33333 1.66667 4.07952 1.66667 5V16.6667C1.66667 17.5871 2.41286 18.3333 3.33333 18.3333H16.6667C17.5871 18.3333 18.3333 17.5871 18.3333 16.6667V5C18.3333 4.07952 17.5871 3.33333 16.6667 3.33333Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1.66667 8.33333H18.3333" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 1.66667V5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 1.66667V5" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 11.6667H5.00833" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 11.6667H10.0083" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 11.6667H15.0083" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 15H5.00833" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 15H10.0083" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 15H15.0083" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-[Mulish] text-sm font-medium text-[#031B15] tracking-tight uppercase">
                {`${formatDate(dateRange.start)} - ${formatDate(dateRange.end)}`}
              </span>
              <Image 
                src="/images/chevron-right.svg" 
                alt="Chevron" 
                width={16} 
                height={16} 
                className={`text-[#031B15] transform transition-transform ${isDatePickerOpen ? 'rotate-90' : ''}`}
              />
            </button>

            {/* Date Range Dropdown */}
            {isDatePickerOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-gray-200 shadow-lg z-50">
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Select</h3>
                  <div className="space-y-2">
                    {quickRanges.map((range) => (
                      <button
                        key={range.days}
                        onClick={() => handleQuickRange(range.days)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
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

      {/* Top Nav 2 - Brand Navigation */}
      <div className="flex items-center px-4 py-3 border-b border-[#EBEBEB]">
        <div className="flex items-center p-1 gap-4 border border-[rgba(3,27,21,0.1)] rounded-xl">
          {brands.map((brand) => (
            <button 
              key={brand.name}
              onClick={() => handleBrandClick(brand.name)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] transition-all duration-200 ${
                brand.active 
                  ? 'bg-[#DFEAE8]' 
                  : 'opacity-30 hover:opacity-60'
              }`}
            >
              <div className="w-5 h-5 relative">
                <Image 
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <span className={`font-[Mulish] text-sm font-medium tracking-[-0.36%] ${
                brand.active 
                  ? 'text-[#027056]' 
                  : 'text-[rgba(3,27,21,0.7)]'
              }`}>
                {brand.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopNav; 