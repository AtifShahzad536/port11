import React from "react";
import { FaHeart, FaArrowUp } from "react-icons/fa6";
import { romanticSound } from "../utils/soundSynthesizer";

export const RomanticFooter = () => {
  const scrollToTop = () => {
    romanticSound.playChime();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-20 py-16 px-6 bg-gradient-to-t from-ruby-950 via-ruby-900 to-transparent text-white text-center mt-20">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Animated Heart Icon */}
        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-rose-400 mb-6 border border-white/20 shadow-lg">
          <FaHeart className="w-7 h-7 text-rose-400 animate-pulse" />
        </div>

        <h3 className="font-serif italic font-bold text-3xl sm:text-4xl text-white mb-2">
          Always & Forever, Zama Grana Shally ❤️
        </h3>

        <p className="text-pink-200/80 text-sm sm:text-base max-w-md mx-auto mb-8 font-medium">
          "Tum meri zindagi ka wo anmol hissa ho jiske sath har pal khaas lagta hai. I am really sorry zama bestie..."
        </p>

        {/* Scroll Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="px-6 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 mb-10 cursor-pointer"
        >
          <span>Wapis Upar Jayen</span>
          <FaArrowUp className="w-3 h-3 text-pink-300" />
        </button>

        <div className="w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-pink-200/60 gap-4">
          <span>Made With 100% Care & Heartfelt Regret For Shally 🌹</span>
          <span className="font-serif italic text-pink-300">Sta Sacha Aur Khaas Dost</span>
        </div>
      </div>
    </footer>
  );
};
