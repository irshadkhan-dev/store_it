import { cn } from "@/lib/utils";
import { convertFileSize } from "@/utils/helperFunc";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { LucideIcon, Video } from "lucide-react";

const SpaceCard = ({
  className,
  icon: Icon,
  title,
  iconColor,
  link,
  size,
  latestDate,
}: {
  className?: string;
  icon: LucideIcon;
  title: string;
  size: number;
  iconColor: string;
  link: string;
  latestDate: Date;
}) => {
  const formattedDate = format(latestDate, "h:mma, dd MMM");
  return (
    <Link
      to={link}
      className={cn(
        "rounded-2xl hover:scale-105 drop-shadow-2xl p-4 transition-all relative bg-white  flex flex-col",
        className
      )}
    >
      <div className="flex flex-col space-y-4 justify-center">
        <div
          className={`rounded-full  flex items-center p-3 absolute -left-2.5`}
          style={{ backgroundColor: `${iconColor}` }}
        >
          <Icon className="text-white" />
        </div>
        <h4 className="text-right text-[#333F4E] font-medium text-lg">
          {size ? convertFileSize(size) : "No uploads"}
        </h4>
      </div>

      <span className="w-full text-center text-[#333F4E] text-[16px] font-medium mt-2">
        {title}
      </span>

      <div className="flex h-[0.3px] bg-[#A3B2C7] w-full mt-4" />

      <div className="w-full flex flex-col space-y-2 mt-4">
        <span className="text-[#A3B2C7] text-base font-normal text-center">
          Last Updated
        </span>

        <div className="text-[#333F4E] text-base font-normal text-center">
          {formattedDate}
        </div>
      </div>
    </Link>
  );
};

export default SpaceCard;
