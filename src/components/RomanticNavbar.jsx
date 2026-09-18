import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaEnvelope, FaImages, FaStar, FaHandHoldingHeart, FaBookOpen } from "react-icons/fa6";
import { romanticSound } from "../utils/soundSynthesizer";

export const RomanticNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    romanticSound.playChime();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-md shadow-ruby-950/5 py-3 border-b border-ruby-100"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 group cursor-pointer focus:outline-none text-left"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-ruby-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-ruby-500/30 group-hover:scale-110 transition-transform">
            <FaHeart className="w-4 h-4 animate-pulse text-white" />
          </div>
          <div>
            <span className="font-serif italic font-bold text-xl md:text-2xl text-ruby-700 tracking-tight">
              Shally
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-ruby-400 block -mt-1 font-sans">
              Zama Zargo (زړګو) ❤️
            </span>
          </div>
        </button>

        {/* Navigation Items */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-ruby-900/80">
          <button
            onClick={() => scrollTo("letter")}
            className="hover:text-ruby-600 transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
          >
            <FaEnvelope className="w-3 h-3 text-ruby-500" />
            Dil Ka Khat
          </button>
          <button
            onClick={() => scrollTo("pashto-words")}
            className="hover:text-ruby-600 transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
          >
            <FaBookOpen className="w-3 h-3 text-ruby-500" />
            Pashto Alfaz 🌹
          </button>
          <button
            onClick={() => scrollTo("memories")}
            className="hover:text-ruby-600 transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
          >
            <FaImages className="w-3 h-3 text-ruby-500" />
            Shally's Photos
          </button>
          <button
            onClick={() => scrollTo("reasons")}
            className="hover:text-ruby-600 transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
          >
            <FaStar className="w-3 h-3 text-ruby-500" />
            Why You
          </button>
          <button
            onClick={() => scrollTo("promises")}
            className="hover:text-ruby-600 transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
          >
            <FaHandHoldingHeart className="w-3 h-3 text-ruby-500" />
            Waday
          </button>
        </nav>

        {/* CTA Button */}
        <button
          onClick={() => scrollTo("forgive-game")}
          className="relative group px-5 py-2 rounded-full bg-gradient-to-r from-ruby-600 to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-ruby-600/30 hover:shadow-ruby-600/50 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 border border-white/40 cursor-pointer"
        >
          <span>Bakhana Raka / Maan Jao</span>
          <FaHeart className="w-3 h-3 text-pink-200 group-hover:scale-125 transition-transform" />
        </button>
      </div>
    </motion.header>
  );
};
