import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaHeart, FaCamera, FaExpand, FaXmark, FaQuoteLeft } from "react-icons/fa6";
import { sorryData } from "../data/sorryData";
import { romanticSound } from "../utils/soundSynthesizer";

/**
 * Single Full-Height Cinematic Scroll Panel Component with Parallax
 */
const CinematicPanel = ({ item, index, onPhotoUpload, onExpand, onLike }) => {
  const panelRef = useRef(null);
  const isReversed = index % 2 !== 0;

  // Scroll Parallax for Image & Text
  const { scrollYProgress } = useScroll({
    target: panelRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.03, 0.98]);
  const textY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const watermarkX = useTransform(scrollYProgress, [0, 1], isReversed ? ["50px", "-50px"] : ["-50px", "50px"]);

  return (
    <div
      ref={panelRef}
      className={`relative min-h-[88vh] lg:min-h-[95vh] w-full flex items-center justify-center py-16 px-4 sm:px-8 lg:px-14 border-b border-ruby-200/50 overflow-hidden ${
        index % 2 === 0 ? "bg-gradient-to-b from-transparent via-rose-50/40 to-transparent" : "bg-gradient-to-b from-rose-50/40 via-red-50/20 to-transparent"
      }`}
    >
      {/* Huge Background Watermark Number (Parallax Scroll) */}
      <motion.div
        style={{ x: watermarkX }}
        className="absolute top-1/2 -translate-y-1/2 select-none pointer-events-none z-0 opacity-[0.06] font-serif font-black text-[15rem] sm:text-[22rem] lg:text-[28rem] text-ruby-950 leading-none"
      >
        {item.number}
      </motion.div>

      {/* Ambient Radial Lighting */}
      <div
        className={`absolute top-1/3 ${
          isReversed ? "right-10" : "left-10"
        } w-96 h-96 bg-red-400/15 rounded-full blur-[120px] pointer-events-none z-0`}
      />

      {/* Main 50/50 Full Width Fluid Panel Grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* =========================================================
            IMAGE HALF PANEL (Alternates Left vs Right)
           ========================================================= */}
        <motion.div
          style={{ y: imageY, scale: imageScale }}
          className={`lg:col-span-6 w-full ${
            isReversed ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/90 group">
            {/* Background Fullscreen Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
            />

            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            {/* Top Floating Badges */}
            <div className="absolute top-5 left-5 flex items-center gap-2.5">
              <span className="w-11 h-11 rounded-2xl bg-white/95 text-ruby-700 font-serif font-bold text-lg flex items-center justify-center shadow-lg backdrop-blur-md border border-white/60">
                {item.number}
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-black/60 text-white font-sans text-xs font-semibold backdrop-blur-md border border-white/20">
                {item.moment}
              </span>
            </div>

            {/* Top Right Action Buttons (Upload & Fullscreen) */}
            <div className="absolute top-5 right-5 flex items-center gap-2">
              <label
                className="w-10 h-10 rounded-full bg-white/95 text-ruby-700 hover:bg-ruby-600 hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-lg backdrop-blur-md hover:scale-110 active:scale-95"
                title="Upload Shally's Real Picture"
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
                className="w-10 h-10 rounded-full bg-white/95 text-ruby-700 hover:bg-ruby-600 hover:text-white transition-all flex items-center justify-center shadow-lg backdrop-blur-md cursor-pointer hover:scale-110 active:scale-95"
                title="View Fullscreen"
              >
                <FaExpand className="w-4 h-4" />
              </button>
            </div>

            {/* Bottom Photo Title & Pashto Endearment */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="inline-block px-3 py-1 rounded-full bg-ruby-600/95 text-white font-bold text-xs uppercase tracking-wider mb-2 backdrop-blur-md border border-white/30">
                {item.pashtoWord}
              </span>
              <h3 className="font-serif italic font-bold text-2xl sm:text-3xl text-white drop-shadow-md">
                {item.title}
              </h3>
            </div>
          </div>
        </motion.div>

        {/* =========================================================
            STORY & APOLOGY HALF PANEL (Alternates Left vs Right)
           ========================================================= */}
        <motion.div
          style={{ y: textY }}
          className={`lg:col-span-6 w-full flex flex-col justify-center space-y-6 ${
            isReversed ? "lg:order-1" : "lg:order-2"
          }`}
        >
          {/* Top Heart Pulse + Calligraphic Pashto Sorry Headline */}
          <div className="flex items-start gap-4 sm:gap-5">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onLike(item.id)}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-ruby-600 via-rose-600 to-red-600 flex items-center justify-center text-white shadow-2xl shadow-ruby-600/50 border-4 border-white/90 animate-heartbeat flex-shrink-0 cursor-pointer"
              title="Click to give heartbeats!"
            >
              <FaHeart className="w-10 h-10 sm:w-12 sm:h-12 text-pink-100 drop-shadow-md" />
            </motion.div>

            <div className="flex-1">
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-ruby-500 block mb-1">
                Pashto Sorry Chapter #{item.number}:
              </span>
              <h4 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-ruby-950 leading-tight" dir="rtl">
                {item.pashtoSorryStyle}
              </h4>
              <p className="text-xs sm:text-sm text-ruby-600 font-semibold italic mt-1 font-serif">
                "{item.pashtoSorryRoman}"
              </p>
            </div>
          </div>

          {/* Main Roman Words Narrative Block */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/95 border-2 border-ruby-200 shadow-xl backdrop-blur-md relative">
            <FaQuoteLeft className="w-6 h-6 text-ruby-300 mb-2.5" />
            <p className="font-serif italic text-ruby-950 text-base sm:text-lg lg:text-xl leading-relaxed">
              "{item.quote}"
            </p>
          </div>

          {/* Urdu Translation Panel (اردو ترجمہ) */}
          {item.urduTranslation && (
            <div className="p-5 rounded-2xl bg-ruby-50/95 border border-ruby-300 shadow-sm text-right">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-ruby-500 block mb-1 text-left">
                اردو ترجمہ (Urdu Tarjuma):
              </span>
              <p className="font-serif text-ruby-950 text-sm sm:text-base lg:text-lg leading-relaxed font-semibold" dir="rtl">
                {item.urduTranslation}
              </p>
            </div>
          )}

          {/* Bottom Tags & Interactive Like Heart Button */}
          <div className="pt-2 flex items-center justify-between gap-4">
            <span className="text-xs font-semibold text-ruby-500 font-sans tracking-wide">
              {item.tag}
            </span>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onLike(item.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-ruby-600 to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-ruby-600/30 hover:shadow-ruby-600/50 transition-all cursor-pointer border border-white/30"
            >
              <FaHeart className="w-3.5 h-3.5 text-pink-200 animate-pulse" />
              <span>{item.likes} Shally Likes</span>
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export const MemoriesGallery = () => {
  const [memoriesList, setMemoriesList] = useState(() => {
    try {
      const saved = localStorage.getItem("shally_custom_memories_panels_v1");
      return saved ? JSON.parse(saved) : sorryData.memories;
    } catch (e) {
      return sorryData.memories;
    }
  });

  const [activePhoto, setActivePhoto] = useState(null);
  const [likedIds, setLikedIds] = useState({});

  useEffect(() => {
    try {
      localStorage.setItem("shally_custom_memories_panels_v1", JSON.stringify(memoriesList));
    } catch (e) {}
  }, [memoriesList]);

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
    setLikedIds((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setMemoriesList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item))
    );
  };

  return (
    <section id="memories" className="relative py-24 w-full z-20">
      {/* Grand Section Top Introduction */}
      <div className="text-center max-w-4xl mx-auto mb-16 px-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ruby-100 text-ruby-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm border border-ruby-200">
          <FaHeart className="w-3.5 h-3.5 text-ruby-600 animate-pulse" />
          <span>FLUID STORY PANELS • 10 CHAPTERS FOR SHALLY</span>
        </div>
        <h2 className="font-serif font-bold text-4xl sm:text-6xl md:text-7xl text-ruby-950 tracking-tight leading-tight">
          Shally's Visual <span className="text-shimmer-romantic italic">Scroll Panels</span> 📸
        </h2>
        <p className="mt-4 text-base sm:text-xl text-ruby-900/80 font-medium max-w-2xl mx-auto leading-relaxed">
          Har tasveer ka apna full cinematic panel — kabi picture left, kabi right, scroll parallax animations, aur Pashto sorry calligraphy:
        </p>
      </div>

      {/* 10 Full-Width Edge-to-Edge Cinematic Scroll Panels */}
      <div className="w-full">
        {memoriesList.map((item, index) => (
          <CinematicPanel
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
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors cursor-pointer"
              >
                <FaXmark className="w-5 h-5" />
              </button>

              <div className="max-h-[55vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="w-full h-auto max-h-[55vh] object-contain"
                />
              </div>

              <div className="p-6 sm:p-8 bg-white text-ruby-950">
                <div className="flex items-center gap-2 mb-2 text-ruby-600 font-bold text-xs uppercase tracking-wider">
                  <FaHeart className="w-3.5 h-3.5" />
                  <span>{activePhoto.moment} • {activePhoto.pashtoWord}</span>
                </div>
                <h3 className="font-serif italic font-bold text-2xl sm:text-3xl mb-1">
                  {activePhoto.title}
                </h3>
                {activePhoto.pashtoSorryStyle && (
                  <p className="font-serif text-lg font-bold text-ruby-700 mb-2" dir="rtl">
                    {activePhoto.pashtoSorryStyle}
                  </p>
                )}
                <p className="font-serif italic text-base text-ruby-900/90 leading-relaxed mb-3">
                  "{activePhoto.quote}"
                </p>
                {activePhoto.urduTranslation && (
                  <p className="font-serif text-sm sm:text-base text-ruby-700/90 bg-ruby-50 p-3 rounded-xl border border-ruby-200 mb-3 text-right" dir="rtl">
                    {activePhoto.urduTranslation}
                  </p>
                )}
                <span className="text-xs font-semibold text-ruby-500">
                  {activePhoto.tag}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
