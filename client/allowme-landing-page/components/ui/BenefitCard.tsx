import React from 'react';
import Image from 'next/image';

interface BenefitCardProps {
  title: string;
  description: string;
  icon: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center text-center">
      <div className="w-16 h-16 bg-[#4F46E5]/10 rounded-full flex items-center justify-center mb-4">
        {/* If we have the icon file, use it, otherwise use a fallback */}
        {icon ? (
          <Image src={icon} width={32} height={32} alt={title} />
        ) : (
          <div className="w-8 h-8 bg-[#4F46E5] rounded-full"></div>
        )}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default BenefitCard;