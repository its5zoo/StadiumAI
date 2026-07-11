import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Compass, Users, Globe, Settings, X } from 'lucide-react';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const links = [
    { to: "/fan", icon: <Home size={20} />, label: "Fan Dashboard" },
    { to: "/navigation", icon: <Compass size={20} />, label: "Navigation" },
    { to: "/crowd", icon: <Users size={20} />, label: "Crowd Intel" },
    { to: "/translate", icon: <Globe size={20} />, label: "Translator" },
    { to: "/organizer", icon: <Settings size={20} />, label: "Organizer" },
  ];

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
