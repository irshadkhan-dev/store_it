import { UploadCloudIcon } from "lucide-react";

const UploadBtn = ({
  setDropZoneActive,
}: {
  setDropZoneActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <div className="flex cursor-pointer items-center space-x-1 rounded-3xl bg-[#FA7275] px-7 py-3 text-white ring-white drop-shadow-lg hover:ring-4">
        <UploadCloudIcon className="h-6 w-6" />
        <button
          className="text-base font-semibold"
          onClick={() => setDropZoneActive(true)}
        >
          Upload
        </button>
      </div>
    </>
  );
};

export default UploadBtn;
