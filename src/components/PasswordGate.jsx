import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLock,
  FaLockOpen,
  FaHeart,
  FaCheck,
  FaXmark,
  FaLightbulb,
  FaCalendarDays,
  FaUser,
} from "react-icons/fa6";
import confetti from "canvas-confetti";
import {
  QUESTIONS_CONFIG,
  validateQuestions,
  AUTH_STORAGE_KEY,
} from "../config/passwordConfig";
import { romanticSound } from "../utils/soundSynthesizer";

export const PasswordGate = ({ onUnlock }) => {
  const [ans1, setAns1] = useState("");
  const [ans2, setAns2] = useState("");
  const [ans3, setAns3] = useState("");

  const [attempted, setAttempted] = useState(false);
  const [validationResult, setValidationResult] = useState({
    allValid: false,
    isQ1Valid: false,
    isQ2Valid: false,
    isQ3Valid: false,
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [showGetOutModal, setShowGetOutModal] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();

    const result = validateQuestions(ans1, ans2, ans3);
    setValidationResult(result);
    setAttempted(true);

    if (result.allValid) {
      setIsSuccess(true);
      setShowGetOutModal(false);

      // Play fanfare sound & trigger confetti
      try {
        romanticSound.playCelebrationFanfare();
      } catch (err) {
        console.warn("Audio error", err);
      }

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.55 },
          colors: ["#E11D48", "#FB7185", "#FDA4AF", "#FFE4E6", "#BE123C", "#F43F5E"],
        });
      } catch (err) {
        console.warn("Confetti error", err);
      }

      // Persist unlock in localStorage
      localStorage.setItem(AUTH_STORAGE_KEY, "true");

      setTimeout(() => {
        onUnlock();
      }, 950);
    } else {
      setShakeKey((prev) => prev + 1);
      setShowGetOutModal(true);
      try {
        romanticSound.playHeartPop();
      } catch (err) {
        // ignore
      }
    }
  };

  const getFieldBorder = (isValid, val) => {
    if (!attempted) {
      return "border-rose-200 focus:border-ruby-500 focus:ring-2 focus:ring-ruby-400/30";
    }
    if (isValid) {
      return "border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-400/30";
    }
    return "border-rose-500 bg-rose-50/60 ring-2 ring-rose-400/30";
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-[#FFF0F3] via-[#FFE4E8] to-[#FFD6DE] overflow-hidden select-none">
      {/* Soft Ambient Floating Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-rose-300/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ruby-400/20 rounded-full blur-3xl pointer-events-none animate-pulse"
        style={{ animationDuration: "6s" }}
      />

      {/* Decorative Floating Hearts & Petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35">
        <motion.div
          animate={{ y: [0, -25, 0], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-10 left-8 text-rose-300 text-3xl"
        >
          ❤️
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, -12, 12, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
          className="absolute top-20 right-12 text-rose-300 text-2xl"
        >
          🌹
        </motion.div>
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 15, -5, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-12 left-16 text-rose-300 text-4xl"
        >
          💖
        </motion.div>
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-16 right-20 text-rose-300 text-2xl"
        >
          ✨
        </motion.div>
      </div>

      {/* Main Glassmorphic Lock Card */}
      <motion.div
        key={shakeKey}
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
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
        className="relative z-10 w-full max-w-lg bg-white/92 backdrop-blur-2xl rounded-3xl p-6 sm:p-9 shadow-2xl shadow-rose-950/15 border border-white/80"
      >
        {/* Animated Heart Lock Badge */}
        <div className="relative mx-auto mb-4 w-20 h-20 flex items-center justify-center">
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
        <div className="text-center mb-6">
          <h1 className="font-serif italic font-bold text-2xl sm:text-3xl text-ruby-800 tracking-tight">
            Khaas Sirf Shally Ke Liye 🔐
          </h1>
          <p className="text-xs sm:text-sm text-ruby-950/70 font-medium mt-1">
            Site unlock karne ke liye in 3 sawalon ke sahi jawab dein:
          </p>
        </div>

        {/* 3 Questions Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Question 1 */}
          <div className="space-y-1.5 text-left">
            <label className="flex items-center justify-between text-xs sm:text-sm font-bold text-ruby-900">
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-ruby-100 text-ruby-700 text-[11px] font-bold flex items-center justify-center">
                  1
                </span>
                <span>{QUESTIONS_CONFIG[0].question}</span>
              </span>
              {attempted && (
                validationResult.isQ1Valid ? (
                  <span className="text-emerald-600 text-xs font-semibold flex items-center gap-1">
                    <FaCheck className="w-3 h-3" /> Sahi
                  </span>
                ) : (
                  <span className="text-rose-600 text-xs font-semibold flex items-center gap-1">
                    <FaXmark className="w-3 h-3" /> Galat
                  </span>
                )
              )}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ruby-400">
                <FaUser className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={ans1}
                onChange={(e) => {
                  setAns1(e.target.value);
                  if (attempted) setAttempted(false);
                }}
                placeholder={QUESTIONS_CONFIG[0].placeholder}
                autoFocus
                className={`w-full pl-10 pr-9 py-2.5 sm:py-3 rounded-xl bg-rose-50/70 border text-ruby-900 placeholder-ruby-300 font-medium text-xs sm:text-sm focus:outline-none transition-all duration-200 ${getFieldBorder(
                  validationResult.isQ1Valid,
                  ans1
                )}`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {attempted && (
                  validationResult.isQ1Valid ? (
                    <FaCheck className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <FaXmark className="w-4 h-4 text-rose-500" />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Question 2 */}
          <div className="space-y-1.5 text-left">
            <label className="flex items-center justify-between text-xs sm:text-sm font-bold text-ruby-900">
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-ruby-100 text-ruby-700 text-[11px] font-bold flex items-center justify-center">
                  2
                </span>
                <span>{QUESTIONS_CONFIG[1].question}</span>
              </span>
              {attempted && (
                validationResult.isQ2Valid ? (
                  <span className="text-emerald-600 text-xs font-semibold flex items-center gap-1">
                    <FaCheck className="w-3 h-3" /> Sahi
                  </span>
                ) : (
                  <span className="text-rose-600 text-xs font-semibold flex items-center gap-1">
                    <FaXmark className="w-3 h-3" /> Galat
                  </span>
                )
              )}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ruby-400">
                <FaHeart className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={ans2}
                onChange={(e) => {
                  setAns2(e.target.value);
                  if (attempted) setAttempted(false);
                }}
                placeholder={QUESTIONS_CONFIG[1].placeholder}
                className={`w-full pl-10 pr-9 py-2.5 sm:py-3 rounded-xl bg-rose-50/70 border text-ruby-900 placeholder-ruby-300 font-medium text-xs sm:text-sm focus:outline-none transition-all duration-200 ${getFieldBorder(
                  validationResult.isQ2Valid,
                  ans2
                )}`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {attempted && (
                  validationResult.isQ2Valid ? (
                    <FaCheck className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <FaXmark className="w-4 h-4 text-rose-500" />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Question 3 */}
          <div className="space-y-1.5 text-left">
            <label className="flex items-center justify-between text-xs sm:text-sm font-bold text-ruby-900">
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-ruby-100 text-ruby-700 text-[11px] font-bold flex items-center justify-center">
                  3
                </span>
                <span>{QUESTIONS_CONFIG[2].question}</span>
              </span>
              {attempted && (
                validationResult.isQ3Valid ? (
                  <span className="text-emerald-600 text-xs font-semibold flex items-center gap-1">
                    <FaCheck className="w-3 h-3" /> Sahi
                  </span>
                ) : (
                  <span className="text-rose-600 text-xs font-semibold flex items-center gap-1">
                    <FaXmark className="w-3 h-3" /> Galat
                  </span>
                )
              )}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-ruby-400">
                <FaCalendarDays className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={ans3}
                onChange={(e) => {
                  setAns3(e.target.value);
                  if (attempted) setAttempted(false);
                }}
                placeholder={QUESTIONS_CONFIG[2].placeholder}
                className={`w-full pl-10 pr-9 py-2.5 sm:py-3 rounded-xl bg-rose-50/70 border text-ruby-900 placeholder-ruby-300 font-medium text-xs sm:text-sm focus:outline-none transition-all duration-200 ${getFieldBorder(
                  validationResult.isQ3Valid,
                  ans3
                )}`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                {attempted && (
                  validationResult.isQ3Valid ? (
                    <FaCheck className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <FaXmark className="w-4 h-4 text-rose-500" />
                  )
                )}
              </div>
            </div>
          </div>

          {/* Error Banner */}
          <AnimatePresence>
            {attempted && !validationResult.allValid && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl py-2 px-3 text-center"
              >
                Kuch jawab galat hain... Kripya red wale fields check karein ❤️
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Banner */}
          <AnimatePresence>
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl py-2.5 px-3 text-center flex items-center justify-center gap-2"
              >
                <FaCheck className="w-4 h-4 text-emerald-600" />
                <span>Teeno jawab bilkul sahi hain! Welcome Shally... ❤️</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSuccess || (!ans1 && !ans2 && !ans3)}
            className={`w-full mt-2 py-3.5 px-6 rounded-2xl text-white font-bold text-sm tracking-wide shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
              isSuccess
                ? "bg-emerald-600 shadow-emerald-600/30 cursor-default"
                : "bg-gradient-to-r from-ruby-600 via-rose-600 to-pink-600 hover:from-ruby-700 hover:to-pink-700 shadow-ruby-600/30 hover:shadow-ruby-600/50 hover:scale-[1.01] active:scale-[0.99]"
            }`}
          >
            {isSuccess ? (
              <>
                <FaLockOpen className="w-4 h-4 animate-bounce" />
                <span>Access Granted! Unlocking... ❤️</span>
              </>
            ) : (
              <>
                <FaHeart className="w-4 h-4" />
                <span>Unlock Website 🔓</span>
              </>
            )}
          </button>
        </form>

        {/* Hint Section */}
        <div className="mt-5 pt-4 border-t border-rose-100 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="text-xs text-ruby-600/80 hover:text-ruby-700 font-semibold flex items-center gap-1.5 focus:outline-none transition-colors cursor-pointer"
          >
            <FaLightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>{showHint ? "Hide hints" : "Hint chahiye? 💡"}</span>
          </button>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2.5 w-full text-xs text-ruby-900/90 bg-rose-50/90 rounded-xl p-3 border border-rose-200/70 space-y-1 text-left font-medium"
              >
                <p>
                  <strong>Q1:</strong> {QUESTIONS_CONFIG[0].hint}
                </p>
                <p>
                  <strong>Q2:</strong> {QUESTIONS_CONFIG[1].hint}
                </p>
                <p>
                  <strong>Q3:</strong> {QUESTIONS_CONFIG[2].hint}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* "Get Out Tm Shally Nai Ho" Modal Popup */}
      <AnimatePresence>
        {showGetOutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowGetOutModal(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0, y: 30 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                x: [0, -12, 12, -8, 8, -4, 4, 0],
              }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm bg-gradient-to-b from-white via-rose-50 to-rose-100 rounded-3xl p-7 text-center shadow-2xl border-2 border-rose-300 select-none"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowGetOutModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-rose-200/60 hover:bg-rose-300 text-rose-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                <FaXmark className="w-4 h-4" />
              </button>

              {/* Angry Emoji Badge */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-4xl shadow-lg shadow-rose-600/40 text-white animate-bounce">
                😡
              </div>

              {/* Headline */}
              <h2 className="font-serif italic font-extrabold text-2xl text-rose-700 tracking-tight mb-2">
                Get out tm shally nai ho! ❌
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-rose-900/80 font-medium mb-6 leading-relaxed">
                Asli Shally ko har sawal ka sahi jawab pata hota hai! Yeh site sirf meri Shally ke liye hai. Jao pehle sahi jawab socho... 😤💔
              </p>

              {/* Retry Button */}
              <button
                type="button"
                onClick={() => setShowGetOutModal(false)}
                className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-rose-600 to-ruby-700 hover:from-rose-700 hover:to-ruby-800 text-white font-bold text-sm shadow-lg shadow-rose-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Dobara Koshish Karo 🥺🔄</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
