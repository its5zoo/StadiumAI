import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Navbar({ toggleSidebar }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-dark border-b border-gray-800 p-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-white lg:hidden">
          <Menu size={24} />
        </button>
        <Link to="/" className="text-xl font-bold text-primary">MatchDay AI</Link>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden sm:block">{user.name} ({user.role})</span>
            <button onClick={handleLogout} className="text-gray-400 hover:text-white transition-colors" title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        ) : (
          <span className="text-sm text-gray-400 hidden sm:block">Phase 4 Security</span>
        )}
      </div>
    </nav>
  );
}
