import React, { useState } from "react";
import Image from "next/image";
import { Navigation } from "./Navigation";

interface SidebarProps {
  userInitials?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  userInitials = "SS",
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <aside className={`bg-white border-r border-[#EBEBEB] transition-all duration-300 ${
      isCollapsed ? 'w-[51px]' : 'w-[280px]'
    }`}>
      <Navigation isCollapsed={isCollapsed} onCollapse={handleCollapse} />
      
      <div className="flex h-[calc(100vh-80px)]">
        {/* Main content area */}
        <div className="w-[51px] bg-white flex flex-col items-center">
          {/* Navigation icons */}
          <div className="flex-1 flex flex-col gap-4 items-center py-4">
            {/* Meta Ads */}
            <div className="w-[50px] py-[6px] px-[14px] hover:bg-[rgba(1,171,130,0.13)] cursor-pointer">
              <div className="w-[22px] h-[22px] rounded-xl overflow-hidden">
                <Image
                  src="/images/meta-ads.png"
                  alt="Meta Ads"
                  width={22}
                  height={22}
                  className="border border-[rgba(0,0,0,0.08)]"
                />
              </div>
            </div>

            {/* Google Ads */}
            <div className="w-[50px] py-[6px] px-[14px] hover:bg-[rgba(1,171,130,0.13)] cursor-pointer">
              <div className="w-[22px] h-[22px] rounded-xl overflow-hidden">
                <Image
                  src="/images/google-ads.png"
                  alt="Google Ads"
                  width={22}
                  height={22}
                />
              </div>
            </div>

            {/* Add New */}
            <div className="w-[50px] py-[6px] px-[14px] hover:bg-[rgba(1,171,130,0.13)] cursor-pointer">
              <div className="w-[22px] h-[22px] rounded-xl border border-[#B4BBB9] flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 2.5V9.5"
                    stroke="#1D874F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M2.5 6H9.5"
                    stroke="#1D874F"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom section with user icons */}
          <div className="p-4 flex flex-col gap-4 items-center">
            {/* Users icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                stroke="#7E8986"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                stroke="#7E8986"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
                stroke="#7E8986"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
                stroke="#7E8986"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* User avatar */}
            <div className="w-7 h-7 rounded-full bg-[#9106FF] border border-white/10 flex items-center justify-center">
              <span className="font-mulish text-xs font-semibold text-white">
                {userInitials}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
