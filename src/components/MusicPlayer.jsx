import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMusic, FaVolumeXmark, FaHeart, FaPlay, FaPause, FaVolumeHigh, FaBell } from "react-icons/fa6";
import { romanticSound } from "../utils/soundSynthesizer";

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIphoneHint, setShowIphoneHint] = useState(false);
  const audioRef = useRef(null);

  // Direct clean audio path
  const audioSrc = "/sanam-teri-kasam.m4a";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Detect iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    // Initial audio setup
    audio.muted = false;
    audio.defaultMuted = false;

    // Initialize Web Audio Engine
    romanticSound.init();

    // 1. Try playing immediately (Desktop / permissive browsers)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }

    // 2. Universal Touch / Click Unlocker for Mobile & iOS
    const unlockAudio = () => {
      romanticSound.init();
      if (!audio) return;

      audio.muted = false;
      const p = audio.play();
      if (p !== undefined) {
        p.then(() => {
          setIsPlaying(true);
          cleanup();
        }).catch((err) => {
          console.log("Waiting for user tap to play audio:", err);
        });
      }
    };

    const cleanup = () => {
      window.removeEventListener("touchstart", unlockAudio);
      window.removeEventListener("touchend", unlockAudio);
      window.removeEventListener("click", unlockAudio);
    };

    window.addEventListener("touchstart", unlockAudio, { passive: true });
    window.addEventListener("touchend", unlockAudio, { passive: true });
    window.addEventListener("click", unlockAudio, { passive: true });

    return () => {
      cleanup();
    };
  }, []);

  const handleToggle = (e) => {
    if (e) e.stopPropagation();
    
    // Play interaction sound & wake up WebAudio context
    romanticSound.playHeartPop();
    romanticSound.init();

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      
      if (isIOS) {
        // Show temporary hint about iPhone silent hardware switch
        setShowIphoneHint(true);
        setTimeout(() => setShowIphoneHint(false), 6000);
      }

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn("Play error:", err);
        });
    }
  };

  return (
    <>
      {/* Background Audio Element with Direct src and iOS playsInline */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        playsInline
        webkit-playsinline="true"
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={audioSrc} type="audio/mp4" />
        <source src={audioSrc} type="audio/x-m4a" />
      </audio>

      {/* Floating Interactive Music Widget */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="fixed bottom-6 left-4 sm:left-6 z-40 flex flex-col items-start gap-2"
      >
        {/* iPhone Silent Switch Warning Hint (Auto appears if on iPhone) */}
        <AnimatePresence>
          {showIphoneHint && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-ruby-950/95 text-white text-[11px] p-2.5 px-3.5 rounded-2xl shadow-2xl border border-rose-300/40 backdrop-blur-md max-w-[260px] flex items-start gap-2"
            >
              <FaBell className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5 animate-bounce" />
              <span>
                <strong>iPhone note:</strong> Agar awaz na aaye toh iPhone ka <u>Silent Switch (Ringer)</u> ON karein! 🔔
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleToggle}
          className={`flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-xl cursor-pointer ${
            isPlaying
              ? "bg-ruby-600 text-white border-ruby-300 shadow-ruby-500/40 ring-4 ring-ruby-400/25 scale-100"
              : "bg-white/95 text-ruby-800 border-ruby-300 hover:bg-ruby-50 shadow-lg animate-pulse"
          }`}
          title={isPlaying ? "Click to Pause Music" : "Click to Play Background Music"}
        >
          {/* Animated Wave or Equalizer Icon */}
          <div className="relative flex items-center justify-center">
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-4 w-4">
                <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:-0.3s] h-3" />
                <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:-0.1s] h-4" />
                <span className="w-1 bg-white rounded-full animate-bounce [animation-delay:-0.2s] h-2" />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full bg-ruby-100 text-ruby-600 flex items-center justify-center">
                <FaPlay className="w-2.5 h-2.5 ml-0.5" />
              </div>
            )}
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider opacity-85">
              {isPlaying ? "Music Playing 🎵" : "Tap to Play Music"}
            </span>
            <span className="text-[11px] sm:text-xs font-semibold font-serif italic line-clamp-1">
              {isPlaying ? "Sanam Teri Kasam ❤️" : "Sanam Teri Kasam 🎵"}
            </span>
          </div>

          <FaHeart
            className={`w-3.5 h-3.5 ${
              isPlaying ? "text-pink-200 animate-pulse" : "text-ruby-500 animate-bounce"
            }`}
          />
        </button>
      </motion.div>
    </>
  );
};
