import { cn } from "../utils/helperFunc";

const MaxWidthwrapper = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return <div className={cn("w-full px-4 md:px-8", className)}>{children}</div>;
};

export default MaxWidthwrapper;
