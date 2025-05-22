import React, { useState } from 'react'; // Added useState import
import { dummyFAQs } from '../data/dummyData';

const FAQs = () => {
  const [expanded, setExpanded] = useState(null);

  const handleToggle = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-primary-blue">Frequently Asked Questions</h2>
      <div className="p-6 bg-white rounded-lg shadow-md">
        {dummyFAQs.map((faq, index) => (
          <div key={index} className="mb-2">
            <button
              onClick={() => handleToggle(index)}
              className="w-full text-left p-4 bg-gray-50 rounded flex justify-between items-center"
            >
              <span className="text-text-gray">{faq.question}</span>
              <svg
                className={`w-5 h-5 transform ${expanded === index ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {expanded === index && (
              <div className="p-4 bg-white border-t border-light-gray">
                <p className="text-text-gray">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;