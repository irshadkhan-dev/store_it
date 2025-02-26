import { format } from "date-fns";
import { RecentFileUplodedItem } from "@/types/auth";

const RecentFileCard = ({
  name,
  icon: Icon,
  iconBgColor,
  createdAt,
}: RecentFileUplodedItem) => {
  const formattedDate = format(createdAt, "h:mma, dd MMM");
  return (
    <div className="flex flex-row justify-between items-center">
      <div className="flex flex-row items-center space-x-2">
        <div
          className={`rounded-full flex items-center p-3`}
          style={{ backgroundColor: `${iconBgColor}` }}
        >
          <Icon className="text-white" />
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium w-96 break-words line-clamp-1">
            {name}
          </span>
          <span className="text-sm text-gray-400">{formattedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default RecentFileCard;
