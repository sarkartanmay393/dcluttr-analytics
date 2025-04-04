import React from "react";
import Image from "next/image";
import { BrandDropdown } from "./BrandDropdown";
import { ChevronLeft } from "lucide-react";

interface NavigationProps {
  isCollapsed: boolean;
  onCollapse: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  isCollapsed,
  onCollapse,
}) => {
  const brands = [
    {
      id: "1",
      name: "Test_brand",
      initials: "SS",
      logo: "/images/brand-logo.png",
    },
    {
      id: "2",
      name: "Test_brand_2",
      initials: "SS",
      logo: "/images/brand-logo.png",
    },
  ];

  return (
    <div className="flex items-center gap-4 p-2 h-[80px]">
      <div
        className={`rounded-xl bg-[#E8E7E7] border-2 border-[#139C53] overflow-hidden 
        ${isCollapsed ? "hidden" : ""}`}
      >
        <Image
          src="/images/brand-logo.png"
          alt="Brand Logo"
          width={40}
          height={40}
          priority
          fetchPriority="high"
          className={`object-cover w-[40px] h-[40px]`}
        />
      </div>

      <BrandDropdown
        brands={brands}
        className={`flex-1 ${isCollapsed ? "hidden" : ""}`}
      />

      <button
        onClick={onCollapse}
        className={`flex items-center justify-center ${
          isCollapsed ? "ml-2" : ""
        }`}
      >
        <div className="flex">
          <ChevronLeft
            className={`text-[#027056] w-5 h-5 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
          <ChevronLeft
            className={`-ml-3.5 w-5 h-5 text-[#027056] ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
    </div>
  );
};
