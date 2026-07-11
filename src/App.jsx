import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import MatchSelection from './pages/MatchSelection';
import RoleSelection from './pages/RoleSelection';
import FanDashboard from './pages/FanDashboard';
import FanAssistant from './pages/FanAssistant';
import FanMap from './pages/FanMap';
import OrganizerDashboard from './pages/OrganizerDashboard';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppProvider>
          <Router>
            <Toaster position="top-right" toastOptions={{ style: { background: '#1e293b', color: '#fff' } }} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/matches" element={<MatchSelection />} />
              <Route path="/select-role" element={<RoleSelection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Fan and common dashboard routes */}
            <Route element={<ProtectedRoute allowedRoles={['FAN', 'ORGANIZER']} />}>
              <Route element={<DashboardLayout />}>
                <Route path="/fan" element={<Navigate to="/fan/dashboard" replace />} />
                <Route path="/fan/dashboard" element={<FanDashboard />} />
                <Route path="/fan/map" element={<FanMap />} />
                <Route path="/fan/assistant" element={<FanAssistant />} />
              </Route>
            </Route>

            {/* Organizer only routes */}
            <Route element={<ProtectedRoute allowedRoles={['ORGANIZER']} />}>
              <Route element={<DashboardLayout />}>
                <Route path="/organizer" element={<OrganizerDashboard />} />
              </Route>
            </Route>

          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
