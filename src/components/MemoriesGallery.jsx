import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaHeart, FaCamera, FaExpand, FaXmark, FaQuoteLeft, FaCrown, FaStar } from "react-icons/fa6";
import { sorryData } from "../data/sorryData";
import { romanticSound } from "../utils/soundSynthesizer";

/**
 * High-End Luxury Editorial Scroll Panel for Shally ❤️
 * Alternating full-width magazine spreads with parallax depth & pure romance
 */
const LuxuryEditorialPanel = ({ item, index, onPhotoUpload, onExpand, onLike }) => {
  const panelRef = useRef(null);
  const isReversed = index % 2 !== 0;

  // Cinematic Scroll-driven Parallax
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);
  const watermarkX = useTransform(
    scrollYProgress,
    [0, 1],
    isReversed ? ["40px", "-40px"] : ["-40px", "40px"]
  );

  return (
    <div
      ref={panelRef}
      className={`relative min-h-[92vh] w-full flex items-center justify-center py-20 px-6 sm:px-10 lg:px-16 overflow-hidden border-b border-rose-100/80 ${
        index % 2 === 0
          ? "bg-gradient-to-b from-rose-50/20 via-white to-rose-50/30"
          : "bg-gradient-to-b from-rose-50/30 via-red-50/15 to-white"
      }`}
    >
      {/* Massive Editorial Watermark Number */}
      <motion.div
        style={{ x: watermarkX }}
        className="absolute top-1/2 -translate-y-1/2 select-none pointer-events-none z-0 opacity-[0.04] font-serif font-black text-[18rem] sm:text-[26rem] lg:text-[34rem] text-ruby-950 leading-none"
      >
        {item.number}
      </motion.div>

      {/* Ambient Luxury Lighting Glows */}
      <div
        className={`absolute top-1/3 ${
          isReversed ? "right-12" : "left-12"
        } w-[500px] h-[500px] bg-rose-400/10 rounded-full blur-[140px] pointer-events-none z-0`}
      />

      {/* Main Luxury Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* =========================================================
            PHOTO COLUMN (Vogue Editorial Frame)
           ========================================================= */}
        <motion.div
          style={{ y: imageY }}
          className={`lg:col-span-6 w-full ${
            isReversed ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="relative mx-auto max-w-lg lg:max-w-none">
            
            {/* Golden/Ruby Ambient Back-drop Frame */}
            <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-tr from-ruby-500/20 via-rose-300/30 to-amber-200/30 rounded-[2.8rem] blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />

            {/* Main Editorial Canvas Frame */}
            <div className="relative rounded-[2.5rem] p-3 bg-white/90 shadow-[0_25px_60px_-15px_rgba(225,29,72,0.18)] border border-rose-200/60 backdrop-blur-md group">
              
              <div className="relative w-full h-[440px] sm:h-[540px] lg:h-[600px] rounded-[2rem] overflow-hidden bg-rose-950">
                
                {/* Real High-Resolution Shally Photo */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Subtle Luxury Film Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                {/* Top Badge: Chapter & Endearment */}
                <div className="absolute top-5 left-5 flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-ruby-900 font-serif font-bold text-xs shadow-md backdrop-blur-md border border-white/80">
                    Chapter {item.number}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-black/50 text-pink-100 font-sans text-[11px] font-medium backdrop-blur-md border border-white/20">
                    {item.pashtoWord}
                  </span>
                </div>

                {/* Top Right Actions (Upload & Zoom) */}
                <div className="absolute top-5 right-5 flex items-center gap-2">
                  <label
                    className="w-10 h-10 rounded-full bg-white/95 text-ruby-800 hover:bg-ruby-600 hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-lg backdrop-blur-md hover:scale-110 active:scale-95 border border-white/60"
                    title="Change or upload new photo"
                  >
                    <FaCamera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => onPhotoUpload(item.id, e)}
                    />
                  </label>

                  <button
                    onClick={() => {
                      romanticSound.playChime();
                      onExpand(item);
                    }}
                    className="w-10 h-10 rounded-full bg-white/95 text-ruby-800 hover:bg-ruby-600 hover:text-white transition-all flex items-center justify-center shadow-lg backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95 border border-white/60"
                    title="View Fullscreen"
                  >
                    <FaExpand className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Overlay Info inside Photo Frame */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[11px] uppercase tracking-widest text-pink-200/90 font-bold block mb-1">
                    {item.moment}
                  </span>
                  <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-white drop-shadow-md">
                    {item.title}
                  </h3>
                </div>

              </div>
            </div>

          </div>
        </motion.div>

        {/* =========================================================
            POETIC EDITORIAL NARRATIVE COLUMN
           ========================================================= */}
        <motion.div
          style={{ y: textY }}
          className={`lg:col-span-6 w-full flex flex-col justify-center space-y-6 ${
            isReversed ? "lg:order-1" : "lg:order-2"
          }`}
        >
          {/* Top Elegant Ribbon Header */}
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-ruby-400" />
            <span className="font-sans text-xs font-extrabold uppercase tracking-widest text-ruby-600">
              PASHTO APOLOGY STORY #{item.number}
            </span>
          </div>

          {/* Pashto Calligraphy Title (Large, majestic & emotional) */}
          <div className="space-y-2">
            <h4
              className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-ruby-950 leading-tight tracking-tight drop-shadow-sm"
              dir="rtl"
            >
              {item.pashtoSorryStyle}
            </h4>
            <p className="font-serif italic text-base sm:text-lg text-ruby-700 font-semibold">
              "{item.pashtoSorryRoman}"
            </p>
          </div>

          {/* The Emotional Apology Quote (High-Fashion Typography) */}
          <div className="relative pl-6 border-l-2 border-ruby-300 py-1">
            <FaQuoteLeft className="w-5 h-5 text-ruby-400/60 mb-2" />
            <p className="font-serif italic text-ruby-900 text-lg sm:text-xl lg:text-2xl leading-relaxed text-balance">
              "{item.quote}"
            </p>
          </div>

          {/* Urdu Translation Scroll (اردو ترجمہ) */}
          {item.urduTranslation && (
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-white/95 to-rose-50/80 border border-rose-200/90 shadow-[0_10px_30px_rgba(225,29,72,0.06)] text-right relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-ruby-400 to-transparent" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-sans font-extrabold uppercase tracking-wider text-ruby-500">
                  اردو ترجمہ (Urdu Meaning)
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-ruby-500" />
              </div>
              <p
                className="font-serif text-ruby-950 text-base sm:text-lg lg:text-xl leading-relaxed font-semibold"
                dir="rtl"
              >
                {item.urduTranslation}
              </p>
            </div>
          )}

          {/* Bottom Interactive Bar */}
          <div className="pt-3 flex items-center justify-between gap-4">
            <span className="text-xs font-semibold text-ruby-600/80 font-sans tracking-wide">
              {item.tag}
            </span>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onLike(item.id)}
              className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-ruby-600 via-rose-600 to-ruby-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-ruby-600/30 hover:shadow-ruby-600/50 transition-all cursor-pointer border border-white/40"
            >
              <FaHeart className="w-3.5 h-3.5 text-pink-200 animate-pulse" />
              <span>{item.likes} Shally Hearts</span>
            </motion.button>
          </div>

        </motion.div>

      </div>
    </div>
  );
};

export const MemoriesGallery = () => {
  // Always use sorryData.memories directly so user images are live & fresh
  const [memoriesList, setMemoriesList] = useState(sorryData.memories);
  const [activePhoto, setActivePhoto] = useState(null);

  const handlePhotoUpload = (id, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImgUrl = e.target.result;
        setMemoriesList((prev) =>
          prev.map((item) => (item.id === id ? { ...item, image: newImgUrl } : item))
        );
        romanticSound.playChime();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLike = (id) => {
    romanticSound.playHeartPop();
    setMemoriesList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  return (
    <section id="memories" className="relative py-28 w-full z-20">
      
      {/* Grand Section Top Introduction */}
      <div className="text-center max-w-4xl mx-auto mb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-rose-200 text-ruby-700 text-xs font-extrabold uppercase tracking-widest mb-4 shadow-sm backdrop-blur-sm"
        >
          <FaHeart className="w-3.5 h-3.5 text-ruby-600 animate-pulse" />
          <span>CINEMATIC EDITORIAL CHAPTERS • FOR SHALLY</span>
          <FaHeart className="w-3.5 h-3.5 text-ruby-600 animate-pulse" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif font-extrabold text-5xl sm:text-7xl md:text-8xl text-ruby-950 tracking-tight leading-[1.08]"
        >
          Visual Chapters of <span className="text-shimmer-romantic italic">My Apology</span> 📸
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 text-base sm:text-xl text-ruby-900/80 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          Har tasveer ka apna full editorial magazine spread — deep Pashto apology words, Urdu translation, and pure unspoken feelings:
        </motion.p>
      </div>

      {/* 10 Full-Width Edge-to-Edge Cinematic Scroll Panels */}
      <div className="w-full space-y-4">
        {memoriesList.map((item, index) => (
          <LuxuryEditorialPanel
            key={item.id}
            item={item}
            index={index}
            onPhotoUpload={handlePhotoUpload}
            onExpand={setActivePhoto}
            onLike={handleLike}
          />
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/30"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110 active:scale-95"
              >
                <FaXmark className="w-5 h-5" />
              </button>

              <div className="max-h-[60vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
              </div>

              <div className="p-8 sm:p-10 bg-white text-ruby-950 space-y-4">
                <div className="flex items-center gap-2 text-ruby-600 font-bold text-xs uppercase tracking-widest">
                  <FaHeart className="w-3.5 h-3.5" />
                  <span>{activePhoto.moment} • {activePhoto.pashtoWord}</span>
                </div>

                <h3 className="font-serif italic font-bold text-3xl sm:text-4xl text-ruby-950">
                  {activePhoto.title}
                </h3>

                {activePhoto.pashtoSorryStyle && (
                  <p className="font-serif text-2xl font-bold text-ruby-700" dir="rtl">
                    {activePhoto.pashtoSorryStyle}
                  </p>
                )}

                <p className="font-serif italic text-lg text-ruby-900/90 leading-relaxed">
                  "{activePhoto.quote}"
                </p>

                {activePhoto.urduTranslation && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-right" dir="rtl">
                    <span className="text-[10px] font-sans font-bold uppercase text-ruby-500 block mb-1 text-left">
                      اردو ترجمہ:
                    </span>
                    <p className="font-serif text-base sm:text-lg text-ruby-950 font-semibold">
                      {activePhoto.urduTranslation}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
