import React from 'react';
import { Typography, Button } from '@mui/material';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <Typography variant="h5" color="error">
            Something went wrong.
          </Typography>
          <Typography className="mt-2">
            An unexpected error occurred. Please try again.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Reload Page
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;