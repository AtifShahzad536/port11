import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMusic, FaVolumeXmark, FaHeart, FaPlay, FaPause, FaVolumeHigh } from "react-icons/fa6";
import { romanticSound } from "../utils/soundSynthesizer";

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPrompt, setHasPrompt] = useState(false);
  const audioRef = useRef(null);

  // Direct reference to the Sanam Teri Kasam track in /public
  const mp3Path = encodeURI(
    "/Sanam Teri Kasam Title Track Karaoke With Lyrics For Male Singers With Original Female Vocals-edited.mp3"
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.8;
    audio.muted = false;

    // Direct auto-play attempt
    const triggerAudio = () => {
      if (!audio) return;
      audio.muted = false;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setHasPrompt(false);
          })
          .catch(() => {
            // Blocked by browser until first gesture
            setIsPlaying(false);
            setHasPrompt(true);
          });
      }
    };

    triggerAudio();

    // Aggressive universal gesture listener (any touch, click, scroll, hover, key)
    const handleAnyGesture = () => {
      if (audio && audio.paused) {
        audio.muted = false;
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasPrompt(false);
          })
          .catch(() => { });
      }
    };

    const events = [
      "click",
      "touchstart",
      "touchend",
      "scroll",
      "wheel",
      "mousemove",
      "pointerdown",
      "keydown",
    ];

    events.forEach((evt) => {
      window.addEventListener(evt, handleAnyGesture, { passive: true, once: true });
      document.addEventListener(evt, handleAnyGesture, { passive: true, once: true });
    });

    return () => {
      events.forEach((evt) => {
        window.removeEventListener(evt, handleAnyGesture);
        document.removeEventListener(evt, handleAnyGesture);
      });
    };
  }, []);

  const handleToggle = (e) => {
    e.stopPropagation();
    romanticSound.playHeartPop();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.muted = false;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasPrompt(false);
        })
        .catch((err) => {
          console.warn("Audio play blocked", err);
        });
    }
  };

  return (
    <>
      {/* Background Audio Element */}
      <audio
        ref={audioRef}
        src={mp3Path}
        loop
        autoPlay
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Interactive Music Widget */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="fixed bottom-6 left-6 z-40"
      >
        <button
          onClick={handleToggle}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-xl cursor-pointer ${isPlaying
              ? "bg-ruby-600 text-white border-ruby-300 shadow-ruby-500/40 ring-4 ring-ruby-400/25"
              : "bg-white/95 text-ruby-800 border-ruby-200 hover:bg-ruby-50 shadow-md"
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
              <FaVolumeXmark className="w-4 h-4 text-ruby-400" />
            )}
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-85">
              {isPlaying ? "Music Playing 🎵" : "Click to Play Music"}
            </span>
            <span className="text-xs font-semibold font-serif italic">
              {isPlaying ? "Sanam Teri Kasam ❤️" : "Sanam Teri Kasam (Tap to Play)"}
            </span>
          </div>

          <FaHeart className={`w-3.5 h-3.5 ${isPlaying ? "text-pink-200 animate-pulse" : "text-ruby-400"}`} />
        </button>
      </motion.div>
    </>
  );
};
