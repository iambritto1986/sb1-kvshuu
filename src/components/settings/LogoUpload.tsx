import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface LogoUploadProps {
  currentLogo?: string;
  onLogoChange: (logo: string) => void;
}

const LogoUpload = ({ currentLogo, onLogoChange }: LogoUploadProps) => {
  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onLogoChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  }, [onLogoChange]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Company Logo</h3>
        <label className="cursor-pointer px-3 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 flex items-center">
          <Upload className="w-4 h-4 mr-2" />
          Upload New Logo
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center">
        {currentLogo ? (
          <img
            src={currentLogo}
            alt="Company Logo"
            className="max-h-24 object-contain"
          />
        ) : (
          <div className="text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">No logo uploaded</p>
          </div>
        )}
      </div>
      
      <p className="text-xs text-gray-500">
        Recommended: PNG or JPG, at least 256x256 pixels
      </p>
    </div>
  );
};

export default LogoUpload;