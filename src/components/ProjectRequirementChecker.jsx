import React, { useState } from 'react';
import { Typography, TextField, Button, Alert } from '@mui/material';
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
      <Typography variant="h5" className="text-gray-800 font-semibold">
        Project Requirement Checker
      </Typography>
      <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <Typography variant="h6" className="mb-4 text-gray-700">
          AI Project Requirement Checker
        </Typography>
        <TextField
          label="Enter your project requirements"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          fullWidth
          variant="outlined"
          className="mb-4"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCheck}
          className="w-full"
        >
          Check Requirements
        </Button>
        {error && <Alert severity="error" className="mt-4">{error}</Alert>}
        {result && (
          <div className="mt-4 space-y-2">
            <Typography>Recommendation: {result.recommendation}</Typography>
            <Typography>Complexity: {result.complexity}</Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectRequirementChecker;