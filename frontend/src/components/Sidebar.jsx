import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  Map, Settings, X, LayoutDashboard, BotMessageSquare,
  Cpu, TrendingUp, Rocket, Radio, AlertOctagon, BarChart3,
  User, ShieldCheck, Zap
} from 'lucide-react';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const { user } = useContext(AuthContext);

  const fanLinks = [
    { to: "/fan/dashboard",   icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { to: "/fan/map",         icon: <Map size={18} />,             label: "Smart Map" },
    { to: "/fan/assistant",   icon: <BotMessageSquare size={18} />, label: "AI Assistant" },
    { to: "/fan/profile",     icon: <User size={18} />,            label: "Profile" },
  ];

  const organizerLinks = [
    { to: "/organizer/dashboard",      icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { to: "/organizer/control-center", icon: <ShieldCheck size={18} />,     label: "Command Center" },
    { to: "/organizer/heatmap",        icon: <Map size={18} />,             label: "Live Heatmap" },
    { to: "/organizer/incidents",      icon: <AlertOctagon size={18} />,    label: "Incidents" },
    { to: "/organizer/broadcast",      icon: <Radio size={18} />,           label: "Broadcast" },
    { to: "/organizer/analytics",      icon: <BarChart3 size={18} />,       label: "Analytics" },
  ];

  const demoLinks = [
    { to: "/architecture",  icon: <Cpu size={18} />,       label: "Architecture" },
    { to: "/statistics",    icon: <TrendingUp size={18} />, label: "Statistics" },
    { to: "/future-scope",  icon: <Rocket size={18} />,     label: "Future Scope" },
  ];

  const links = user?.role === 'ORGANIZER' ? organizerLinks : fanLinks;
  const roleLabel = user?.role === 'ORGANIZER' ? 'Organizer Portal' : 'Fan Portal';
  const roleColor = user?.role === 'ORGANIZER' ? '#f59e0b' : '#3b82f6';

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 glass-sidebar
        flex flex-col
        transform transition-transform duration-300 ease-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Mobile header */}
        <div className="flex justify-between items-center p-4 lg:hidden" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }}>
              <Zap size={12} className="text-white" />
            </div>
            <span className="font-bold text-sm gradient-text">MatchDay AI</span>
          </div>
          <button onClick={toggleSidebar} className="text-subtle hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Role Badge */}
          {user && (
            <div className="px-3 py-2 rounded-xl text-center" style={{ background: `${roleColor}10`, border: `1px solid ${roleColor}20` }}>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: roleColor }}>{roleLabel}</p>
            </div>
          )}

          {/* Main Links */}
          <div className="space-y-1">
            <p className="section-title px-3 mb-3">Navigation</p>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => { if (window.innerWidth < 1024) toggleSidebar(); }}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="shrink-0">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>

          {/* Demo Links */}
          <div className="space-y-1">
            <p className="section-title px-3 mb-3">Demo</p>
            {demoLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => { if (window.innerWidth < 1024) toggleSidebar(); }}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <span className="shrink-0">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-2 px-3 py-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-xs text-subtle">All systems operational</span>
          </div>
        </div>
      </aside>
    </>
  );
}
