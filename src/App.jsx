import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import FanDashboard from './pages/FanDashboard';
import NavigationPage from './pages/NavigationPage';
import CrowdDashboard from './pages/CrowdDashboard';
import TranslationPage from './pages/TranslationPage';
import OrganizerDashboard from './pages/OrganizerDashboard';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Dashboard Routes with Sidebar & Navbar */}
          <Route element={<DashboardLayout />}>
            <Route path="/fan" element={<FanDashboard />} />
            <Route path="/navigation" element={<NavigationPage />} />
            <Route path="/crowd" element={<CrowdDashboard />} />
            <Route path="/translate" element={<TranslationPage />} />
            <Route path="/organizer" element={<OrganizerDashboard />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
