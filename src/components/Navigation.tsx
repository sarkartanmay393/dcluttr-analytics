import React from "react";
import Image from "next/image";
import { BrandDropdown } from "./BrandDropdown";

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
    <div className="flex items-center gap-4 border p-4">
      <div
        className={`w-10 h-10 rounded-xl bg-[#E8E7E7] border-2 border-[#139C53] overflow-hidden 
        ${isCollapsed ? "hidden" : ""}`}
      >
        <Image
          src="/images/brand-logo.png"
          alt="Brand Logo"
          width={40}
          height={40}
          className={`object-cover`}
        />
      </div>

      <BrandDropdown
        brands={brands}
        className={`flex-1 ${isCollapsed ? "hidden" : ""}`}
      />

      <button
        onClick={onCollapse}
        className="flex items-center justify-center w-4 h-4 hover:bg-gray-100 rounded-full transition-colors"
      >
        <div className="flex">
          <Image
            src="/images/chevrons-left-1.svg"
            alt="Collapse"
            width={16}
            height={16}
            className={`text-[#027056] ${isCollapsed ? "rotate-180" : ""}`}
          />
          <Image
            src="/images/chevrons-left-2.svg"
            alt="Collapse"
            width={16}
            height={16}
            className={`-ml-1 text-[#027056] ${isCollapsed ? "rotate-180" : ""}`}
          />
        </div>
      </button>
    </div>
  );
};
