import React from 'react';

const ThemeSettings: React.FC = () => {
  // In the future, you can add state and functions here to change wallpapers or themes.
  // For example: const { wallpaper, setWallpaper } = useThemeStore();

  return (
    <div className="p-4 bg-[#f0f0f0] font-['Tahoma',_sans-serif] text-sm">
      <h2 className="text-lg font-bold mb-4 border-b pb-2">Display Properties</h2>
      
      <div className="bg-white p-4 border border-gray-300 shadow-inner">
        <h3 className="font-bold mb-2">Change Wallpaper</h3>
        <p className="text-gray-600 mb-4">
          Select a new background for your desktop. (Functionality coming soon!)
        </p>
        <div className="flex gap-2">
          <div className="w-20 h-16 bg-gray-400 border-2 border-blue-500 cursor-pointer flex items-center justify-center text-white">
            Current
          </div>
          <div className="w-20 h-16 bg-gray-500 border-2 border-transparent hover:border-blue-500 cursor-pointer"></div>
          <div className="w-20 h-16 bg-gray-600 border-2 border-transparent hover:border-blue-500 cursor-pointer"></div>
        </div>
      </div>

      <div className="bg-white p-4 border border-gray-300 shadow-inner mt-4">
        <h3 className="font-bold mb-2">Color Scheme</h3>
        <p className="text-gray-600 mb-4">
          Switch between different window color schemes. (Functionality coming soon!)
        </p>
        <select className="w-full p-1 border border-gray-400">
          <option>Windows XP (Default)</option>
          <option disabled>Dark Mode (Coming Soon)</option>
          <option disabled>Classic (Coming Soon)</option>
        </select>
      </div>
    </div>
  );
};

export default ThemeSettings;
