import React from 'react';
import Image from 'next/image';
import { Chart, registerables, ChartArea } from 'chart.js';
import { Line } from 'react-chartjs-2';
import TopNav from './TopNav';

// Register Chart.js components
Chart.register(...registerables);

// Utility function for chart gradient
const createGradient = (ctx: CanvasRenderingContext2D, area: ChartArea, color: string) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, area.bottom);
  gradient.addColorStop(0, `${color}33`); // 20% opacity
  gradient.addColorStop(1, `${color}05`); // 2% opacity
  return gradient;
};

const MainContent: React.FC = () => {
  // Sales chart data
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Sales',
        data: [30000, 40000, 35000, 50000, 49000, 60000, 70000, 65000, 74000],
        borderColor: '#4F46E5', // Indigo
        backgroundColor: function(context: {chart: {ctx: CanvasRenderingContext2D, chartArea: ChartArea}}) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) return;
          return createGradient(ctx, chartArea, '#4F46E5');
        },
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 3,
        fill: true,
      }
    ]
  };

  // Orders chart data
  const ordersData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Orders',
        data: [400, 600, 550, 700, 680, 800, 900, 950, 1000],
        borderColor: '#10B981', // Emerald
        backgroundColor: function(context: {chart: {ctx: CanvasRenderingContext2D, chartArea: ChartArea}}) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          if (!chartArea) return;
          return createGradient(ctx, chartArea, '#10B981');
        },
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 3,
        fill: true,
      }
    ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#1F2937',
        bodyColor: '#4B5563',
        borderColor: '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        titleFont: {
          size: 14,
          weight: 'bold' as const,
        },
        bodyFont: {
          size: 12,
        },
        callbacks: {
          label: function(context: {dataset: {label: string}, parsed: {y: number}}) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9CA3AF',
        },
      },
      y: {
        border: {
          display: false,
        },
        grid: {
          color: '#F3F4F6',
        },
        ticks: {
          color: '#9CA3AF',
          callback: function(value: number) {
            return new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              notation: 'compact',
              compactDisplay: 'short',
            }).format(value);
          }
        },
      }
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  // Responsive orders chart options to show counts instead of currency
  const ordersChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        ...chartOptions.scales.y,
        ticks: {
          color: '#9CA3AF',
          callback: function(value: number) {
            return new Intl.NumberFormat('en-US', {
              notation: 'compact',
              compactDisplay: 'short',
            }).format(value);
          }
        },
      }
    },
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        ...chartOptions.plugins.tooltip,
        callbacks: {
          label: function(context: {dataset: {label: string}, parsed: {y: number}}) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US').format(context.parsed.y);
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Top Navigation */}
      <TopNav />

      {/* Main Content Area */}
      <div className="flex-1 p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Total Sales Card */}
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 text-sm font-medium">Total Sales</h3>
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-50">
                <Image src="/icons/chart-line.svg" alt="Chart" width={16} height={16} className="text-indigo-500" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2 mb-1">
              <span className="text-2xl font-semibold text-gray-900">$48,783.91</span>
              <div className="flex items-center text-green-500 text-sm font-medium">
                <Image src="/icons/arrow-up.svg" alt="Up" width={12} height={12} />
                <span className="ml-0.5">18.2%</span>
              </div>
            </div>
            <p className="text-gray-500 text-xs">Compared to last month</p>
          </div>

          {/* Average Order Value Card */}
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 text-sm font-medium">Average Order Value</h3>
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-50">
                <Image src="/icons/chart-line.svg" alt="Chart" width={16} height={16} className="text-emerald-500" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2 mb-1">
              <span className="text-2xl font-semibold text-gray-900">$247.93</span>
              <div className="flex items-center text-red-500 text-sm font-medium">
                <Image src="/icons/arrow-down.svg" alt="Down" width={12} height={12} />
                <span className="ml-0.5">4.3%</span>
              </div>
            </div>
            <p className="text-gray-500 text-xs">Compared to last month</p>
          </div>

          {/* Total Orders Card */}
          <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50">
                <Image src="/icons/chart-line.svg" alt="Chart" width={16} height={16} className="text-blue-500" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2 mb-1">
              <span className="text-2xl font-semibold text-gray-900">1,463</span>
              <div className="flex items-center text-green-500 text-sm font-medium">
                <Image src="/icons/arrow-up.svg" alt="Up" width={12} height={12} />
                <span className="ml-0.5">12.5%</span>
              </div>
            </div>
            <p className="text-gray-500 text-xs">Compared to last month</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales Overview Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                  Weekly
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  Monthly
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  Yearly
                </button>
              </div>
            </div>
            <div className="h-64">
              <Line data={salesData} options={chartOptions} />
            </div>
          </div>
          
          {/* Orders Overview Chart */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Orders Overview</h3>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                  Weekly
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  Monthly
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                  Yearly
                </button>
              </div>
            </div>
            <div className="h-64">
              <Line data={ordersData} options={ordersChartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent; 