import React from 'react';
import { Link } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-dark flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h1>
      <p className="text-gray-400 mb-8 max-w-md">
        You do not have the required permissions to view this page. If you believe this is an error, please contact administration.
      </p>
      <Link 
        to="/"
        className="bg-primary hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}
