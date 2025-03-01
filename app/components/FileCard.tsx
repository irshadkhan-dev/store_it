import { format } from "date-fns";
import { EllipsisVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const FileCard = ({
  name,
  createdAt,
  size,
  url,
}: {
  name: string;
  createdAt: Date;
  size: string;
  url: string;
}) => {
  const formattedDate = format(createdAt, "h:mma, dd MMM");
  return (
    <div className="flex flex-col space-y-8 rounded-2xl bg-white p-4 drop-shadow-2xl">
      <div className="flex flex-row justify-between items-center">
        <img
          src={url}
          alt="file img"
          className="w-20 h-20 shrink-0 rounded-full object-center"
        />

        <div className="flex flex-col space-y-2">
          <Popover>
            <PopoverTrigger asChild>
              <EllipsisVertical className="h-9 w-9 shrink-0 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="w-80" sideOffset={20}>
              <div className="p-2 flex flex-col"></div>
            </PopoverContent>
          </Popover>

          <span>{size}</span>
        </div>
      </div>

      <div className="flex flex-col space-y-0.5">
        <span className="w-52 break-words text-sm">{name}</span>
        <span className="text-sm text-gray-400">{formattedDate}</span>
      </div>
    </div>
  );
};

export default FileCard;
