"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/utils/cn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BrandDropdownProps {
  brands: {
    id: string;
    name: string;
    initials: string;
    color?: string;
  }[];
  selectedBrand?: string;
  onSelectBrand?: (brandId: string) => void;
  className?: string;
}

export function BrandDropdown({
  brands,
  selectedBrand,
  onSelectBrand,
  className,
}: BrandDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(
    selectedBrand || (brands.length > 0 ? brands[0].id : "")
  );

  const currentBrand = React.useMemo(() => {
    return brands.find((brand) => brand.id === selected) || brands[0];
  }, [brands, selected]);

  const handleSelect = (brandId: string) => {
    setSelected(brandId);
    setIsOpen(false);
    if (onSelectBrand) {
      onSelectBrand(brandId);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex w-full items-center justify-between rounded-xl border border-[rgba(0,0,0,0.12)] bg-[#FDFDFD] px-1.5 py-1.5",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#309E96]">
                <span className="font-mulish text-[11px] font-semibold leading-[1.255] text-white">
                  {currentBrand.initials}
                </span>
              </div>
              <span className="font-mulish text-sm font-semibold leading-[1.255] text-[#031B15]">
                {currentBrand.name.slice(0, 10)}{currentBrand.name.length > 10 ? '...' : ''}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <Image
              src="/images/caret-updown-new.svg"
              alt="Toggle"
              width={16}
              height={16}
              className={`transform transition-transform duration-200 w-4 h-4`}
            />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-[--radix-dropdown-trigger-width] rounded-xl border border-[rgba(0,0,0,0.12)] bg-[#FDFDFD] p-1"
      >
        {brands.map((brand) => (
          <DropdownMenuItem
            key={brand.id}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-[#F8F8F8]"
            onSelect={() => handleSelect(brand.id)}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#309E96]">
              <span className="font-mulish text-[11px] font-semibold leading-[1.255] text-white">
                {brand.initials}
              </span>
            </div>
            <span className="font-mulish text-sm font-semibold leading-[1.255] text-[#031B15]">
              {brand.name}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
