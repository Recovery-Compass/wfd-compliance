import { Sun, Home, Mountain, Palmtree } from "lucide-react";

interface WFDHeaderProps {
  className?: string;
}

export const WFDHeader = ({ className = "" }: WFDHeaderProps) => {
  return (
    <header className={`bg-gradient-to-r from-wfd-purple to-wfd-purple-light text-white py-lg px-xl ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-md">
            <div className="flex items-center space-x-xs">
              <Sun className="h-8 w-8 text-wfd-gold sun-rays" />
              <div className="text-h2-section font-poppins">
                <span className="text-white">First</span>{" "}
                <span className="text-wfd-blue">Day</span>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-xs ml-sm">
              <Home className="h-5 w-5 text-wfd-gold" />
              <Mountain className="h-5 w-5 text-white" />
              <Palmtree className="h-5 w-5 text-wfd-blue" />
            </div>
          </div>

          {/* Tagline */}
          <div className="hidden lg:block text-right">
            <h1 className="text-h3-card font-semibold">Compliance Dashboard</h1>
            <p className="text-wfd-gold text-body-base italic">Every day is a first day</p>
          </div>
        </div>

        {/* Subtitle */}
        <div className="mt-sm text-center">
          <h2 className="text-body-large font-medium text-wfd-gold">
            Whittier First Day - Building Homes, Building Hope
          </h2>
          <p className="text-wfd-blue-light text-body-base">
            California's pathway to compliance excellence
          </p>
        </div>
      </div>
    </header>
  );
};