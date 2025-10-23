import React from "react";
import { Link } from "react-router-dom";
import {
  PartyPopper,
  Coffee,
  Smile,
  Heart,
  Music,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

interface FunFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
  emoji: string;
}

const FunZone: React.FC = () => {
  const features: FunFeature[] = [
    {
      title: "Team Celebrations",
      description:
        "Birthdays, anniversaries, achievements, and more! Celebrate the wins together.",
      icon: <PartyPopper className="w-12 h-12" />,
      path: "/fun/celebrations",
      color: "from-pink-400 to-rose-500",
      emoji: "🎉",
    },
    {
      title: "Coffee Counter",
      description:
        "Track the fuel that powers our team! See who's the coffee champion.",
      icon: <Coffee className="w-12 h-12" />,
      path: "/fun/coffee",
      color: "from-amber-600 to-orange-700",
      emoji: "☕",
    },
    {
      title: "Meme of the Day",
      description: "Daily dose of workplace humor to brighten your day!",
      icon: <Smile className="w-12 h-12" />,
      path: "/fun/meme",
      color: "from-yellow-400 to-amber-500",
      emoji: "😄",
    },
    {
      title: "Random Acts of Kindness",
      description:
        "Track and celebrate the good deeds that make our workplace special.",
      icon: <Heart className="w-12 h-12" />,
      path: "/fun/kindness",
      color: "from-red-400 to-pink-500",
      emoji: "❤️",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Sparkles className="w-16 h-16 text-[#F5A623] animate-pulse" />
            <h1 className="text-5xl font-bold text-[#004B87]">The Fun Zone</h1>
            <Sparkles className="w-16 h-16 text-[#F5A623] animate-pulse" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Because work should be fun too! Explore our morale-boosting features
            designed to celebrate our amazing team and bring joy to the workplace.
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-4xl">
            <span className="animate-bounce">🎊</span>
            <span className="animate-bounce" style={{ animationDelay: "0.1s" }}>
              ☕
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
              😄
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.3s" }}>
              ❤️
            </span>
            <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
              🌟
            </span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => (
            <Link
              key={feature.path}
              to={feature.path}
              className="group block"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`relative bg-gradient-to-br ${feature.color} rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 overflow-hidden`}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 text-9xl opacity-10 transform translate-x-6 -translate-y-6">
                  {feature.emoji}
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-white mb-4 transform group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-white/90 text-lg">{feature.description}</p>

                  {/* Arrow indicator */}
                  <div className="mt-6 flex items-center text-white font-semibold">
                    <span>Explore</span>
                    <span className="ml-2 transform group-hover:translate-x-2 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-[#004B87] mb-8">
            <Trophy className="inline-block w-8 h-8 mr-2" />
            Fun Zone Stats
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-5xl mb-2">🎉</div>
              <div className="text-3xl font-bold text-[#004B87]">47</div>
              <div className="text-sm text-gray-600">Celebrations</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2">☕</div>
              <div className="text-3xl font-bold text-[#004B87]">8,247</div>
              <div className="text-sm text-gray-600">Cups of Coffee</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2">😄</div>
              <div className="text-3xl font-bold text-[#004B87]">247</div>
              <div className="text-sm text-gray-600">Memes Shared</div>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-2">❤️</div>
              <div className="text-3xl font-bold text-[#004B87]">183</div>
              <div className="text-sm text-gray-600">Acts of Kindness</div>
            </div>
          </div>
        </div>

        {/* Motivation Quote */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-4 border-[#F5A623]">
          <Zap className="w-12 h-12 text-[#F5A623] mx-auto mb-4" />
          <blockquote className="text-2xl font-semibold text-gray-800 mb-4">
            "The best way to predict the future is to create it together, with joy
            and kindness."
          </blockquote>
          <p className="text-gray-600">
            — Whittier First Day Team
          </p>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Have an idea for a new fun feature? We'd love to hear it!
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 font-semibold shadow-lg">
            💡 Suggest a Feature
          </button>
        </div>

        <style>{`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          .animate-bounce {
            animation: bounce 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    </DashboardLayout>
  );
};

export default FunZone;
