import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaMagnifyingGlass } from "react-icons/fa6";
import { pashtoLoveWords } from "../data/sorryData";
import { romanticSound } from "../utils/soundSynthesizer";

export const PashtoWordsSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedWord, setSelectedWord] = useState(null);

  const categories = ["All", "Heart", "Soul", "Beauty", "Celestial", "Sweetness", "Royalty", "Grace"];

  const filteredWords = pashtoLoveWords.filter((item) => {
    const matchesSearch =
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.urdu.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pashto.includes(searchTerm);
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCardClick = (item) => {
    romanticSound.playHeartPop();
    setSelectedWord(item);
  };

  return (
    <section id="pashto-words" className="relative py-20 px-6 max-w-7xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-ruby-100 text-ruby-700 text-xs font-bold uppercase tracking-wider mb-3">
          <FaHeart className="w-3.5 h-3.5 text-ruby-600 animate-pulse" />
          <span>د مینې او زړه الفاظ — Pashto Words of Love</span>
        </div>
        <h2 className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl text-ruby-950 tracking-tight">
          Cute Pashto Words <span className="text-shimmer-romantic italic">For Shally</span> 🌹
        </h2>
        <p className="mt-3 text-sm sm:text-lg text-ruby-900/75 font-medium">
          Shally meri jaan, ye wo pyare Pashto alfaz hain jo mere dil ki har dhadkan tumhare liye bolti hai (with Urdu Tarjuma):
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="max-w-3xl mx-auto mb-10 flex flex-col sm:flex-row items-center gap-4">
        {/* Search Bar */}
        <div className="relative w-full">
          <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-ruby-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Pashto word or Urdu tarjuma (e.g. Zargo, Spogmai, Chand, Dil)..."
            className="w-full pl-11 pr-4 py-3 rounded-full romantic-glass-white border border-ruby-200 focus:border-ruby-500 focus:outline-none text-ruby-950 text-sm shadow-sm placeholder:text-ruby-300"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                romanticSound.playChime();
                setActiveCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? "bg-ruby-600 text-white shadow-md shadow-ruby-600/30"
                  : "bg-white/80 text-ruby-800 border border-ruby-200 hover:bg-ruby-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Words Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredWords.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: (index % 10) * 0.04 }}
            whileHover={{ scale: 1.05, y: -4 }}
            onClick={() => handleCardClick(item)}
            className="group p-4 sm:p-5 rounded-2xl romantic-glass-white border border-ruby-200/90 shadow-sm hover:shadow-xl hover:border-ruby-400 transition-all cursor-pointer flex flex-col justify-between text-center relative overflow-hidden"
          >
            {/* Top Pashto Script */}
            <div className="flex items-center justify-between text-xs text-ruby-400 mb-1">
              <span className="font-sans font-bold text-[10px] uppercase tracking-wider text-ruby-500/70">
                #{index + 1}
              </span>
              <span className="font-serif text-base text-ruby-700 font-bold" dir="rtl">
                {item.pashto}
              </span>
            </div>

            {/* Main Roman Pashto Word */}
            <div className="my-2">
              <h3 className="font-serif italic font-bold text-xl sm:text-2xl text-ruby-950 group-hover:text-ruby-600 transition-colors">
                {item.word}
              </h3>
            </div>

            {/* Urdu Meaning & Tarjuma */}
            <div className="pt-2 border-t border-ruby-100">
              <p className="text-xs font-semibold text-ruby-800 line-clamp-1">
                {item.urdu}
              </p>
              <p className="text-[10px] text-ruby-500 italic mt-0.5">
                "{item.meaning}"
              </p>
            </div>

            {/* Hover Heart Icon */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <FaHeart className="w-3 h-3 text-ruby-600 animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>

      {filteredWords.length === 0 && (
        <div className="text-center py-12 text-ruby-400 font-medium">
          Koi lafz nahi mila. Search dobara karein!
        </div>
      )}

      {/* Interactive Word Detail Popup Modal */}
      <AnimatePresence>
        {selectedWord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWord(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border-2 border-ruby-300 text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-ruby-600 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-ruby-500/30 mb-4">
                <FaHeart className="w-7 h-7 animate-pulse text-white" />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-widest text-ruby-500 block mb-1">
                Pashto Endearment for Shally
              </span>

              <h2 className="font-serif italic font-bold text-4xl text-ruby-950 mb-1">
                {selectedWord.word}
              </h2>

              <p className="text-2xl text-ruby-600 font-serif mb-6" dir="rtl">
                {selectedWord.pashto}
              </p>

              <div className="p-4 rounded-2xl bg-ruby-50/80 border border-ruby-200 text-left space-y-2 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ruby-400 block">
                    Urdu Tarjuma (اردو ترجمہ):
                  </span>
                  <p className="font-serif text-lg font-bold text-ruby-950">
                    {selectedWord.urdu}
                  </p>
                </div>

                <div className="pt-2 border-t border-ruby-200/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-ruby-400 block">
                    English Meaning:
                  </span>
                  <p className="text-sm font-medium text-ruby-800">
                    "{selectedWord.meaning}"
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedWord(null)}
                className="w-full py-3 rounded-full bg-gradient-to-r from-ruby-600 to-rose-600 text-white font-bold text-sm tracking-wide shadow-md shadow-ruby-600/30 hover:scale-102 transition-all cursor-pointer"
              >
                Sta Sara Meena Kawom Shally (I Love You) ❤️
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
