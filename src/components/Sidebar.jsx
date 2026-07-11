import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Map, Settings, X, LayoutDashboard, BotMessageSquare } from 'lucide-react';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const { user } = useContext(AuthContext);
  
  const fanLinks = [
    { to: "/fan/dashboard", icon: <LayoutDashboard size={20} />, label: "Fan Dashboard" },
    { to: "/fan/map", icon: <Map size={20} />, label: "Smart Map" },
    { to: "/fan/assistant", icon: <BotMessageSquare size={20} />, label: "Unified AI" },
    { to: "/fan/profile", icon: <Settings size={20} />, label: "Profile" },
  ];

  const organizerLinks = [
    { to: "/organizer", icon: <Settings size={20} />, label: "Control Center" },
  ];

  const links = user?.role === 'ORGANIZER' ? organizerLinks : fanLinks;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-dark border-r border-gray-800 
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="p-4 flex justify-between items-center lg:hidden border-b border-gray-800">
          <span className="font-bold text-primary">Menu</span>
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        
        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <NavLink 
              key={link.to} 
              to={link.to}
              onClick={() => {
                if (window.innerWidth < 1024) toggleSidebar();
              }}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${isActive ? "bg-primary text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}
              `}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
