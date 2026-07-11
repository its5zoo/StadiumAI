import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

export default function Navbar({ toggleSidebar }) {
  return (
    <nav className="bg-dark border-b border-gray-800 p-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-white lg:hidden">
          <Menu size={24} />
        </button>
        <Link to="/" className="text-xl font-bold text-primary">MatchDay AI</Link>
      </div>
      <div className="flex items-center gap-4">
        {/* Placeholder for future features like language select or profile */}
        <span className="text-sm text-gray-400 hidden sm:block">Phase 1 UI</span>
      </div>
    </nav>
  );
}
