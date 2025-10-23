import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Home, Users, BarChart3, CheckCircle } from "lucide-react";

export function BrandShell({ children }: {children: React.ReactNode}) {
  const location = useLocation();
  
  const navItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/compliance/clients", label: "Clients", icon: Users },
    { path: "/compliance/programs", label: "Programs", icon: BarChart3 },
    { path: "/compliance/quality", label: "Quality", icon: CheckCircle },
  ];
  
  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="bg-rc-water" style={{ minHeight: "100vh" }}>
      <div className="bg-rc-mid">
        <header className="w-full">
          <div className="mx-auto maxw-6xl px-4 py-3">
            <div className="flex items-center justify-between mb-3">
              <img src="/whittier-first-day-logo.png" alt="Whittier First Day" style={{ height: 32 }} />
              <div className="rc-nameplate">RECOVERY COMPASS</div>
            </div>
            
            {/* Navigation Menu */}
            <nav className="flex items-center gap-1 overflow-x-auto pb-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap text-sm
                      ${
                        isActive(item.path)
                          ? "bg-[#004B87] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              {/* Fun Zone Button - Special Styling */}
              <Link
                to="/fun"
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap text-sm
                  ${
                    location.pathname.startsWith("/fun")
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 hover:from-purple-200 hover:to-pink-200"
                  }
                  border-2 border-purple-500 ml-2
                `}
              >
                <Sparkles className="w-4 h-4" />
                <span>Fun Zone</span>
                <span className="text-lg">✨</span>
              </Link>
            </nav>
          </div>
        </header>
      </div>
      <main className="mx-auto maxw-6xl p-4">{children}</main>
    </div>
  );
}