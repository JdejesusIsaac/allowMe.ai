import React from 'react';
import Image from 'next/image';

interface TestimonialCardProps {
  quote: string;
  author: string;
  avatarUrl: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, avatarUrl }) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-yellow-400 text-lg">★</span>
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-200">
          {avatarUrl ? (
            <Image src={avatarUrl} width={48} height={48} alt={author} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#4F46E5]/20"></div>
          )}
        </div>
        <p className="font-medium">{author}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;