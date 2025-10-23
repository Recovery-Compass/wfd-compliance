import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, BarChart3, CheckCircle, Sparkles } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { path: "/compliance/clients", label: "Clients", icon: <Users className="w-5 h-5" /> },
    { path: "/compliance/programs", label: "Programs", icon: <BarChart3 className="w-5 h-5" /> },
    { path: "/compliance/quality", label: "Quality", icon: <CheckCircle className="w-5 h-5" /> },
    { path: "/fun", label: "Fun Zone", icon: <Sparkles className="w-5 h-5" />, special: true },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#004B87] text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="text-3xl font-bold">WFD</div>
              <div className="text-xl">Whittier First Day Dashboard</div>
            </Link>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-2 px-4 py-3 font-semibold transition-all whitespace-nowrap
                  ${
                    isActive(item.path)
                      ? item.special
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        : "bg-[#004B87] text-white"
                      : item.special
                      ? "text-purple-600 hover:bg-purple-50"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                  ${item.special ? "border-2 border-purple-500 rounded-lg mx-2" : ""}
                `}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.special && <span className="text-xl ml-1">✨</span>}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-140px)]">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Whittier First Day. Making a difference
            together. ❤️
          </p>
        </div>
      </footer>
    </div>
  );
};
