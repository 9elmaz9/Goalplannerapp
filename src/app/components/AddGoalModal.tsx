import { motion } from "motion/react";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (goal: {
    title: string;
    description: string;
    category: string;
    color: string;
  }) => void;
}

const categories = [
  "Health & Fitness",
  "Career",
  "Finance",
  "Learning",
  "Relationships",
  "Creativity",
  "Travel",
  "Personal Growth"
];

const colorGradients = [
  "from-purple-500 via-pink-500 to-red-500",
  "from-blue-500 via-cyan-500 to-teal-500",
  "from-orange-500 via-amber-500 to-yellow-500",
  "from-green-500 via-emerald-500 to-cyan-500",
  "from-pink-500 via-rose-500 to-red-500",
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-cyan-500 via-blue-500 to-indigo-500",
  "from-lime-500 via-green-500 to-emerald-500",
];

export function AddGoalModal({ isOpen, onClose, onAdd }: AddGoalModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [selectedColor, setSelectedColor] = useState(colorGradients[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({ title, description, category, color: selectedColor });
      setTitle("");
      setDescription("");
      setCategory(categories[0]);
      setSelectedColor(colorGradients[0]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-white">Add New Goal</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Goal Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Run a marathon"
              className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400 transition-colors"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add details about your goal..."
              rows={3}
              className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-400 transition-colors resize-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 transition-colors"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-800">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-3">
              Choose Color
            </label>
            <div className="grid grid-cols-4 gap-3">
              {colorGradients.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`h-12 rounded-xl bg-gradient-to-br ${color} transition-transform hover:scale-110 ${
                    selectedColor === color 
                      ? 'ring-4 ring-white scale-110' 
                      : 'ring-2 ring-white/20'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            Add Goal
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
