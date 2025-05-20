import React from 'react';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { dummyFAQs } from '../data/dummyData';

const FAQs = () => {
  return (
    <div className="space-y-4">
      <Typography variant="h5" className="text-gray-800 font-semibold">
        Frequently Asked Questions
      </Typography>
      <div className="p-4 bg-white rounded-lg shadow-md border border-gray-200">
        {dummyFAQs.map((faq, index) => (
          <Accordion key={index} className="mb-2">
            <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-50">
              <Typography>{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default FAQs;