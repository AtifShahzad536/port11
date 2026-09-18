import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaArrowDown } from "react-icons/fa6";
import { sorryData } from "../data/sorryData";
import { romanticSound } from "../utils/soundSynthesizer";

export const HeroSection = () => {
  const { hero } = sorryData;

  const scrollToSection = (id) => {
    romanticSound.playChime();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center items-center text-center px-6 pt-28 pb-16 overflow-hidden">
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-rose-300/30 via-red-400/20 to-pink-200/40 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Center Main Content */}
      <div className="relative z-20 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Top Cute Pashto Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-ruby-200 shadow-sm text-ruby-700 text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-ruby-600 animate-ping" />
          <span>{hero.badge}</span>
          <FaHeart className="w-3 h-3 text-ruby-500" />
        </motion.div>

        {/* Grand Typography Title */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="font-script text-3xl sm:text-5xl md:text-6xl text-ruby-500 block mb-1">
            {hero.titlePrefix}
          </span>
          <h1 className="font-serif font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-ruby-950 tracking-tight leading-[1.05] drop-shadow-sm">
            I Am Really <span className="text-shimmer-romantic italic font-normal">Sorry</span>
          </h1>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="h-[1.5px] w-12 bg-gradient-to-r from-transparent to-ruby-500" />
            <span className="font-serif italic font-bold text-2xl sm:text-3xl md:text-4xl text-ruby-700">
              Shally (زما زړګو) ❤️
            </span>
            <span className="h-[1.5px] w-12 bg-gradient-to-l from-transparent to-ruby-500" />
          </div>
        </motion.div>

        {/* Ashiq Style Emotional Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-base sm:text-lg md:text-xl text-ruby-900/80 max-w-2xl font-medium leading-relaxed"
        >
          {hero.subheading}
        </motion.p>

        {/* Urdu Translation Pill */}
        {hero.urduTranslation && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-2 text-sm sm:text-base text-ruby-700 font-serif"
            dir="rtl"
          >
            "{hero.urduTranslation}"
          </motion.p>
        )}

        {/* Romantic Pashto & Urdu Shayari Quote Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-6 px-6 py-4 rounded-2xl romantic-glass-white max-w-xl text-center shadow-lg relative border-l-4 border-ruby-600"
        >
          <p className="font-serif italic text-ruby-900 text-sm sm:text-base leading-relaxed">
            {hero.quote}
          </p>
        </motion.div>

        {/* Interactive Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection("forgive-game")}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-ruby-600 via-rose-600 to-red-600 text-white font-bold text-sm sm:text-base tracking-wide shadow-xl shadow-ruby-600/30 hover:shadow-ruby-600/50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 border border-white/40 cursor-pointer"
          >
            <FaHeart className="w-4 h-4 text-pink-200 animate-bounce" />
            <span>{hero.ctaApology}</span>
          </button>

          <button
            onClick={() => scrollToSection("pashto-words")}
            className="px-7 py-3.5 rounded-full bg-white text-ruby-700 font-bold text-sm sm:text-base tracking-wide border-2 border-ruby-200 hover:border-ruby-500 hover:bg-ruby-50 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Pashto Love Words 🌹</span>
          </button>

          <button
            onClick={() => scrollToSection("memories")}
            className="px-7 py-3.5 rounded-full bg-ruby-50 text-ruby-800 font-bold text-sm sm:text-base tracking-wide border border-ruby-200 hover:bg-ruby-100 hover:scale-105 active:scale-95 transition-all duration-300 shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <span>10 Yaadein 📸</span>
          </button>
        </motion.div>

        {/* Cute Floating Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-12 grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-md"
        >
          <div className="p-3 rounded-2xl romantic-glass-white text-center shadow-sm">
            <span className="font-serif font-bold text-xl text-ruby-600 block">Zargo</span>
            <span className="text-[10px] sm:text-xs font-semibold text-ruby-950/70 uppercase tracking-wider">Mera Dil</span>
          </div>
          <div className="p-3 rounded-2xl romantic-glass-white text-center shadow-sm">
            <span className="font-serif font-bold text-xl text-ruby-600 block">Spogmai</span>
            <span className="text-[10px] sm:text-xs font-semibold text-ruby-950/70 uppercase tracking-wider">Mera Chand</span>
          </div>
          <div className="p-3 rounded-2xl romantic-glass-white text-center shadow-sm">
            <span className="font-serif font-bold text-xl text-ruby-600 block">Grana</span>
            <span className="text-[10px] sm:text-xs font-semibold text-ruby-950/70 uppercase tracking-wider">Meri Shally</span>
          </div>
        </motion.div>

      </div>

      {/* Down Arrow Bounce */}
      <motion.button
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={() => scrollToSection("letter")}
        className="mt-12 z-20 text-ruby-400 hover:text-ruby-700 transition-colors focus:outline-none flex flex-col items-center gap-1.5 cursor-pointer"
      >
        <span className="text-[11px] uppercase tracking-widest font-bold">Khat Parhein</span>
        <FaArrowDown className="w-3.5 h-3.5 text-ruby-500" />
      </motion.button>
    </section>
  );
};
