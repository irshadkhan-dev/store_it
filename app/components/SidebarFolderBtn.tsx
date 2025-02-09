import { LucideIcon } from "lucide-react";
import { cn } from "../utils/helperFunc";
import { Link, useLocation } from "@tanstack/react-router";

const SidebarFolderBtn = ({
  name,
  link,
  icon: Icon,
  className,
}: {
  name: string;
  link: string;
  icon: LucideIcon;
  className?: string;
}) => {
  const { pathname } = useLocation();

  return (
    <Link
      to={link}
      className={cn(
        "flex w-60 items-center justify-center space-x-1 rounded-3xl px-2 py-4 drop-shadow-lg",
        className,
        link === pathname
          ? "bg-[#FA7275] text-white ring-white hover:ring-4"
          : "bg-white text-black ring-[#FA7275] hover:ring-4"
      )}
    >
      <Icon className="h-6 w-6 flex-shrink-0" />
      <span className="text-base font-semibold">{name}</span>
    </Link>
  );
};

export default SidebarFolderBtn;
