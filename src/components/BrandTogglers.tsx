"use client";

import React, { useState } from "react";
import Image from "next/image";

const BrandTogglers = () => {
  const [activeButton, setActiveButton] = useState("Blinkit");
  const handleButtonClick = (buttonName: React.SetStateAction<string>) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="flex gap-3 p-1 ml-1 border-1 border-[#F1F1F1] rounded-[12px] w-fit">
      <button
        onClick={() => handleButtonClick("Blinkit")}
        className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-[10px] transition-opacity duration-300 ${
          activeButton === "Blinkit"
            ? "text-[#027056] bg-[#DFEAE8]"
            : "bg-transparent opacity-40 text-[#031B15B2]"
        }`}
      >
        <Image
          src={"/images/blinkit-logo.png"}
          alt="Blinkit"
          width={20}
          height={20}
          className="w-5 h-5"
        />
        <span className="text-[14px]">Blinkit</span>
      </button>

      <button
        onClick={() => handleButtonClick("Zepto")}
        className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-[10px] transition-opacity duration-300 ${
          activeButton === "Zepto"
            ? "text-[#027056] bg-[#DFEAE8]"
            : "bg-transparent opacity-40 text-[#031B15B2]"
        }`}
      >
        <Image
          width={20}
          height={20}
          src={"/images/zepto-logo.png"}
          alt="Zepto"
          className="w-5 h-5"
        />
        <span className="text-[14px] font-medium">Zepto</span>
      </button>
      <button
        onClick={() => handleButtonClick("Instamart")}
        className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-[10px] transition-opacity duration-300 ${
          activeButton === "Instamart"
            ? "text-[#027056] bg-[#DFEAE8]"
            : "bg-transparent opacity-40 text-[#031B15B2]"
        }`}
      >
        <Image
          src={"/images/instamart-logo.png"}
          alt="Instamart"
          className="w-5 h-5"
          width={20}
          height={20}
        />
        <span className="text-[14px] font-medium">Instamart</span>
      </button>
    </div>
  );
};

export default BrandTogglers;
