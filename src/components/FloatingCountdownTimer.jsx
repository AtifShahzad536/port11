import React from "react";
import { motion } from "framer-motion";
import { FaClock, FaHeart } from "react-icons/fa6";

export const FloatingCountdownTimer = ({ remainingMs }) => {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-6 right-4 sm:right-6 z-40"
    >
      <div className="relative group">
        {/* Glow backdrop */}
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 via-ruby-500 to-pink-500 rounded-full blur-sm opacity-60 group-hover:opacity-90 transition-opacity animate-pulse" />

        {/* Main Floating Badge */}
        <div className="relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-white/95 text-ruby-950 backdrop-blur-md border border-rose-200 shadow-xl cursor-default">
          {/* Animated Pulsing Dot & Clock */}
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-ruby-600 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-ruby-600 relative" />
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[9px] uppercase font-extrabold tracking-wider text-ruby-600 flex items-center gap-1">
              <span>Surprise Unlock</span>
              <FaHeart className="w-2.5 h-2.5 text-rose-500 animate-bounce" />
            </span>
            <span className="font-mono font-bold text-sm sm:text-base text-ruby-950 tracking-wider">
              {formattedTime}
            </span>
          </div>
        </div>

        {/* Hover / Touch Tooltip info */}
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block w-48 p-2.5 rounded-xl bg-ruby-950/95 text-white text-[11px] leading-snug shadow-2xl backdrop-blur-md border border-rose-300/30 text-center pointer-events-none">
          ⏳ 20 minute ke baad ek special visual surprise unlock hoga! ✨
        </div>
      </div>
    </motion.div>
  );
};
