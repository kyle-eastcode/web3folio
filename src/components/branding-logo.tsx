import { GlobeIcon } from "lucide-react";

export function BrandingLogo() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="bg-blue-600 rounded-full p-1 text-white">
        <GlobeIcon size={20} />
      </div>
      <div>
        <span className="font-bold text-lg text-gray-800 dark:text-gray-200">
          Web3Folio
        </span>
      </div>
    </div>
  );
}