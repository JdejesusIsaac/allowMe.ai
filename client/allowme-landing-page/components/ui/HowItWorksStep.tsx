import React from 'react';

interface HowItWorksStepProps {
  number: number;
  title: string;
  description: string;
  isLeft?: boolean;
}

const HowItWorksStep: React.FC<HowItWorksStepProps> = ({ number, title, description, isLeft = true }) => {
  return (
    <div className={`flex flex-col md:flex-row ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
      <div className={`relative z-10 flex-none ${isLeft ? 'md:mr-8' : 'md:ml-8'}`}>
        <div className="w-12 h-12 rounded-full bg-[#4F46E5] text-white flex items-center justify-center text-xl font-bold">
          {number}
        </div>
      </div>
      
      <div className={`bg-white rounded-lg p-6 shadow-sm border border-gray-100 mt-4 md:mt-0 
        ${isLeft ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'} md:w-5/12`}>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default HowItWorksStep;