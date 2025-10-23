import React, { useState, useEffect } from "react";
import { PartyPopper, Cake, Trophy, Heart, Star, Sparkles } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

interface Celebration {
  id: string;
  type: "birthday" | "anniversary" | "milestone" | "achievement" | "kudos";
  title: string;
  description: string;
  person: string;
  date: string;
  icon?: string;
}

const TeamCelebrations: React.FC = () => {
  const [celebrations, setCelebrations] = useState<Celebration[]>([]);
  const [confettiActive, setConfettiActive] = useState(false);

  // Mock data - in production, this would come from a backend or JSON file
  useEffect(() => {
    const mockCelebrations: Celebration[] = [
      {
        id: "1",
        type: "birthday",
        title: "🎂 Happy Birthday!",
        description: "Wishing you an amazing day filled with joy!",
        person: "Sarah",
        date: new Date().toISOString(),
      },
      {
        id: "2",
        type: "anniversary",
        title: "🎉 5 Years at WFD!",
        description: "Celebrating 5 incredible years of dedication and impact!",
        person: "Michael",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "3",
        type: "milestone",
        title: "🏆 1000th Client Served!",
        description: "We've reached an incredible milestone together!",
        person: "Team",
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "4",
        type: "achievement",
        title: "⭐ Employee of the Month",
        description: "Outstanding performance and dedication!",
        person: "Jessica",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "5",
        type: "kudos",
        title: "❤️ Kudos for Amazing Teamwork",
        description: "Your collaboration on the recent project was outstanding!",
        person: "David & Team",
        date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
    setCelebrations(mockCelebrations);
  }, []);

  const getIcon = (type: Celebration["type"]) => {
    switch (type) {
      case "birthday":
        return <Cake className="w-8 h-8 text-pink-500" />;
      case "anniversary":
        return <Star className="w-8 h-8 text-yellow-500" />;
      case "milestone":
        return <Trophy className="w-8 h-8 text-amber-600" />;
      case "achievement":
        return <Sparkles className="w-8 h-8 text-purple-500" />;
      case "kudos":
        return <Heart className="w-8 h-8 text-red-500" />;
      default:
        return <PartyPopper className="w-8 h-8 text-blue-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const triggerConfetti = () => {
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <PartyPopper className="w-12 h-12 text-[#F5A623]" />
            <h1 className="text-4xl font-bold text-[#004B87]">Team Celebrations</h1>
            <PartyPopper className="w-12 h-12 text-[#F5A623]" />
          </div>
          <p className="text-gray-600 text-lg">
            Celebrating our amazing team and their achievements!
          </p>
          <button
            onClick={triggerConfetti}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full hover:from-pink-600 hover:to-purple-600 transition-all transform hover:scale-105 font-semibold shadow-lg"
          >
            🎊 Celebrate! 🎊
          </button>
        </div>

        {/* Confetti Effect */}
        {confettiActive && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-10%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <div
                  className="w-3 h-3"
                  style={{
                    backgroundColor: ["#F5A623", "#004B87", "#E53E3E", "#38A169", "#D69E2E"][
                      Math.floor(Math.random() * 5)
                    ],
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Celebrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {celebrations.map((celebration) => (
            <div
              key={celebration.id}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-[#F5A623] transition-all hover:shadow-xl transform hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">{getIcon(celebration.type)}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {celebration.title}
                  </h3>
                  <p className="text-lg font-semibold text-[#004B87] mb-2">
                    {celebration.person}
                  </p>
                  <p className="text-gray-600 mb-3">{celebration.description}</p>
                  <p className="text-sm text-gray-500">{formatDate(celebration.date)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Celebration Button */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-[#004B87] text-white rounded-lg hover:bg-[#003366] transition-colors font-semibold shadow-md">
            ➕ Add New Celebration
          </button>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-pink-600">
              {celebrations.filter((c) => c.type === "birthday").length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Birthdays This Month</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-yellow-600">
              {celebrations.filter((c) => c.type === "anniversary").length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Work Anniversaries</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600">
              {celebrations.filter((c) => c.type === "achievement").length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Recent Achievements</div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-red-600">
              {celebrations.filter((c) => c.type === "kudos").length}
            </div>
            <div className="text-sm text-gray-600 mt-1">Kudos Given</div>
          </div>
        </div>

        <style>{`
          @keyframes confetti {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(720deg);
              opacity: 0;
            }
          }
          .animate-confetti {
            animation: confetti linear forwards;
          }
        `}</style>
      </div>
    </DashboardLayout>
  );
};

export default TeamCelebrations;
