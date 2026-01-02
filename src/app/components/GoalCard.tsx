import { motion } from "motion/react";
import { Check, Circle, Target, Sparkles } from "lucide-react";
import { useState } from "react";

interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  color: string;
}

interface GoalCardProps {
  goal: Goal;
  onToggle: (id: string) => void;
}

export function GoalCard({ goal, onToggle }: GoalCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
        goal.completed 
          ? 'bg-gradient-to-br from-green-500/20 via-emerald-500/20 to-teal-500/20 border-2 border-green-400/50'
          : `bg-gradient-to-br ${goal.color} backdrop-blur-sm border-2 border-white/20 hover:border-white/40`
      }`}
      onClick={() => onToggle(goal.id)}
    >
      {/* Checkbox Icon */}
      <motion.div
        className="absolute top-4 right-4"
        animate={{ 
          scale: isHovered ? 1.2 : 1,
          rotate: goal.completed ? 360 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {goal.completed ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-green-500 rounded-full p-2 shadow-lg"
          >
            <Check className="w-6 h-6 text-white" />
          </motion.div>
        ) : (
          <Circle className="w-10 h-10 text-white/60" strokeWidth={2} />
        )}
      </motion.div>

      {/* Category Badge */}
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-5 h-5 text-white/80" />
        <span className="text-sm font-medium text-white/90 uppercase tracking-wide">
          {goal.category}
        </span>
      </div>

      {/* Title */}
      <h3 className={`text-2xl font-bold text-white mb-2 pr-12 ${
        goal.completed ? 'line-through opacity-70' : ''
      }`}>
        {goal.title}
      </h3>

      {/* Description */}
      <p className={`text-white/80 ${goal.completed ? 'line-through opacity-60' : ''}`}>
        {goal.description}
      </p>

      {/* Sparkle effect on hover */}
      {isHovered && !goal.completed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-2 left-2"
        >
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </motion.div>
      )}

      {/* Completed overlay effect */}
      {goal.completed && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute bottom-4 left-4"
        >
          <Sparkles className="w-6 h-6 text-green-400" />
        </motion.div>
      )}
    </motion.div>
  );
}
