import { CircleX } from "lucide-react";
import UploadBtn from "./UploadBtn";
import { cn } from "../utils/helperFunc";
import { SidebarFolderData } from "../utils/data";
import SidebarFolderBtn from "./SidebarFolderBtn";

const SidebarMobile = ({
  open,
  handleCloseSidebar,
  className,
}: {
  open: boolean;
  className: string;
  handleCloseSidebar: () => void;
}) => {
  return (
    <div
      className={cn(
        "fixed right-0 top-0 h-screen w-[70vw] bg-gray-100 text-white",
        className
      )}
    >
      <div className="flex w-full flex-col justify-center space-y-10 p-4">
        <div className="flex items-center justify-between">
          <UploadBtn />
          <CircleX
            className="h-8 w-8 cursor-pointer text-[#FA7275]"
            onClick={handleCloseSidebar}
          />
        </div>

        <div className="flex flex-col items-center space-y-12">
          {SidebarFolderData.map((item) => (
            <SidebarFolderBtn
              key={item.id}
              icon={item.icon}
              name={item.name}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarMobile;
