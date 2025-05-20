import React, { useState } from 'react';
import { Typography, TextField, Button, Alert } from '@mui/material';
import { aiSymptomChecker } from '../utils/aiAutomation';

const SymptomChecker = ({ onDoctorAssign }) => {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCheck = () => {
    if (!symptoms) {
      setError('Please enter your symptoms');
      return;
    }
    const diagnosis = aiSymptomChecker(symptoms);
    setResult(diagnosis);
    setError('');
    if (onDoctorAssign && diagnosis.recommendation) {
      onDoctorAssign({ first_name: 'John', last_name: 'Doe' }); // Dummy doctor
    }
  };

  return (
    <div className="space-y-4">
      <Typography variant="h5" className="text-gray-800 font-semibold">
        Symptom Checker
      </Typography>
      <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <Typography variant="h6" className="mb-4 text-gray-700">
          AI Symptom Checker
        </Typography>
        <TextField
          label="Enter your symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
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
          Check Symptoms
        </Button>
        {error && <Alert severity="error" className="mt-4">{error}</Alert>}
        {result && (
          <div className="mt-4 space-y-2">
            <Typography>Diagnosis: {result.diagnosis}</Typography>
            <Typography>Recommendation: {result.recommendation}</Typography>
            <Typography>Severity: {result.severity}</Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;