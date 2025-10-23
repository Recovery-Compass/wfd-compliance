import React, { useState, useEffect } from "react";
import { Heart, Plus, Award, TrendingUp, Users, Sparkles } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

interface KindnessAct {
  id: string;
  from: string;
  to: string;
  action: string;
  category: "help" | "recognition" | "support" | "surprise" | "gratitude";
  date: string;
  likes: number;
}

const RandomActsTracker: React.FC = () => {
  const [acts, setActs] = useState<KindnessAct[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAct, setNewAct] = useState({
    from: "",
    to: "",
    action: "",
    category: "recognition" as KindnessAct["category"],
  });

  useEffect(() => {
    // Mock data - in production, this would come from backend
    const mockActs: KindnessAct[] = [
      {
        id: "1",
        from: "Sarah",
        to: "Mike",
        action: "Brought extra coffee and shared with the team ☕",
        category: "surprise",
        date: new Date().toISOString(),
        likes: 12,
      },
      {
        id: "2",
        from: "Alex",
        to: "Jessica",
        action: "Helped troubleshoot a difficult case for 2 hours",
        category: "help",
        date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 18,
      },
      {
        id: "3",
        from: "Team",
        to: "David",
        action: "Celebrated his 3-year anniversary with surprise lunch! 🎉",
        category: "recognition",
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 24,
      },
      {
        id: "4",
        from: "Maria",
        to: "Everyone",
        action: "Organized a team building game during lunch break",
        category: "surprise",
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 31,
      },
      {
        id: "5",
        from: "Tom",
        to: "Sarah",
        action: "Thank you for covering my shift when I was sick! 🙏",
        category: "gratitude",
        date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
        likes: 15,
      },
    ];
    setActs(mockActs);
  }, []);

  const getCategoryIcon = (category: KindnessAct["category"]) => {
    switch (category) {
      case "help":
        return "🤝";
      case "recognition":
        return "🏆";
      case "support":
        return "💪";
      case "surprise":
        return "🎁";
      case "gratitude":
        return "🙏";
      default:
        return "❤️";
    }
  };

  const getCategoryColor = (category: KindnessAct["category"]) => {
    switch (category) {
      case "help":
        return "from-blue-400 to-cyan-500";
      case "recognition":
        return "from-yellow-400 to-amber-500";
      case "support":
        return "from-green-400 to-emerald-500";
      case "surprise":
        return "from-purple-400 to-pink-500";
      case "gratitude":
        return "from-red-400 to-rose-500";
      default:
        return "from-gray-400 to-gray-500";
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
    return date.toLocaleDateString();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newKindness: KindnessAct = {
      id: Date.now().toString(),
      ...newAct,
      date: new Date().toISOString(),
      likes: 0,
    };
    setActs([newKindness, ...acts]);
    setNewAct({ from: "", to: "", action: "", category: "recognition" });
    setShowAddForm(false);
  };

  const handleLike = (id: string) => {
    setActs(
      acts.map((act) =>
        act.id === id ? { ...act, likes: act.likes + 1 } : act
      )
    );
  };

  const totalActs = acts.length;
  const totalLikes = acts.reduce((sum, act) => sum + act.likes, 0);
  const topCategory = acts.reduce((acc, act) => {
    acc[act.category] = (acc[act.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const mostPopularCategory = Object.keys(topCategory).reduce((a, b) =>
    topCategory[a] > topCategory[b] ? a : b
  );

  return (
    <DashboardLayout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-12 h-12 text-red-500 fill-current" />
            <h1 className="text-4xl font-bold text-[#004B87]">
              Random Acts of Kindness
            </h1>
            <Heart className="w-12 h-12 text-red-500 fill-current" />
          </div>
          <p className="text-gray-600 text-lg">
            Celebrating the good deeds that make our workplace special! ❤️
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-pink-50 to-red-100 rounded-xl p-6 text-center shadow-lg">
            <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-[#004B87]">{totalActs}</div>
            <div className="text-sm text-gray-600 mt-1">Acts of Kindness</div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-6 text-center shadow-lg">
            <TrendingUp className="w-8 h-8 text-amber-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-[#004B87]">{totalLikes}</div>
            <div className="text-sm text-gray-600 mt-1">Total Appreciation</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl p-6 text-center shadow-lg">
            <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-[#004B87]">
              {getCategoryIcon(mostPopularCategory as KindnessAct["category"])}
            </div>
            <div className="text-sm text-gray-600 mt-1 capitalize">
              Top: {mostPopularCategory}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl p-6 text-center shadow-lg">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-3xl font-bold text-[#004B87]">
              {new Set(acts.map((a) => a.from)).size}
            </div>
            <div className="text-sm text-gray-600 mt-1">Kind People</div>
          </div>
        </div>

        {/* Add New Act Button */}
        <div className="mb-6 text-center">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-xl hover:from-pink-600 hover:to-red-600 transition-all transform hover:scale-105 font-semibold shadow-lg flex items-center gap-2 mx-auto"
          >
            <Plus className="w-5 h-5" />
            {showAddForm ? "Cancel" : "Add Act of Kindness"}
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border-2 border-[#F5A623]">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Share a kind act! ✨
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    From
                  </label>
                  <input
                    type="text"
                    value={newAct.from}
                    onChange={(e) => setNewAct({ ...newAct, from: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    To
                  </label>
                  <input
                    type="text"
                    value={newAct.to}
                    onChange={(e) => setNewAct({ ...newAct, to: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                    placeholder="Recipient name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newAct.category}
                  onChange={(e) =>
                    setNewAct({
                      ...newAct,
                      category: e.target.value as KindnessAct["category"],
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                >
                  <option value="help">🤝 Help</option>
                  <option value="recognition">🏆 Recognition</option>
                  <option value="support">💪 Support</option>
                  <option value="surprise">🎁 Surprise</option>
                  <option value="gratitude">🙏 Gratitude</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  What happened?
                </label>
                <textarea
                  value={newAct.action}
                  onChange={(e) => setNewAct({ ...newAct, action: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#F5A623] focus:border-transparent"
                  placeholder="Describe the act of kindness..."
                  rows={3}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#004B87] text-white rounded-lg hover:bg-[#003366] transition-all font-semibold"
              >
                ✨ Share This Kindness
              </button>
            </form>
          </div>
        )}

        {/* Acts Feed */}
        <div className="space-y-4">
          {acts.map((act) => (
            <div
              key={act.id}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-[#F5A623] transition-all"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${getCategoryColor(
                    act.category
                  )} flex items-center justify-center text-3xl`}
                >
                  {getCategoryIcon(act.category)}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="font-bold text-[#004B87]">{act.from}</span>
                      <span className="text-gray-600 mx-2">→</span>
                      <span className="font-semibold text-gray-800">{act.to}</span>
                    </div>
                    <span className="text-sm text-gray-500">{formatDate(act.date)}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{act.action}</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleLike(act.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                      <span className="font-semibold">{act.likes}</span>
                    </button>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-semibold capitalize">
                      {act.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Kindness Wall of Fame */}
        <div className="mt-12 bg-gradient-to-br from-yellow-50 to-amber-100 rounded-xl p-8 text-center">
          <Sparkles className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            💫 Making Kindness Contagious
          </h3>
          <p className="text-gray-700">
            Every act of kindness creates a ripple effect that makes our workplace better
            for everyone. Keep spreading the love! ❤️
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RandomActsTracker;
