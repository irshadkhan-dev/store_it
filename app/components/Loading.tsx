import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2 className="animate-spin h-10 w-10 text-gray-900 font-bold" />
    </div>
  );
};

export default Loading;
