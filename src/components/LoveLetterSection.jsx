import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaEnvelopeOpenText, FaEnvelope } from "react-icons/fa6";
import { sorryData } from "../data/sorryData";
import { romanticSound } from "../utils/soundSynthesizer";

export const LoveLetterSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { letter } = sorryData;

  const handleToggle = () => {
    romanticSound.playChime();
    setIsOpen(!isOpen);
  };

  return (
    <section id="letter" className="relative py-20 px-6 max-w-4xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-ruby-100/80 text-ruby-700 text-xs font-bold uppercase tracking-widest mb-3">
          <FaEnvelope className="w-3 h-3 text-ruby-600" />
          <span>د زړه آواز — Special Apology Khat for bestie</span>
        </div>
        <h2 className="font-serif font-bold text-3xl sm:text-5xl text-ruby-950">
          Dil Ka Khat <span className="text-ruby-600 italic">For Zama Grana Shally</span> 💌
        </h2>
        <p className="mt-2 text-sm sm:text-base text-ruby-900/70 font-medium">
          {letter.subheading}
        </p>
      </div>

      {/* Sealed Envelope / Open Letter Interactive Container */}
      <div className="flex flex-col items-center">
        {!isOpen ? (
          /* Sealed Envelope Graphic */
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="w-full max-w-xl p-8 rounded-3xl romantic-glass-white border-2 border-ruby-200 shadow-2xl text-center cursor-pointer relative overflow-hidden group"
            onClick={handleToggle}
          >
            {/* Stamp Detail */}
            <div className="absolute top-6 right-6 w-16 h-18 border-2 border-dashed border-ruby-400 bg-ruby-50/80 rounded flex flex-col items-center justify-center text-ruby-600 shadow-inner">
              <FaHeart className="w-5 h-5 text-ruby-600 animate-pulse" />
              <span className="text-[9px] font-bold mt-1 uppercase">Zama Zargo</span>
            </div>

            {/* Red Wax Seal Badge */}
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-ruby-600 to-rose-700 flex items-center justify-center text-white shadow-xl shadow-ruby-600/40 group-hover:scale-110 transition-transform mb-6 border-2 border-white/60">
              <FaHeart className="w-8 h-8 text-pink-100" />
            </div>

            <h3 className="font-serif italic text-2xl font-bold text-ruby-950 mb-1">
              Khat For Zama Grana Shally
            </h3>
            <span className="text-xs text-ruby-600 font-bold block mb-3 font-serif" dir="rtl">
              د زړه لیک زما د خاصې ملګرې لپاره
            </span>
            <p className="text-ruby-800/80 text-sm mb-6 max-w-sm mx-auto">
              Iss envelope mein dil se maafi aur sachi dosti blky bht achy dosti ki baat band hai. Plz click karke parhein...
            </p>

            <button
              onClick={handleToggle}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-ruby-600 to-rose-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-ruby-600/30 group-hover:shadow-ruby-600/50 transition-all flex items-center gap-2 mx-auto cursor-pointer"
            >
              <FaEnvelopeOpenText className="w-4 h-4" />
              <span>Khat Kholein / د لیک خلاصول</span>
            </button>
          </motion.div>
        ) : (
          /* Unfolded Letter Paper */
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-2xl bg-white/95 rounded-3xl p-8 sm:p-12 shadow-2xl border border-ruby-200 relative overflow-hidden backdrop-blur-md"
            style={{
              backgroundImage: "radial-gradient(#FFE4E8 1px, transparent 1px)",
              backgroundSize: "24px 24px"
            }}
          >
            {/* Top Red Ribbon Border Accent */}
            <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-ruby-600 via-rose-500 to-red-600" />

            {/* Letter Salutation */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-ruby-100">
              <div>
                <span className="font-script text-3xl sm:text-4xl text-ruby-600 font-bold block">
                  {letter.salutation}
                </span>
                <span className="text-[11px] font-sans text-ruby-400 uppercase tracking-widest font-semibold">
                  From Your True Friend & Well-Wisher ❤️
                </span>
              </div>
              <div className="w-12 h-12 rounded-full bg-ruby-50 flex items-center justify-center text-ruby-600 shadow-inner">
                <FaHeart className="w-5 h-5 text-ruby-600" />
              </div>
            </div>

            {/* Letter Body Paragraphs */}
            <div className="space-y-4 font-serif text-ruby-950 text-base sm:text-lg leading-relaxed text-justify sm:text-left">
              {letter.paragraphs.map((p, idx) => (
                <p key={idx} className="first-letter:text-2xl first-letter:font-bold first-letter:text-ruby-600">
                  {p}
                </p>
              ))}
            </div>

            {/* Urdu Translation Box in Love Letter */}
            {letter.urduTranslation && (
              <div className="my-6 p-4 sm:p-5 rounded-2xl bg-ruby-50/90 border border-ruby-200 text-right">
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-ruby-500 block mb-1 text-left">
                  اردو ترجمہ (Khat Ka Urdu Mafhoom):
                </span>
                <p className="font-serif text-ruby-950 text-sm sm:text-base leading-relaxed" dir="rtl">
                  {letter.urduTranslation}
                </p>
              </div>
            )}

            {/* Sign Off & Romantic Stamp */}
            <div className="mt-8 pt-6 border-t border-ruby-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-sans text-xs text-ruby-800/70 italic">
                  {letter.signOff}
                </p>
                <p className="font-script text-2xl sm:text-3xl font-bold text-ruby-700">
                  {letter.signature}
                </p>
              </div>

              <button
                onClick={handleToggle}
                className="px-4 py-2 rounded-full bg-ruby-100 text-ruby-800 text-xs font-bold hover:bg-ruby-200 transition-colors flex items-center gap-1.5 focus:outline-none cursor-pointer"
              >
                <FaEnvelope className="w-3 h-3 text-ruby-600" />
                <span>Khat Band Karein</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
