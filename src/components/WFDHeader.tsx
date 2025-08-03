import { Sun, Home, Mountain, Palmtree } from "lucide-react";

interface WFDHeaderProps {
  className?: string;
}

export const WFDHeader = ({ className = "" }: WFDHeaderProps) => {
  return (
    <header className={`h-header bg-white border-b border-gray-300 shadow-sm ${className}`}>
      <div className="max-w-dashboard mx-auto px-xl h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <div className="flex items-center space-x-md">
            <div className="flex items-center space-x-sm">
              <Sun className="h-10 w-10 text-wfd-gold sun-rays" />
              <div className="text-h3-card font-poppins font-bold">
                <span className="text-wfd-purple">Whittier</span>{" "}
                <span className="text-wfd-blue">First Day</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-xs ml-md text-gray-500">
              <Home className="h-5 w-5" />
              <Mountain className="h-5 w-5" />
              <Palmtree className="h-5 w-5" />
            </div>
          </div>

          {/* Navigation Center */}
          <nav className="hidden lg:flex items-center space-x-lg">
            <a href="/executive-dashboard" className="text-body-base font-medium text-wfd-purple hover:text-wfd-purple-light transition-colors">
              Executive Dashboard
            </a>
            <a href="/programs" className="text-body-base font-medium text-gray-700 hover:text-wfd-purple transition-colors">
              Programs
            </a>
            <a href="/research" className="text-body-base font-medium text-gray-700 hover:text-wfd-purple transition-colors">
              Research Export
            </a>
            <a href="/story-mode" className="text-body-base font-medium text-gray-700 hover:text-wfd-purple transition-colors">
              Story Mode
            </a>
          </nav>

          {/* User Menu Right */}
          <div className="flex items-center space-x-md">
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