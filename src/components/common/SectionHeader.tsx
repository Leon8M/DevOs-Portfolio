// src/components/common/SectionHeader.tsx (or directly in Experience.tsx/Education.tsx)
import React from 'react';

interface SectionHeaderProps {
    title: string;
    iconSrc: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, iconSrc }) => (
    <div className="flex items-center bg-gradient-to-b from-[#084ac1] via-[#1c64d1] to-[#2575e9] px-3 py-1 mb-3 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] border-t border-l border-white border-b-[#245DCF] border-r-[#245DCF]">
        <img src={iconSrc} alt={title} className="w-5 h-5 mr-2 brightness-125" />
        <h3 className="text-sm font-bold text-white xp-text-shadow">{title}</h3>
    </div>
);

export default SectionHeader;