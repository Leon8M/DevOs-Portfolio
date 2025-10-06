import React from 'react';

const SystemInfo: React.FC = () => {
  return (
    <div className="p-4 bg-[#ECE9D8] font-['Tahoma',_sans-serif] text-xs">
      <div className="border-2 border-t-[#FFFFFF] border-l-[#FFFFFF] border-r-[#808080] border-b-[#808080] p-4">
        <h2 className="text-lg font-bold mb-4">System Information</h2>

        <div className="bg-white p-3 border border-gray-400 shadow-inner">
          <div className="mb-4">
            <h3 className="font-bold border-b mb-2 pb-1">Developer:</h3>
            <p>Full-Stack Developer (Next.js, Django, AI)</p>
          </div>

          <div className="mb-4">
            <h3 className="font-bold border-b mb-2 pb-1">Current Projects:</h3>
            <p>Kamusi AI, ECD Smart Data Portal, Propel Dashboard</p>
          </div>

          <div>
            <h3 className="font-bold border-b mb-2 pb-1">Location & Work Preference:</h3>
            <p>Nairobi — Open to Remote Roles</p>
          </div>
        </div>

        <div className="text-center mt-4">
          <button className="px-6 py-1 border-2 border-t-[#FFFFFF] border-l-[#FFFFFF] border-r-[#808080] border-b-[#808080] bg-[#ECE9D8] hover:bg-gray-200">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemInfo;
