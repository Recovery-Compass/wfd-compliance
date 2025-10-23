import React, { useState, useEffect } from "react";
import { Coffee, TrendingUp, Users, Zap, Award } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

interface CoffeeStats {
  today: number;
  week: number;
  month: number;
  allTime: number;
  topConsumer: { name: string; count: number };
  teamAverage: number;
}

const CoffeeCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [stats, setStats] = useState<CoffeeStats>({
    today: 23,
    week: 156,
    month: 642,
    allTime: 8247,
    topConsumer: { name: "Alex", count: 847 },
    teamAverage: 3.2,
  });
  const [showAnimation, setShowAnimation] = useState(false);
  const [caffeineLevel, setCaffeineLevel] = useState(0);

  useEffect(() => {
    // Load saved count from localStorage
    const saved = localStorage.getItem("wfd-coffee-count");
    if (saved) {
      setCount(parseInt(saved));
    }
  }, []);

  useEffect(() => {
    // Calculate caffeine level (max at 10 cups)
    const level = Math.min((count / 10) * 100, 100);
    setCaffeineLevel(level);
  }, [count]);

  const addCoffee = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem("wfd-coffee-count", newCount.toString());
    
    setStats((prev) => ({
      ...prev,
      today: prev.today + 1,
      week: prev.week + 1,
      month: prev.month + 1,
      allTime: prev.allTime + 1,
    }));

    // Trigger animation
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 500);
  };

  const resetCount = () => {
    if (window.confirm("Reset your coffee count?")) {
      setCount(0);
      localStorage.setItem("wfd-coffee-count", "0");
    }
  };

  const getCaffeineMessage = () => {
    if (caffeineLevel < 20) return "☕ Time for coffee!";
    if (caffeineLevel < 40) return "😊 Nicely caffeinated";
    if (caffeineLevel < 60) return "🚀 Productive mode activated";
    if (caffeineLevel < 80) return "⚡ High energy!";
    return "🌟 Maximum caffeine achieved!";
  };

  const getFunFact = () => {
    const facts = [
      "Coffee is the world's 2nd most traded commodity after oil!",
      "The average American drinks 3.1 cups of coffee per day",
      "Coffee beans are actually seeds from coffee cherries",
      "The word 'coffee' comes from the Arabic word 'qahwah'",
      "Finland consumes the most coffee per capita in the world",
      "Coffee can help improve physical performance by up to 12%",
      "Dark roast coffee has LESS caffeine than light roast",
      "The world drinks 2.25 billion cups of coffee every day",
    ];
    return facts[Math.floor(Math.random() * facts.length)];
  };

  const [funFact] = useState(getFunFact());

  return (
    <DashboardLayout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Coffee className="w-12 h-12 text-[#6B4423]" />
            <h1 className="text-4xl font-bold text-[#004B87]">Coffee Counter</h1>
            <Coffee className="w-12 h-12 text-[#6B4423]" />
          </div>
          <p className="text-gray-600 text-lg">
            Track the fuel that powers our amazing team! ☕
          </p>
        </div>

        {/* Main Counter */}
        <div className="mb-8 text-center">
          <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl p-12 shadow-xl border-4 border-[#F5A623] relative overflow-hidden">
            {showAnimation && (
              <div className="absolute inset-0 bg-white opacity-50 animate-pulse pointer-events-none" />
            )}
            <div className="mb-6">
              <Coffee className={`w-32 h-32 mx-auto text-[#6B4423] ${showAnimation ? "animate-bounce" : ""}`} />
            </div>
            <div className="text-8xl font-bold text-[#004B87] mb-4">{count}</div>
            <div className="text-2xl text-gray-700 mb-6">Cups Today</div>
            
            {/* Caffeine Level Bar */}
            <div className="max-w-md mx-auto mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{getCaffeineMessage()}</span>
                <span>{caffeineLevel.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 transition-all duration-500 ease-out"
                  style={{ width: `${caffeineLevel}%` }}
                />
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={addCoffee}
                className="px-8 py-4 bg-[#6B4423] text-white rounded-xl hover:bg-[#4a2f18] transition-all transform hover:scale-105 font-bold text-xl shadow-lg"
              >
                ☕ Add Coffee
              </button>
              <button
                onClick={resetCount}
                className="px-6 py-4 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-all font-semibold"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-[#F5A623] transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Coffee className="w-6 h-6 text-orange-500" />
              <h3 className="font-semibold text-gray-700">Today</h3>
            </div>
            <div className="text-3xl font-bold text-[#004B87]">{stats.today}</div>
            <div className="text-sm text-gray-500 mt-1">cups consumed</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-[#F5A623] transition-all">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-6 h-6 text-green-500" />
              <h3 className="font-semibold text-gray-700">This Week</h3>
            </div>
            <div className="text-3xl font-bold text-[#004B87]">{stats.week}</div>
            <div className="text-sm text-gray-500 mt-1">cups consumed</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-[#F5A623] transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="w-6 h-6 text-yellow-500" />
              <h3 className="font-semibold text-gray-700">This Month</h3>
            </div>
            <div className="text-3xl font-bold text-[#004B87]">{stats.month}</div>
            <div className="text-sm text-gray-500 mt-1">cups consumed</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-[#F5A623] transition-all">
            <div className="flex items-center gap-3 mb-3">
              <Award className="w-6 h-6 text-purple-500" />
              <h3 className="font-semibold text-gray-700">All Time</h3>
            </div>
            <div className="text-3xl font-bold text-[#004B87]">{stats.allTime}</div>
            <div className="text-sm text-gray-500 mt-1">cups consumed</div>
          </div>
        </div>

        {/* Leaderboard and Fun Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Top Consumer */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-8 h-8 text-amber-600" />
              <h3 className="text-xl font-bold text-gray-800">☕ Coffee Champion</h3>
            </div>
            <div className="text-center py-6">
              <div className="text-5xl mb-3">🏆</div>
              <div className="text-2xl font-bold text-[#004B87]">{stats.topConsumer.name}</div>
              <div className="text-gray-600 mt-2">
                {stats.topConsumer.count} cups this month
              </div>
            </div>
          </div>

          {/* Team Average */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-800">Team Average</h3>
            </div>
            <div className="text-center py-6">
              <div className="text-5xl mb-3">☕</div>
              <div className="text-2xl font-bold text-[#004B87]">
                {stats.teamAverage} cups
              </div>
              <div className="text-gray-600 mt-2">per person per day</div>
            </div>
          </div>
        </div>

        {/* Fun Fact */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-2">☕ Coffee Fun Fact</h3>
          <p className="text-gray-700">{funFact}</p>
        </div>

        {/* Coffee Types */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Espresso", emoji: "☕", color: "from-stone-600 to-stone-800" },
            { name: "Latte", emoji: "🥛", color: "from-amber-200 to-amber-400" },
            { name: "Cappuccino", emoji: "☕", color: "from-orange-300 to-orange-500" },
            { name: "Cold Brew", emoji: "🧊", color: "from-blue-400 to-blue-600" },
          ].map((type) => (
            <button
              key={type.name}
              onClick={addCoffee}
              className={`bg-gradient-to-br ${type.color} text-white p-4 rounded-lg hover:scale-105 transition-transform font-semibold shadow-md`}
            >
              <div className="text-3xl mb-2">{type.emoji}</div>
              <div className="text-sm">{type.name}</div>
            </button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CoffeeCounter;
