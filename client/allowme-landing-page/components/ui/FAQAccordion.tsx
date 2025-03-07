"use client"

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items?: FAQItem[];
  question?: string;
  answer?: string;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, question, answer }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // If individual question/answer is provided, render a single accordion
  if (question && answer) {
    return (
      <div className="py-5 border-b border-gray-200">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex justify-between items-center w-full text-left"
        >
          <h3 className="text-lg font-medium text-gray-900">{question}</h3>
          <span className="ml-6 flex-shrink-0">
            {isOpen ? (
              <svg className="h-6 w-6 text-[#4F46E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-[#4F46E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </span>
        </button>
        <div
          className={`mt-2 transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-base text-gray-600">{answer}</p>
        </div>
      </div>
    );
  }

  // If items array is provided, render multiple accordions
  return (
    <div className="divide-y divide-gray-200">
      {items && items.map((item, index) => (
        <div key={index} className="py-5">
          <button
            onClick={() => toggleItem(index)}
            className="flex justify-between items-center w-full text-left"
          >
            <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
            <span className="ml-6 flex-shrink-0">
              {openIndex === index ? (
                <svg className="h-6 w-6 text-[#4F46E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              ) : (
                <svg className="h-6 w-6 text-[#4F46E5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </span>
          </button>
          <div
            className={`mt-2 transition-all duration-300 overflow-hidden ${
              openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="text-base text-gray-600">{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;