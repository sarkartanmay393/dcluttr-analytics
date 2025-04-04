/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { ChartLine, ChevronDown } from "lucide-react";
import { fetchCubeData } from "../utils/cube";

const SKUDataTable = ({ title, selectedItems, onCheckboxChange }: any) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState({
    sales: "₹0",
    outOfStock: "0%",
    totalInventory: 0,
    avgRank: 0,
    estTraffic: 0,
    estImpressions: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const query = {
        measures: [
          "blinkit_insights_sku.sales_mrp_sum",
          "blinkit_insights_sku.qty_sold",
          "blinkit_insights_sku.inv_qty",
          "blinkit_scraping_stream.on_shelf_availability",
          "blinkit_scraping_stream.rank_avg",
        ],
        dimensions: ["blinkit_insights_sku.name"],
        timeDimensions: [
          {
            dimension: "blinkit_insights_sku.created_at",
            dateRange: ["2025-02-01", "2025-02-28"],
          },
        ],
        limit: 10,
        offset: (2 - 1) * 5,
      };

      const response = await fetchCubeData(query);
      // console.log("Cube.js response:=", response, "query=", query);
      const mappedData = response?.results?.[0]?.data.map(
        (item: { [x: string]: any }) => ({
          name: item["blinkit_insights_sku.name"] || "Unknown",
          sales: `₹${Number(
            item["blinkit_insights_sku.sales_mrp_sum"] || 0
          ).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`,
          outOfStock: `${Number(
            item["blinkit_scraping_stream.on_shelf_availability"] || 0
          ).toFixed(2)}%`,
          totalInventory: item["blinkit_insights_sku.inv_qty"] || 0,
          avgRank: Number(
            item["blinkit_scraping_stream.rank_avg"] || 0
          ).toFixed(1),
          estTraffic: 0,
          estImpressions: 0,
        })
      );
      // console.log(mappedData);
      const calculatedTotal = {
        sales: `₹${response.results[0].data
          .reduce(
            (sum: number, item: { [x: string]: any }) =>
              sum + Number(item["blinkit_insights_sku.sales_mrp_sum"] || 0),
            0
          )
          .toLocaleString("en-IN", { maximumFractionDigits: 2 })}`,
        outOfStock: `${(
          response.results[0].data.reduce(
            (sum: number, item: { [x: string]: any }) =>
              sum +
              Number(
                item["blinkit_scraping_stream.on_shelf_availability"] || 0
              ),
            0
          ) / (response.results[0].data.length || 1)
        ).toFixed(2)}%`,
        totalInventory: response.results[0].data.reduce(
          (sum: number, item: { [x: string]: any }) =>
            sum + Number(item["blinkit_insights_sku.inv_qty"] || 0),
          0
        ),
        avgRank: (
          response.results[0].data.reduce(
            (sum: number, item: { [x: string]: any }) =>
              sum + Number(item["blinkit_scraping_stream.rank_avg"] || 0),
            0
          ) / (response.results[0].data.length || 1)
        ).toFixed(1),
      };
      setData(mappedData);
      setTotal({
        ...calculatedTotal,
        estTraffic: 0,
        estImpressions: 0,
        avgRank: Number(calculatedTotal.avgRank),
      });
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#F8F8F8] rounded-xl py-2">
      <div className="flex justify-between items-center mb-6 p-6">
        <div>
          <h2 className="text-[20px] font-bold font-mulish text-[#031B15] tracking-[-3%] leading-[1.2]">
            {title}
          </h2>
          <p className="text-[14px] text-[#4F4D55] font-normal font-mulish leading-[1.286] mt-1">
            Analytics for all your {title.split(" ")[0].toLowerCase()}s
          </p>
        </div>
        <button className="cursor-pointer flex items-center gap-2 px-3 py-2.5 bg-[#027056] border border-[#D9D9D9] rounded-[10px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.04)]">
          <span className="text-[14px] font-medium text-white font-mulish leading-[1.429]">
            Filters(1)
          </span>
          <ChevronDown size={16} className="text-[#FAFAFA]" strokeWidth={1.5} />
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl mx-6">
        <table className="bg-white w-full text-sm text-left border border-[#F1F1F1] rounded-xl">
          <thead className="text-nowrap ">
            <tr className="border-b border-[#F1F1F1]">
              <th rowSpan={2} className="py-3 px-4 w-[250px]">
                <div className="flex items-center gap-2">
                  <ChartLine
                    size={16}
                    className="text-[#031B15]"
                    strokeWidth={1.5}
                  />
                  <span className="text-[15px] text-[#013025] font-mulish font-semibold leading-[1.067] tracking-[-0.133%]">
                    {title.split(" ")[0]} Name
                  </span>
                </div>
              </th>
              <th
                colSpan={3}
                className="py-3 px-4 font-bold text-[15px] text-[#013025] text-center border-x border-[#F1F1F1] font-mulish leading-[1.2] tracking-[-0.133%]"
              >
                Availability
              </th>
              <th
                colSpan={3}
                className="py-3 px-4 font-bold text-[15px] text-[#013025] text-center font-mulish leading-[1.2] tracking-[-0.133%]"
              >
                Visibility
              </th>
            </tr>
            <tr className="border-b border-[#F1F1F1] bg-white">
              <th className="py-4 border-l border-[#F1F1F1] px-4 font-semibold">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[15px] text-[#013025] font-mulish font-semibold leading-[1.067] tracking-[-0.133%]">
                    Sales
                  </span>
                  <ChevronDown
                    size={16}
                    className="text-[#031B15]"
                    strokeWidth={1.5}
                  />
                </div>
              </th>
              <th className="py-4 px-4 font-semibold">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[15px] text-[#013025] font-mulish font-semibold leading-[1.067] tracking-[-0.133%]">
                    Out of Stock
                  </span>
                  <ChevronDown
                    size={16}
                    className="text-[#031B15]"
                    strokeWidth={1.5}
                  />
                </div>
              </th>
              <th className="py-4 px-4 font-semibold border-r border-[#F1F1F1]">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[15px] text-[#013025] font-mulish font-semibold leading-[1.067] tracking-[-0.133%]">
                    Total Inventory
                  </span>
                  <ChevronDown
                    size={16}
                    className="text-[#031B15]"
                    strokeWidth={1.5}
                  />
                </div>
              </th>
              <th className="py-4 px-4 font-semibold">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[15px] text-[#013025] font-mulish font-semibold leading-[1.067] tracking-[-0.133%]">
                    Average Rank
                  </span>
                  <ChevronDown
                    size={16}
                    className="text-[#031B15]"
                    strokeWidth={1.5}
                  />
                </div>
              </th>
              <th className="py-4 px-4 font-semibold">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[15px] text-[#013025] font-mulish font-semibold leading-[1.067] tracking-[-0.133%]">
                    Est. Traffic
                  </span>
                  <ChevronDown
                    size={16}
                    className="text-[#031B15]"
                    strokeWidth={1.5}
                  />
                </div>
              </th>
              <th className="py-4 px-4 font-semibold">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[15px] text-[#013025] font-mulish font-semibold leading-[1.067] tracking-[-0.133%]">
                    Est. Impressions
                  </span>
                  <ChevronDown
                    size={16}
                    className="text-[#031B15]"
                    strokeWidth={1.5}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="text-nowrap">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-4 text-center text-[#4E5E5A] font-mulish"
                >
                  Loading data...
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b border-[#F1F1F1] ${
                    selectedItems[row["name"]] ? "bg-[#F7F7F7]" : "bg-white"
                  }`}
                >
                  <td className="py-4 px-3 flex items-center gap-2 border-r border-[#F1F1F1]">
                    <input
                      type="checkbox"
                      checked={selectedItems[row["name"]] || false}
                      onChange={() => onCheckboxChange(row["name"])}
                      className="w-4 h-4 rounded-md border-[#CDD1D0] accent-[#027056] text-[#027056] focus:ring-[#027056] focus:ring-offset-0 focus:ring-1 checked:bg-[#027056] checked:hover:bg-[#027056] checked:border-[#027056] cursor-pointer"
                    />
                    <span className="text-[15px] text-[#0A090B] font-mulish font-semibold underline leading-[1.067] tracking-[-0.133%]">
                      {row["name"]}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-[14px] text-[#4E5E5A] font-mulish font-medium leading-[1.143] tracking-[-0.143%]">
                    {row["sales"]}
                  </td>
                  <td className="py-4 px-4 text-center text-[14px] text-[#4E5E5A] font-mulish font-medium leading-[1.143] tracking-[-0.143%]">
                    {row["outOfStock"]}
                  </td>
                  <td className="py-4 px-4 text-center text-[14px] text-[#4E5E5A] font-mulish font-medium leading-[1.143] tracking-[-0.143%] border-r border-[#F1F1F1]">
                    {row["totalInventory"]}
                  </td>
                  <td className="py-4 px-4 text-center text-[14px] text-[#4E5E5A] font-mulish font-medium leading-[1.143] tracking-[-0.143%]">
                    {row["avgRank"]}
                  </td>
                  <td className="py-4 px-4 text-center text-[14px] text-[#4E5E5A] font-mulish font-medium leading-[1.143] tracking-[-0.143%]">
                    {row["estTraffic"]}
                  </td>
                  <td className="py-4 px-4 text-center text-[14px] text-[#4E5E5A] font-mulish font-medium leading-[1.143] tracking-[-0.143%]">
                    {row["estImpressions"]}
                  </td>
                </tr>
              ))
            )}
            <tr className="bg-[#FCFCFC] border-t border-[#F1F1F1]">
              <td className="py-4 px-3 text-[15px] text-[#0A090B] font-mulish font-bold leading-[1.067] tracking-[-0.133%] border-r border-[#F1F1F1]">
                TOTAL
              </td>
              <td className="py-4 px-4 text-center text-[15px] text-[#0A090B] font-mulish font-bold leading-[1.067] tracking-[-0.133%]">
                {total.sales}
              </td>
              <td className="py-4 px-4 text-center text-[15px] text-[#0A090B] font-mulish font-bold leading-[1.067] tracking-[-0.133%]">
                {total.outOfStock}
              </td>
              <td className="py-4 px-4 text-center text-[15px] text-[#0A090B] font-mulish font-bold leading-[1.067] tracking-[-0.133%] border-r border-[#F1F1F1]">
                {total.totalInventory}
              </td>
              <td className="py-4 px-4 text-center text-[15px] text-[#0A090B] font-mulish font-bold leading-[1.067] tracking-[-0.133%]">
                {total.avgRank}
              </td>
              <td className="py-4 px-4 text-center text-[15px] text-[#0A090B] font-mulish font-bold leading-[1.067] tracking-[-0.133%]">
                {total.estTraffic}
              </td>
              <td className="py-4 px-4 text-center text-[15px] text-[#0A090B] font-mulish font-bold leading-[1.067] tracking-[-0.133%]">
                {total.estImpressions}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SKUDataTable;
