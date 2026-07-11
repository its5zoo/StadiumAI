import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import FanDashboard from './pages/FanDashboard';
import NavigationPage from './pages/NavigationPage';
import CrowdDashboard from './pages/CrowdDashboard';
import TranslationPage from './pages/TranslationPage';
import OrganizerDashboard from './pages/OrganizerDashboard';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            
            {/* Fan and common dashboard routes */}
            <Route element={<ProtectedRoute allowedRoles={['FAN', 'ORGANIZER']} />}>
              <Route element={<DashboardLayout />}>
                <Route path="/fan" element={<FanDashboard />} />
                <Route path="/navigation" element={<NavigationPage />} />
                <Route path="/crowd" element={<CrowdDashboard />} />
                <Route path="/translate" element={<TranslationPage />} />
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
  );
}

export default App;
