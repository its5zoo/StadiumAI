import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider, AppContext } from './context/AppContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
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
import FanProfile from './pages/FanProfile';
import OrganizerDashboard from './pages/OrganizerDashboard';
import OrganizerHeatmap from './pages/OrganizerHeatmap';
import OrganizerCommandCenter from './pages/OrganizerCommandCenter';
import OrganizerIncidents from './pages/OrganizerIncidents';
import OrganizerBroadcast from './pages/OrganizerBroadcast';
import OrganizerAnalytics from './pages/OrganizerAnalytics';

function AppContent() {
  const { accessibilityMode } = useContext(AppContext);
  
  return (
    <div className={`min-h-screen bg-dark text-gray-200 flex flex-col font-sans ${accessibilityMode ? 'text-lg contrast-125' : ''}`}>
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
              <Route path="/fan/profile" element={<FanProfile />} />
            </Route>
          </Route>

          {/* Organizer only routes */}
          <Route element={<ProtectedRoute allowedRoles={['ORGANIZER']} />}>
            <Route element={<DashboardLayout />}>
              <Route path="/organizer" element={<Navigate to="/organizer/dashboard" replace />} />
              <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
              <Route path="/organizer/heatmap" element={<OrganizerHeatmap />} />
              <Route path="/organizer/control-center" element={<OrganizerCommandCenter />} />
              <Route path="/organizer/incidents" element={<OrganizerIncidents />} />
              <Route path="/organizer/broadcast" element={<OrganizerBroadcast />} />
              <Route path="/organizer/analytics" element={<OrganizerAnalytics />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
