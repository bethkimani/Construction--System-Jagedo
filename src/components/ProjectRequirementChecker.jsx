import React, { useState } from 'react';
import { aiProjectRequirementChecker } from '../utils/aiAutomation';

const ProjectRequirementChecker = ({ onBuilderAssign }) => {
  const [requirements, setRequirements] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCheck = () => {
    if (!requirements) {
      setError('Please enter your project requirements');
      return;
    }
    const recommendation = aiProjectRequirementChecker(requirements);
    setResult(recommendation);
    setError('');
    if (onBuilderAssign && recommendation.recommendation) {
      onBuilderAssign({ first_name: 'John', last_name: 'Doe' });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-primary-blue">Project Requirement Checker</h2>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-text-gray mb-4">AI Project Requirement Checker</h3>
        <input
          type="text"
          placeholder="Enter your project requirements"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="w-full p-2 border border-light-gray rounded focus:outline-none focus:ring-2 focus:ring-primary-blue mb-4"
        />
        <button
          onClick={handleCheck}
          className="w-full bg-primary-blue text-white p-2 rounded hover:bg-blue-800"
        >
          Check Requirements
        </button>
        {error && <div className="bg-red-100 text-red-700 p-4 rounded mt-4">{error}</div>}
        {result && (
          <div className="mt-4 space-y-2">
            <p className="text-text-gray">Recommendation: {result.recommendation}</p>
            <p className="text-text-gray">Complexity: {result.complexity}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectRequirementChecker;