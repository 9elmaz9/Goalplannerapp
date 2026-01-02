import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Trophy, Target, Sparkles } from "lucide-react";
import { GoalCard } from "./components/GoalCard";
import { AddGoalModal } from "./components/AddGoalModal";
import { CelebrationAnimation } from "./components/CelebrationAnimation";

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  color: string;
}

export default function App() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Run a Marathon",
      description: "Complete a full 42km marathon by the end of the year",
      category: "Health & Fitness",
      completed: false,
      color: "from-purple-500 via-pink-500 to-red-500"
    },
    {
      id: "2",
      title: "Learn a New Language",
      description: "Achieve conversational fluency in Spanish",
      category: "Learning",
      completed: false,
      color: "from-blue-500 via-cyan-500 to-teal-500"
    },
    {
      id: "3",
      title: "Start a Side Business",
      description: "Launch an online store and generate first revenue",
      category: "Career",
      completed: false,
      color: "from-orange-500 via-amber-500 to-yellow-500"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const toggleGoal = (id: string) => {
    setGoals(prevGoals => {
      const updatedGoals = prevGoals.map(goal => {
        if (goal.id === id) {
          const newCompleted = !goal.completed;
          // Show celebration only when marking as completed
          if (newCompleted) {
            setShowCelebration(true);
          }
          return { ...goal, completed: newCompleted };
        }
        return goal;
      });
      return updatedGoals;
    });
  };

  const addGoal = (goalData: {
    title: string;
    description: string;
    category: string;
    color: string;
  }) => {
    const newGoal: Goal = {
      id: Date.now().toString(),
      ...goalData,
      completed: false
    };
    setGoals(prev => [newGoal, ...prev]);
  };

  const filteredGoals = goals.filter(goal => {
    if (filter === "active") return !goal.completed;
    if (filter === "completed") return goal.completed;
    return true;
  });

  const completedCount = goals.filter(g => g.completed).length;
  const totalCount = goals.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-auto">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0.1
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Sparkles className="text-white w-4 h-4" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Trophy className="w-16 h-16 text-yellow-400" />
            <h1 className="text-6xl font-bold text-white">
              2026 Goals
            </h1>
            <Target className="w-16 h-16 text-pink-400" />
          </div>
          <p className="text-xl text-white/80">
            Make this year your best year yet! 🌟
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-semibold">Your Progress</span>
            <span className="text-white font-bold text-xl">
              {completedCount} / {totalCount}
            </span>
          </div>
          <div className="relative h-6 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <p className="text-white/70 text-sm mt-2 text-center">
            {progress.toFixed(0)}% Complete
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex gap-3 mb-8 justify-center">
          {(["all", "active", "completed"] as const).map((f) => (
            <motion.button
              key={f}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                filter === f
                  ? "bg-white text-purple-900 shadow-lg"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Goals Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onToggle={toggleGoal}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Add Goal Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="fixed bottom-8 right-8"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsModalOpen(true)}
            className="p-6 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 text-white rounded-full shadow-2xl hover:shadow-pink-500/50 transition-shadow"
          >
            <Plus className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </div>

      {/* Add Goal Modal */}
      <AddGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addGoal}
      />

      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <CelebrationAnimation
            onComplete={() => setShowCelebration(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
