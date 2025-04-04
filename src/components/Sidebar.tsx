"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navigation } from "./Navigation";
import {
  CircleHelp,
  PlusIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Settings } from "lucide-react";
import { cn } from "@/utils/cn";

interface SidebarProps {
  userInitials?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ userInitials = "SS" }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const [isChannelsOpen, setIsChannelsOpen] = useState(true);
  const toggleChannels = () => {
    setIsChannelsOpen(!isChannelsOpen);
  };

  return (
    <aside
      className={`transition-all duration-300 ${
        isCollapsed ? "w-[51px]" : "w-[280px]"
      }`}
    >
      <Navigation isCollapsed={isCollapsed} onCollapse={handleCollapse} />

      <div className="flex h-[calc(100vh-80px)]">
        <div className="flex flex-col items-center">
          {/* Navigation icons */}
          <div className="flex-1 flex flex-col gap-4 items-center py-4">
            <div className="cursor-pointer">
              <Image
                src="/images/meta-ads.png"
                alt="Meta Ads"
                width={40}
                height={40}
                className="w-[40px] h-[40px] rounded-[12px] border"
              />
            </div>

            <div className="cursor-pointer">
              <Image
                src="/images/google-ads.png"
                alt=" Ads"
                width={40}
                height={40}
                className="w-[40px] h-[40px] rounded-[12px] border"
              />
            </div>

            {/* Add New */}
            <div className="cursor-pointer flex hover:bg-[#1d874e0b] items-center justify-between rounded-[12px] border w-[40px] h-[40px]">
              <PlusIcon className="text-[#1D874F] w-16" />
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

        <div
          className={cn(
            "py-2 bg-gray-100 flex gap-1 flex-col items-start w-full px-2",
            isCollapsed ? "hidden" : ""
          )}
        >
          <div className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer">
            {/* <House size={20} color="#7E8986" /> */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 19 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.2574 15.25H17.0074V9.625L17.1903 9.80781C17.3077 9.92509 17.467 9.99089 17.633 9.99074C17.799 9.9906 17.9581 9.92451 18.0754 9.80703C18.1927 9.68955 18.2585 9.53029 18.2583 9.36429C18.2582 9.19829 18.1921 9.03915 18.0746 8.92188L10.391 1.24062C10.1566 1.00638 9.83883 0.874798 9.50745 0.874798C9.17607 0.874798 8.85825 1.00638 8.62385 1.24062L0.940259 8.92188C0.823087 9.03915 0.757302 9.19817 0.757375 9.36395C0.757448 9.52973 0.823374 9.68869 0.940649 9.80586C1.05792 9.92303 1.21694 9.98882 1.38272 9.98874C1.5485 9.98867 1.70746 9.92274 1.82463 9.80547L2.00745 9.625V15.25H0.757446C0.591686 15.25 0.432715 15.3158 0.315505 15.4331C0.198294 15.5503 0.132446 15.7092 0.132446 15.875C0.132446 16.0408 0.198294 16.1997 0.315505 16.3169C0.432715 16.4342 0.591686 16.5 0.757446 16.5H18.2574C18.4232 16.5 18.5822 16.4342 18.6994 16.3169C18.8166 16.1997 18.8824 16.0408 18.8824 15.875C18.8824 15.7092 18.8166 15.5503 18.6994 15.4331C18.5822 15.3158 18.4232 15.25 18.2574 15.25ZM3.25745 8.375L9.50745 2.125L15.7574 8.375V15.25H12.0074V10.875C12.0074 10.7092 11.9416 10.5503 11.8244 10.4331C11.7072 10.3158 11.5482 10.25 11.3824 10.25H7.63245C7.46669 10.25 7.30771 10.3158 7.1905 10.4331C7.07329 10.5503 7.00745 10.7092 7.00745 10.875V15.25H3.25745V8.375ZM10.7574 15.25H8.25745V11.5H10.7574V15.25Z"
                fill="#7E8986"
              />
            </svg>

            <span className="text-sm">Overview</span>
          </div>
          <div className="w-full">
            <div
              onClick={toggleChannels}
              className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer"
            >
              {/* <Tv size={20} color="#7E8986" /> */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.3824 2.125H9.13245V0.875C9.13245 0.70924 9.0666 0.550269 8.94939 0.433058C8.83218 0.315848 8.67321 0.25 8.50745 0.25C8.34169 0.25 8.18271 0.315848 8.0655 0.433058C7.94829 0.550269 7.88245 0.70924 7.88245 0.875V2.125H1.63245C1.30093 2.125 0.982983 2.2567 0.748563 2.49112C0.514142 2.72554 0.382446 3.04348 0.382446 3.375V12.75C0.382446 13.0815 0.514142 13.3995 0.748563 13.6339C0.982983 13.8683 1.30093 14 1.63245 14H4.70745L3.01917 16.1094C2.91556 16.2389 2.86765 16.4042 2.88597 16.5691C2.90428 16.7339 2.98732 16.8847 3.11682 16.9883C3.24632 17.0919 3.41167 17.1398 3.5765 17.1215C3.74133 17.1032 3.89213 17.0201 3.99573 16.8906L6.30745 14H10.7074L13.0192 16.8906C13.0705 16.9547 13.1339 17.0081 13.2058 17.0477C13.2778 17.0874 13.3568 17.1124 13.4384 17.1215C13.52 17.1306 13.6026 17.1235 13.6815 17.1006C13.7604 17.0777 13.8339 17.0396 13.8981 16.9883C13.9622 16.937 14.0156 16.8736 14.0552 16.8016C14.0948 16.7297 14.1199 16.6507 14.1289 16.5691C14.138 16.4874 14.1309 16.4048 14.108 16.326C14.0852 16.2471 14.047 16.1735 13.9957 16.1094L12.3074 14H15.3824C15.714 14 16.0319 13.8683 16.2663 13.6339C16.5007 13.3995 16.6324 13.0815 16.6324 12.75V3.375C16.6324 3.04348 16.5007 2.72554 16.2663 2.49112C16.0319 2.2567 15.714 2.125 15.3824 2.125ZM15.3824 12.75H1.63245V3.375H15.3824V12.75ZM6.63245 8.375V10.25C6.63245 10.4158 6.5666 10.5747 6.44939 10.6919C6.33218 10.8092 6.17321 10.875 6.00745 10.875C5.84169 10.875 5.68271 10.8092 5.5655 10.6919C5.44829 10.5747 5.38245 10.4158 5.38245 10.25V8.375C5.38245 8.20924 5.44829 8.05027 5.5655 7.93306C5.68271 7.81585 5.84169 7.75 6.00745 7.75C6.17321 7.75 6.33218 7.81585 6.44939 7.93306C6.5666 8.05027 6.63245 8.20924 6.63245 8.375ZM9.13245 7.125V10.25C9.13245 10.4158 9.0666 10.5747 8.94939 10.6919C8.83218 10.8092 8.67321 10.875 8.50745 10.875C8.34169 10.875 8.18271 10.8092 8.0655 10.6919C7.94829 10.5747 7.88245 10.4158 7.88245 10.25V7.125C7.88245 6.95924 7.94829 6.80027 8.0655 6.68306C8.18271 6.56585 8.34169 6.5 8.50745 6.5C8.67321 6.5 8.83218 6.56585 8.94939 6.68306C9.0666 6.80027 9.13245 6.95924 9.13245 7.125ZM11.6324 5.875V10.25C11.6324 10.4158 11.5666 10.5747 11.4494 10.6919C11.3322 10.8092 11.1732 10.875 11.0074 10.875C10.8417 10.875 10.6827 10.8092 10.5655 10.6919C10.4483 10.5747 10.3824 10.4158 10.3824 10.25V5.875C10.3824 5.70924 10.4483 5.55027 10.5655 5.43306C10.6827 5.31585 10.8417 5.25 11.0074 5.25C11.1732 5.25 11.3322 5.31585 11.4494 5.43306C11.5666 5.55027 11.6324 5.70924 11.6324 5.875Z"
                  fill="#7E8986"
                />
              </svg>

              <span className="text-sm">Channels</span>
              {isChannelsOpen ? (
                <ChevronUp size={20} color="#031B15" className="ml-auto" />
              ) : (
                <ChevronDown size={20} color="#031B15" className="ml-auto" />
              )}
            </div>
            {isChannelsOpen && (
              <div className="pl-10 space-y-1">
                <div className="px-4 py-2 text-gray-600 text-sm hover:bg-gray-200 rounded-lg cursor-pointer">
                  Meta Ads
                </div>
                <div className="px-4 py-2 text-gray-600 text-sm hover:bg-gray-200 rounded-lg cursor-pointer">
                  Google Ads
                </div>
                <div className="px-4 py-2 bg-blue-100 text-[#027056] font-medium text-sm rounded-lg cursor-pointer">
                  Quick Commerce
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer">
            {/* <Images size={20} color="#7E8986" /> */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.7574 0.5H3.75745C3.42593 0.5 3.10798 0.631696 2.87356 0.866116C2.63914 1.10054 2.50745 1.41848 2.50745 1.75V3H1.25745C0.925926 3 0.607983 3.1317 0.373563 3.36612C0.139142 3.60054 0.00744629 3.91848 0.00744629 4.25V14.25C0.00744629 14.5815 0.139142 14.8995 0.373563 15.1339C0.607983 15.3683 0.925926 15.5 1.25745 15.5H11.2574C11.589 15.5 11.9069 15.3683 12.1413 15.1339C12.3757 14.8995 12.5074 14.5815 12.5074 14.25V13H13.7574C14.089 13 14.4069 12.8683 14.6413 12.6339C14.8757 12.3995 15.0074 12.0815 15.0074 11.75V1.75C15.0074 1.41848 14.8757 1.10054 14.6413 0.866116C14.4069 0.631696 14.089 0.5 13.7574 0.5ZM3.75745 1.75H13.7574V7.17031L12.4528 5.86562C12.2184 5.63138 11.9005 5.4998 11.5692 5.4998C11.2378 5.4998 10.92 5.63138 10.6856 5.86562L4.80198 11.75H3.75745V1.75ZM11.2574 14.25H1.25745V4.25H2.50745V11.75C2.50745 12.0815 2.63914 12.3995 2.87356 12.6339C3.10798 12.8683 3.42593 13 3.75745 13H11.2574V14.25ZM13.7574 11.75H6.56995L11.5699 6.75L13.7574 8.9375V11.75ZM6.88245 6.75C7.25329 6.75 7.6158 6.64003 7.92414 6.43401C8.23248 6.22798 8.47281 5.93514 8.61472 5.59253C8.75663 5.24992 8.79377 4.87292 8.72142 4.50921C8.64907 4.14549 8.4705 3.8114 8.20827 3.54917C7.94605 3.28695 7.61196 3.10837 7.24824 3.03603C6.88453 2.96368 6.50753 3.00081 6.16492 3.14273C5.8223 3.28464 5.52947 3.52496 5.32344 3.83331C5.11741 4.14165 5.00745 4.50416 5.00745 4.875C5.00745 5.37228 5.20499 5.84919 5.55662 6.20083C5.90825 6.55246 6.38517 6.75 6.88245 6.75ZM6.88245 4.25C7.00606 4.25 7.1269 4.28666 7.22968 4.35533C7.33246 4.42401 7.41257 4.52162 7.45987 4.63582C7.50718 4.75003 7.51955 4.87569 7.49544 4.99693C7.47132 5.11817 7.4118 5.22953 7.32439 5.31694C7.23698 5.40435 7.12562 5.46388 7.00438 5.48799C6.88314 5.51211 6.75747 5.49973 6.64327 5.45243C6.52907 5.40512 6.43145 5.32501 6.36278 5.22223C6.2941 5.11945 6.25745 4.99861 6.25745 4.875C6.25745 4.70924 6.32329 4.55027 6.4405 4.43306C6.55771 4.31585 6.71669 4.25 6.88245 4.25Z"
                fill="#7E8986"
              />
            </svg>

            <span className="text-sm">Creatives</span>
          </div>

          <div className="space-y-1 mt-auto w-full">
            <div className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer">
              <CircleHelp size={20} color="#7E8986" />
              <span className="text-sm">Help</span>
            </div>
            <div className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-lg cursor-pointer">
              <Settings size={20} color="#7E8986" />
              <span className="text-sm">Settings</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
