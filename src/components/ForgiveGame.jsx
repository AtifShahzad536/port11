import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { FaHeart, FaAward, FaXmark } from "react-icons/fa6";
import { sorryData } from "../data/sorryData";
import { romanticSound } from "../utils/soundSynthesizer";

export const ForgiveGame = () => {
  const [forgiven, setForgiven] = useState(false);
  const [noPhraseIndex, setNoPhraseIndex] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [dodgeCount, setDodgeCount] = useState(0);
  const containerRef = useRef(null);

  const { noButtonPhrases } = sorryData;

  // Handle "Yes / Maaf Kiya"
  const handleYes = () => {
    setForgiven(true);
    romanticSound.playCelebrationFanfare();

    // Multi-stage colorful confetti explosion
    const count = 250;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        colors: ["#E11D48", "#FB7185", "#FDA4AF", "#FFFFFF", "#F59E0B"]
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  // Dodging "No" Button handler
  const handleNoHover = () => {
    romanticSound.playHeartPop();
    setDodgeCount((prev) => prev + 1);
    setNoPhraseIndex((prev) => (prev + 1) % noButtonPhrases.length);

    // Calculate random position within safe bounds
    const randomX = (Math.random() - 0.5) * 260;
    const randomY = (Math.random() - 0.5) * 160;
    setNoButtonPos({ x: randomX, y: randomY });
  };

  return (
    <section id="forgive-game" className="relative py-24 px-6 max-w-4xl mx-auto z-20">
      {/* Container Card */}
      <div
        ref={containerRef}
        className="p-8 sm:p-14 rounded-3xl romantic-glass-white border-2 border-ruby-300 shadow-2xl text-center relative overflow-hidden"
      >
        {/* Background glow circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-400/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-ruby-600 to-rose-500 flex items-center justify-center text-white shadow-xl shadow-ruby-600/40 mb-6">
          <FaHeart className="w-8 h-8 animate-bounce text-pink-100" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-ruby-600 font-sans block mb-2">
          The Moment of Peace
        </span>

        <h2 className="font-serif font-bold text-3xl sm:text-5xl text-ruby-950 mb-4 tracking-tight">
          Will You Forgive Me, <span className="text-ruby-600 italic">Shally?</span> 🥺❤️
        </h2>

        <p className="text-base sm:text-lg text-ruby-900/80 max-w-lg mx-auto mb-10 leading-relaxed font-medium">
          Mera dil sirf tumhare 'Haan' ka intezar kar raha hai. Plz mujhe maaf kar ke pehle jaisi pyari muskurahat wapis le aao na!
        </p>

        {/* Action Buttons: YES vs DODGING NO */}
        <div className="relative min-h-[120px] flex items-center justify-center gap-6 flex-wrap">
          {/* YES Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleYes}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-ruby-600 via-rose-600 to-red-600 text-white font-bold text-base sm:text-lg tracking-wider shadow-xl shadow-ruby-600/40 hover:shadow-ruby-600/60 transition-all flex items-center gap-3 border border-white/50 z-10 cursor-pointer"
          >
            <FaHeart className="w-5 h-5 text-pink-200 animate-pulse" />
            <span>YES, Maaf Kiya Shally! ❤️</span>
          </motion.button>

          {/* NO Button (Playfully Dodges) */}
          <motion.button
            animate={{ x: noButtonPos.x, y: noButtonPos.y }}
            transition={{ type: "spring", stiffness: 350, damping: 20 }}
            onMouseEnter={handleNoHover}
            onClick={handleNoHover}
            onTouchStart={handleNoHover}
            className="px-8 py-3.5 rounded-full bg-white text-ruby-700 font-bold text-sm sm:text-base border-2 border-ruby-200 shadow-md hover:bg-ruby-50 transition-colors z-10 select-none cursor-pointer"
          >
            <span>{noButtonPhrases[noPhraseIndex]}</span>
          </motion.button>
        </div>

        {dodgeCount > 2 && (
          <p className="mt-6 text-xs font-semibold text-ruby-500 italic animate-fade-in">
            (P.S. Dekha? 'No' option toh bhag hi raha hai! Sirf 'YES' hi rasta hai! 😉🙈)
          </p>
        )}
      </div>

      {/* Forgiveness Certificate Celebration Modal */}
      <AnimatePresence>
        {forgiven && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.8, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-xl w-full bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border-4 border-ruby-300 text-center"
              style={{
                backgroundImage: "radial-gradient(#FFE4E8 1.5px, transparent 1.5px)",
                backgroundSize: "20px 20px"
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setForgiven(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-ruby-100 text-ruby-700 hover:bg-ruby-200 flex items-center justify-center transition-colors cursor-pointer"
              >
                <FaXmark className="w-4 h-4" />
              </button>

              {/* Award Trophy Badge */}
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 via-rose-500 to-ruby-600 text-white flex items-center justify-center shadow-xl shadow-ruby-500/30 mb-6">
                <FaAward className="w-10 h-10" />
              </div>

              <span className="text-xs font-bold uppercase tracking-widest text-ruby-600 font-sans block mb-1">
                Official Declaration of Pure Peace & Smile
              </span>

              <h3 className="font-serif italic font-bold text-3xl sm:text-4xl text-ruby-950 mb-3">
                Yayyy! Thank You Zama Shally! 🎉💖
              </h3>

              <div className="p-4 rounded-2xl bg-ruby-50/90 border border-ruby-200 my-6 text-left space-y-2">
                <p className="font-serif italic text-ruby-950 text-base leading-relaxed">
                  "Main wada karta hoon k ab tumhein kabhi naraz nahi karunga. Tumhari muskurahat aur khushi mere liye sab se zaroori hai. Thank you for forgiving me Shally!"
                </p>
                <div className="pt-2 border-t border-ruby-200 flex items-center justify-between text-xs font-bold text-ruby-700">
                  <span>Signed: Your Well-Wisher ❤️</span>
                  <span>Pure Connection Forever ✨</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setForgiven(false);
                  romanticSound.playHeartPop();
                }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-ruby-600 to-rose-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-ruby-600/30 hover:scale-105 transition-all cursor-pointer"
              >
                Thank You Shally ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
