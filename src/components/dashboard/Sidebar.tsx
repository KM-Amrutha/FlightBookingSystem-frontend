import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Providers", path: "/admin/providers", icon: "✈️" },
    { name: "Users", path: "/admin/users", icon: "👥" },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-700 p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Skylife</h2>
        <p className="text-slate-400 text-sm">Admin Panel</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="font-semibold">{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
