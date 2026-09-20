import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMusic, FaVolumeXmark, FaHeart, FaPlay, FaPause, FaVolumeHigh } from "react-icons/fa6";
import { romanticSound } from "../utils/soundSynthesizer";

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPrompt, setHasPrompt] = useState(true);
  const audioRef = useRef(null);

  // Clean, direct audio path for 100% mobile compatibility (iOS Safari & Android)
  const audioSrc = "/sanam-teri-kasam.m4a";

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.85;
    audio.muted = false;

    // 1. Initial attempt to play (works on desktop)
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasPrompt(false);
        })
        .catch(() => {
          // Mobile browser blocked initial autoplay (Standard iOS/Android security)
          setIsPlaying(false);
          setHasPrompt(true);
        });
    }

    // 2. Persistent Mobile Gesture Unlocker
    // Stays active until user actually touches or clicks anywhere
    const unlockMobileAudio = () => {
      if (!audio) return;
      audio.muted = false;
      audio.volume = 0.85;

      const p = audio.play();
      if (p !== undefined) {
        p.then(() => {
          setIsPlaying(true);
          setHasPrompt(false);
          removeGestureListeners();
        }).catch((err) => {
          // Keep listeners active if not yet unlocked
          console.log("Audio unlock waiting for gesture:", err);
        });
      }
    };

    const gestureEvents = ["touchstart", "touchend", "click", "pointerup"];

    const addGestureListeners = () => {
      gestureEvents.forEach((evt) => {
        window.addEventListener(evt, unlockMobileAudio, { passive: true });
        document.addEventListener(evt, unlockMobileAudio, { passive: true });
      });
    };

    const removeGestureListeners = () => {
      gestureEvents.forEach((evt) => {
        window.removeEventListener(evt, unlockMobileAudio);
        document.removeEventListener(evt, unlockMobileAudio);
      });
    };

    addGestureListeners();

    return () => {
      removeGestureListeners();
    };
  }, []);

  const handleToggle = (e) => {
    if (e) {
      e.stopPropagation();
    }
    romanticSound.playHeartPop();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      audio.volume = 0.85;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasPrompt(false);
        })
        .catch((err) => {
          console.warn("Manual audio play error:", err);
        });
    }
  };

  return (
    <>
      {/* Background Audio Element with Mobile & iOS Attributes */}
      <audio
        ref={audioRef}
        loop
        playsInline
        webkit-playsinline="true"
        preload="auto"
        onPlay={() => {
          setIsPlaying(true);
          setHasPrompt(false);
        }}
        onPause={() => setIsPlaying(false)}
      >
        <source src={audioSrc} type="audio/mp4" />
        <source src={audioSrc} type="audio/x-m4a" />
        <source src={audioSrc} type="audio/aac" />
        Your browser does not support the audio element.
      </audio>

      {/* Floating Interactive Music Widget */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="fixed bottom-6 left-4 sm:left-6 z-40"
      >
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
