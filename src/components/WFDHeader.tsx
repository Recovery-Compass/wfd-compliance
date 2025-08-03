import { Sun, Home, Mountain, Palmtree } from "lucide-react";
import { Link } from "react-router-dom";

interface WFDHeaderProps {
  className?: string;
}

export const WFDHeader = ({ className = "" }: WFDHeaderProps) => {
  return (
    <header className={`h-16 md:h-header bg-white border-b border-gray-300 shadow-sm ${className}`}>
      <div className="max-w-dashboard mx-auto px-4 md:px-xl h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section - Mobile Optimized */}
          <div className="flex items-center space-x-2 md:space-x-md">
            <div className="flex items-center space-x-2 md:space-x-sm">
              <Sun className="h-8 w-8 md:h-10 md:w-10 text-wfd-gold sun-rays" />
              <div className="text-lg md:text-h3-card font-poppins font-bold">
                <span className="text-wfd-purple">Whittier</span>{" "}
                <span className="text-wfd-blue hidden sm:inline">First Day</span>
                <span className="text-wfd-blue sm:hidden">FD</span>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-xs ml-md text-gray-500">
              <Home className="h-5 w-5" />
              <Mountain className="h-5 w-5" />
              <Palmtree className="h-5 w-5" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/executive-dashboard" className="text-body-base font-medium text-wfd-purple hover:text-wfd-purple-light transition-colors px-3 py-2 rounded-md">
              Executive Dashboard
            </Link>
            <Link to="/programs" className="text-body-base font-medium text-gray-700 hover:text-wfd-purple transition-colors px-3 py-2 rounded-md">
              Programs
            </Link>
            <Link to="/research" className="text-body-base font-medium text-gray-700 hover:text-wfd-purple transition-colors px-3 py-2 rounded-md">
              Research Export
            </Link>
            <Link to="/story-mode" className="text-body-base font-medium text-gray-700 hover:text-wfd-purple transition-colors px-3 py-2 rounded-md">
              Story Mode
            </Link>
          </nav>

          {/* User Menu - Mobile Optimized */}
          <div className="hidden lg:flex items-center space-x-md">
            <div className="hidden md:block text-right">
              <div className="text-body-base font-semibold text-gray-900">Donna Gallup</div>
              <div className="text-label text-gray-500">Administrator</div>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-wfd-purple to-wfd-blue rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-body-base">DG</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};