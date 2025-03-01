import React, { useState } from "react";
import { LogOut, Rabbit, Search, Sidebar } from "lucide-react";
import { cn } from "@/utils/helperFunc";

import SidebarMobile from "@/components/SidebarMobile";
import UploadBtn from "@/components/UploadBtn";

const Navbar = ({
  setDropZoneActive,
}: {
  setDropZoneActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [open, setIsOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsOpen(!open);
  };

  return (
    <>
      <SidebarMobile
        open={open}
        handleCloseSidebar={handleToggleSidebar}
        setDropZoneActive={setDropZoneActive}
        className={cn(
          "transform transition-all duration-500 ease-in-out",
          open
            ? "z-[99999] translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        )}
      />

      <div className="flex w-full flex-row items-center justify-between space-x-10">
        <div className="flex flex-row items-center space-x-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-semibold text-[#FA7275] flex items-end">
              <Rabbit className="h-10 w-10" />
              <span className="">Store_It</span>
            </span>
          </div>

          <div className="hidden w-96 items-center space-x-1 rounded-2xl p-2 shadow-xl md:flex">
            <Search height={25} width={25} />
            <input
              type="text"
              className="w-full text-neutral-700 outline-none"
            />
          </div>
        </div>

        <div className="hidden flex-row items-center space-x-4 md:flex">
          <UploadBtn setDropZoneActive={setDropZoneActive} />
          <LogOut className="h-6 w-6 font-bold text-[#FA7275]" />
        </div>

        <div className="md:hidden">
          <Sidebar onClick={handleToggleSidebar} />
        </div>
      </div>
    </>
  );
};

export default Navbar;
