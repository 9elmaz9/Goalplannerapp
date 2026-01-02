import { motion } from "motion/react";
import { Trophy, Sparkles, Star } from "lucide-react";

interface CelebrationAnimationProps {
  onComplete: () => void;
}

export function CelebrationAnimation({ onComplete }: CelebrationAnimationProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onAnimationComplete={onComplete}
    >
      {/* Trophy */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: [0, 1.5, 1],
          rotate: [0, 360, 0]
        }}
        transition={{ 
          duration: 0.8,
          times: [0, 0.6, 1]
        }}
        className="relative"
      >
        <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 rounded-full p-8 shadow-2xl">
          <Trophy className="w-20 h-20 text-white" />
        </div>
      </motion.div>

      {/* Sparkles around trophy */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 360) / 8;
        const x = Math.cos((angle * Math.PI) / 180) * 150;
        const y = Math.sin((angle * Math.PI) / 180) * 150;
        
        return (
          <motion.div
            key={i}
            initial={{ 
              x: 0, 
              y: 0, 
              scale: 0,
              opacity: 0 
            }}
            animate={{ 
              x,
              y,
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 1.2,
              delay: 0.3,
              times: [0, 0.5, 1]
            }}
            className="absolute"
            style={{
              left: '50%',
              top: '50%',
            }}
          >
            {i % 2 === 0 ? (
              <Sparkles className="w-8 h-8 text-yellow-400" />
            ) : (
              <Star className="w-8 h-8 text-pink-400 fill-pink-400" />
            )}
          </motion.div>
        );
      })}

      {/* Floating stars */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          initial={{
            x: Math.random() * window.innerWidth - window.innerWidth / 2,
            y: window.innerHeight / 2,
            opacity: 0,
            scale: 0
          }}
          animate={{
            y: -window.innerHeight / 2,
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0.5],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 0.5,
            ease: "easeOut"
          }}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
          }}
        >
          <Star 
            className="w-4 h-4 fill-yellow-300 text-yellow-300" 
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
