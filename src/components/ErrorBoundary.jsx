import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Oops! Something went wrong.</h1>
          <p className="text-gray-400 mb-8 max-w-md">
            Our app encountered an unexpected error. Don't worry, the system is robust. Just return to the dashboard.
          </p>
          <a href="/" className="bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
            Reload Application
          </a>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
