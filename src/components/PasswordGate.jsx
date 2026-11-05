import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLock, FaLockOpen, FaHeart, FaEye, FaEyeSlash, FaLightbulb } from "react-icons/fa6";
import confetti from "canvas-confetti";
import { ALLOWED_PASSWORDS, PASSWORD_HINT, AUTH_STORAGE_KEY } from "../config/passwordConfig";
import { romanticSound } from "../utils/soundSynthesizer";

export const PasswordGate = ({ onUnlock }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const handleSubmit = (e) => {
    e?.preventDefault();
    setErrorMsg("");

    const cleaned = password.trim().toLowerCase();

    // Check against allowed passwords
    const isMatch = ALLOWED_PASSWORDS.some(
      (p) => p.trim().toLowerCase() === cleaned
    );

    if (isMatch) {
      setIsSuccess(true);
      setErrorMsg("");

      // Play celebration sound & trigger confetti
      try {
        romanticSound.playCelebrationFanfare();
      } catch (err) {
        console.warn("Sound play error", err);
      }

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#E11D48", "#FB7185", "#FDA4AF", "#FFE4E6", "#BE123C"],
        });
      } catch (err) {
        console.warn("Confetti error", err);
      }

      // Persist unlock in localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, "true");

      // Give 900ms to enjoy celebration effect before revealing site
      setTimeout(() => {
        onUnlock();
      }, 900);
    } else {
      setShakeKey((prev) => prev + 1);
      setErrorMsg("Oops! Galat password hai... Ek baar phir socho ❤️");
      try {
        romanticSound.playHeartPop();
      } catch (err) {
        // ignore
      }
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 bg-gradient-to-br from-[#FFF0F3] via-[#FFE4E8] to-[#FFD6DE] overflow-hidden select-none">
      {/* Soft Ambient Floating Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-rose-300/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-ruby-400/25 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: "6s" }} />

      {/* Decorative Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35">
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-12 left-10 text-rose-300 text-3xl"
        >
          ❤️
        </motion.div>
        <motion.div
          animate={{ y: [0, -25, 0], rotate: [0, -12, 12, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
          className="absolute top-24 right-16 text-rose-300 text-2xl"
        >
          🌹
        </motion.div>
        <motion.div
          animate={{ y: [0, -35, 0], rotate: [0, 15, -5, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-16 left-20 text-rose-300 text-4xl"
        >
          💖
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-20 right-24 text-rose-300 text-2xl"
        >
          ✨
        </motion.div>
      </div>

      {/* Main Glassmorphic Lock Card */}
      <motion.div
        key={shakeKey}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          x: shakeKey > 0 ? [0, -12, 12, -8, 8, -4, 4, 0] : 0,
        }}
        transition={{
          duration: shakeKey > 0 ? 0.45 : 0.6,
          ease: "easeOut",
        }}
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-3xl p-7 sm:p-9 shadow-2xl shadow-rose-950/15 border border-white/80 text-center"
      >
        {/* Animated Heart Lock Badge */}
        <div className="relative mx-auto mb-5 w-20 h-20 flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-20 h-20 rounded-full bg-gradient-to-tr from-ruby-600 via-rose-500 to-pink-500 flex items-center justify-center shadow-lg shadow-ruby-500/35 text-white"
          >
            {isSuccess ? (
              <FaLockOpen className="w-8 h-8 text-white animate-bounce" />
            ) : (
              <FaLock className="w-8 h-8 text-white" />
            )}
          </motion.div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center">
            <FaHeart className="w-4 h-4 text-ruby-600" />
          </div>
        </div>

        {/* Heading & Subtitle */}
        <h1 className="font-serif italic font-bold text-2xl sm:text-3xl text-ruby-800 mb-2 tracking-tight">
          Khaas Sirf Shally Ke Liye 🔐
        </h1>
        <p className="text-xs sm:text-sm text-ruby-950/70 font-medium mb-6 leading-relaxed">
          Yeh website private aur bohot khaas hai. Please access unlock karne ke liye password enter karein.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-ruby-400">
              <FaLock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMsg) setErrorMsg("");
              }}
              placeholder="Enter secret password..."
              autoFocus
              className={`w-full pl-11 pr-11 py-3.5 rounded-2xl bg-rose-50/70 border text-ruby-900 placeholder-ruby-300 font-medium text-sm sm:text-base focus:outline-none transition-all duration-200 ${
                errorMsg
                  ? "border-rose-500 ring-2 ring-rose-400/30"
                  : isSuccess
                  ? "border-emerald-500 ring-2 ring-emerald-400/30"
                  : "border-rose-200 focus:border-ruby-500 focus:ring-2 focus:ring-ruby-400/30"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-ruby-400 hover:text-ruby-600 focus:outline-none cursor-pointer"
            >
              {showPassword ? (
                <FaEyeSlash className="w-4 h-4" />
              ) : (
                <FaEye className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl py-2 px-3 flex items-center justify-center gap-1.5"
              >
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Message */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl py-2 px-3 flex items-center justify-center gap-1.5"
              >
                <span>Password Matched! Welcome Shally... ❤️</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSuccess || !password.trim()}
            className={`w-full py-3.5 px-6 rounded-2xl text-white font-bold text-sm tracking-wide shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              isSuccess
                ? "bg-emerald-600 shadow-emerald-600/30 cursor-default"
                : !password.trim()
                ? "bg-rose-300 cursor-not-allowed opacity-75 shadow-none"
                : "bg-gradient-to-r from-ruby-600 via-rose-600 to-pink-600 hover:from-ruby-700 hover:to-pink-700 shadow-ruby-600/30 hover:shadow-ruby-600/50 hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {isSuccess ? (
              <>
                <FaLockOpen className="w-4 h-4 animate-bounce" />
                <span>Unlocking... ❤️</span>
              </>
            ) : (
              <>
                <FaHeart className="w-4 h-4" />
                <span>Unlock My Heart 🔓</span>
              </>
            )}
          </button>
        </form>

        {/* Hint Section */}
        <div className="mt-6 pt-5 border-t border-rose-100/80 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-ruby-600/80 hover:text-ruby-700 font-semibold flex items-center gap-1.5 focus:outline-none transition-colors cursor-pointer"
          >
            <FaLightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>{showHint ? "Hide hint" : "Hint chahiye? 💡"}</span>
          </button>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2.5 text-xs text-ruby-800/80 bg-rose-100/50 rounded-xl px-3 py-2 border border-rose-200/50 font-medium"
              >
                {PASSWORD_HINT}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
