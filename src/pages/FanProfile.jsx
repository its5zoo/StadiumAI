import React, { useContext } from 'react';
import Card from '../components/Card';
import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';

export default function FanProfile() {
  const { user } = useContext(AuthContext);
  const { selectedLanguage, accessibilityMode } = useContext(AppContext);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-8">Fan Profile</h1>
      <Card title="Account Details" className="max-w-2xl">
        <div className="space-y-4">
          <div>
            <span className="text-gray-400 text-sm">Name</span>
            <p className="text-lg font-bold text-white">{user?.name || 'Fan'}</p>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Role</span>
            <p className="text-lg font-bold text-primary">{user?.role || 'FAN'}</p>
          </div>
        </div>
      </Card>
      
      <Card title="Preferences" className="max-w-2xl">
        <div className="space-y-4">
          <div>
            <span className="text-gray-400 text-sm">Preferred Language</span>
            <p className="text-lg font-bold text-white">{selectedLanguage}</p>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Accessibility Mode</span>
            <p className="text-lg font-bold text-white">{accessibilityMode ? 'Enabled' : 'Disabled'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
