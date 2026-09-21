import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaXmark } from "react-icons/fa6";
import { MusicPlayer } from "./MusicPlayer";

const shallyPhotos = [
  "/images/WhatsApp Image 2026-08-24 at 11.45.34 PM.jpeg",
  "/images/WhatsApp Image 2026-08-24 at 11.53.17 PM.jpeg",
  "/images/WhatsApp Image 2026-09-21 at 12.45.21 AM.jpeg",
  "/images/Gemini_Generated_Image_lyf6k5lyf6k5lyf6.jpg",
  "/images/Gemini_Generated_Image_szf0hyszf0hyszf0.jpg",
  "/images/WhatsApp Image 2026-08-24 at 11.45.34 PM.jpeg",
  "/images/WhatsApp Image 2026-09-21 at 12.45.21 AM.jpeg",
  "/images/Gemini_Generated_Image_lyf6k5lyf6k5lyf6.jpg",
  "/images/WhatsApp Image 2026-08-24 at 11.53.17 PM.jpeg",
  "/images/Gemini_Generated_Image_szf0hyszf0hyszf0.jpg",
  "/images/WhatsApp Image 2026-09-21 at 12.45.21 AM.jpeg",
  "/images/WhatsApp Image 2026-08-24 at 11.45.34 PM.jpeg",
  "/images/Gemini_Generated_Image_szf0hyszf0hyszf0.jpg",
  "/images/WhatsApp Image 2026-08-24 at 11.53.17 PM.jpeg",
  "/images/Gemini_Generated_Image_lyf6k5lyf6k5lyf6.jpg",
];

export const PinterestPhotoWall = ({ onReset }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="relative min-h-screen w-full bg-black overflow-x-hidden select-none">
      {/* Background Music Player */}
      <MusicPlayer />

      {/* Seamless Pinterest Masonry Photo Grid - Zero Gap & No Text */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-0 space-y-0 p-0 m-0 w-full leading-none">
        {shallyPhotos.map((imgSrc, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: (idx % 10) * 0.05 }}
            className="relative overflow-hidden cursor-pointer group break-inside-avoid block p-0 m-0 border-0"
            onClick={() => setSelectedImage(imgSrc)}
          >
            <img
              src={imgSrc}
              alt=""
              loading="lazy"
              className="w-full h-auto object-cover block transition-transform duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
            />
            {/* Subtle gloss hover overlay */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal on Photo Click */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 cursor-pointer"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-5 right-5 z-50 w-12 h-12 rounded-full bg-white/20 text-white hover:bg-white/40 flex items-center justify-center transition-all cursor-pointer shadow-2xl backdrop-blur-lg"
            >
              <FaXmark className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              src={selectedImage}
              alt=""
              className="max-w-full max-h-[92vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Secret subtle reset button (bottom right corner) for testing / toggle */}
      {onReset && (
        <button
          onClick={onReset}
          className="fixed bottom-3 right-3 z-30 opacity-20 hover:opacity-100 transition-opacity bg-black/60 text-white/80 hover:text-white text-[10px] px-2.5 py-1 rounded-full border border-white/20 cursor-pointer backdrop-blur-sm"
          title="Reset timer & return to portfolio"
        >
          ↺ Reset
        </button>
      )}
    </div>
  );
};
