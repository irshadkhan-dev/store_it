import { UploadCloudIcon } from "lucide-react";

const UploadBtn = () => {
  return (
    <div className="flex cursor-pointer items-center space-x-1 rounded-3xl bg-[#FA7275] px-7 py-3 text-white ring-white drop-shadow-lg hover:ring-4">
      <UploadCloudIcon className="h-6 w-6" />
      <button className="text-base font-semibold">Upload</button>
    </div>
  );
};

export default UploadBtn;
