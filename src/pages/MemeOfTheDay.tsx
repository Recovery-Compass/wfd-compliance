import React, { useState, useEffect } from "react";
import { Smile, RefreshCw, Share2, ThumbsUp, MessageCircle } from "lucide-react";
import { DashboardLayout } from "@/components/DashboardLayout";

interface Meme {
  id: string;
  title: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  category: string;
}

const MemeOfTheDay: React.FC = () => {
  const [currentMeme, setCurrentMeme] = useState<Meme | null>(null);
  const [liked, setLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // Mock meme collection - in production, these would be actual images
  const memeCollection: Meme[] = [
    {
      id: "1",
      title: "Monday Morning Mood",
      imageUrl: "/api/placeholder/600/400",
      caption: "When you realize it's Monday but coffee exists ☕",
      likes: 42,
      comments: 8,
      category: "office-life",
    },
    {
      id: "2",
      title: "Data Entry Champion",
      imageUrl: "/api/placeholder/600/400",
      caption: "Me after finishing all the data entry before 5pm 💪",
      likes: 38,
      comments: 5,
      category: "productivity",
    },
    {
      id: "3",
      title: "Meeting Survivor",
      imageUrl: "/api/placeholder/600/400",
      caption: "When the meeting could have been an email 📧",
      likes: 56,
      comments: 12,
      category: "meetings",
    },
    {
      id: "4",
      title: "Client Success",
      imageUrl: "/api/placeholder/600/400",
      caption: "Celebrating another successful housing placement! 🏠🎉",
      likes: 73,
      comments: 15,
      category: "wins",
    },
    {
      id: "5",
      title: "Team Vibes",
      imageUrl: "/api/placeholder/600/400",
      caption: "When the whole team brings their A-game 🌟",
      likes: 65,
      comments: 10,
      category: "teamwork",
    },
  ];

  useEffect(() => {
    // Load meme of the day (based on date)
    const today = new Date().getDate();
    const memeIndex = today % memeCollection.length;
    setCurrentMeme(memeCollection[memeIndex]);

    // Check if already liked today
    const likedToday = localStorage.getItem(`meme-liked-${today}`);
    setLiked(likedToday === "true");
  }, []);

  const handleLike = () => {
    if (!currentMeme) return;
    const newLiked = !liked;
    setLiked(newLiked);
    
    const today = new Date().getDate();
    localStorage.setItem(`meme-liked-${today}`, newLiked.toString());
    
    // Update like count
    setCurrentMeme({
      ...currentMeme,
      likes: currentMeme.likes + (newLiked ? 1 : -1),
    });
  };

  const handleNextMeme = () => {
    if (!currentMeme) return;
    const currentIndex = memeCollection.findIndex((m) => m.id === currentMeme.id);
    const nextIndex = (currentIndex + 1) % memeCollection.length;
    setCurrentMeme(memeCollection[nextIndex]);
    setLiked(false);
  };

  const handleShare = () => {
    setShowShare(true);
    setTimeout(() => setShowShare(false), 2000);
  };

  if (!currentMeme) return null;

  return (
    <DashboardLayout>
      <div className="p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Smile className="w-12 h-12 text-[#F5A623]" />
            <h1 className="text-4xl font-bold text-[#004B87]">Meme of the Day</h1>
            <Smile className="w-12 h-12 text-[#F5A623]" />
          </div>
          <p className="text-gray-600 text-lg">
            Your daily dose of workplace humor! 😄
          </p>
        </div>

        {/* Main Meme Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-[#F5A623]">
          {/* Meme Image Placeholder */}
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-12 text-center">
            <div className="text-8xl mb-4">
              {currentMeme.category === "office-life" && "☕"}
              {currentMeme.category === "productivity" && "💪"}
              {currentMeme.category === "meetings" && "📧"}
              {currentMeme.category === "wins" && "🏠"}
              {currentMeme.category === "teamwork" && "🌟"}
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-4">{currentMeme.title}</div>
            <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-lg">
              <p className="text-xl text-gray-700 italic">"{currentMeme.caption}"</p>
            </div>
          </div>

          {/* Meme Info and Actions */}
          <div className="p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    liked
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <ThumbsUp className={`w-5 h-5 ${liked ? "fill-current" : ""}`} />
                  <span className="font-semibold">{currentMeme.likes}</span>
                </button>

                <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">{currentMeme.comments}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="font-semibold">Share</span>
                </button>
              </div>

              <button
                onClick={handleNextMeme}
                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#004B87] text-white hover:bg-[#003366] transition-all font-semibold"
              >
                <RefreshCw className="w-5 h-5" />
                Next Meme
              </button>
            </div>

            {/* Category Badge */}
            <div className="inline-block px-3 py-1 rounded-full bg-[#F5A623] text-white text-sm font-semibold">
              #{currentMeme.category}
            </div>
          </div>
        </div>

        {/* Share Confirmation */}
        {showShare && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
            ✅ Meme shared with the team!
          </div>
        )}

        {/* Meme Categories */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { name: "Office Life", emoji: "☕", color: "from-amber-400 to-orange-500" },
            { name: "Productivity", emoji: "💪", color: "from-green-400 to-emerald-500" },
            { name: "Meetings", emoji: "📧", color: "from-blue-400 to-cyan-500" },
            { name: "Wins", emoji: "🏠", color: "from-purple-400 to-pink-500" },
            { name: "Teamwork", emoji: "🌟", color: "from-yellow-400 to-amber-500" },
          ].map((category) => (
            <div
              key={category.name}
              className={`bg-gradient-to-br ${category.color} text-white p-4 rounded-lg text-center shadow-md hover:scale-105 transition-transform cursor-pointer`}
            >
              <div className="text-3xl mb-2">{category.emoji}</div>
              <div className="text-sm font-semibold">{category.name}</div>
            </div>
          ))}
        </div>

        {/* Fun Stats */}
        <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
            😄 Laughter Statistics
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-[#004B87]">247</div>
              <div className="text-sm text-gray-600">Memes Shared</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#004B87]">1,843</div>
              <div className="text-sm text-gray-600">Total Likes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#004B87]">412</div>
              <div className="text-sm text-gray-600">Comments</div>
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className="mt-8 text-center bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Have a great meme?</h3>
          <p className="text-gray-600 mb-4">
            Share your funniest work-appropriate memes with the team!
          </p>
          <button className="px-6 py-3 bg-[#F5A623] text-white rounded-lg hover:bg-[#d68f1b] transition-all font-semibold shadow-md">
            📤 Submit Your Meme
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MemeOfTheDay;
