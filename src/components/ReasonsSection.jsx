import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaCrown } from "react-icons/fa6";
import { sorryData } from "../data/sorryData";

export const ReasonsSection = () => {
  const { reasons } = sorryData;

  return (
    <section id="reasons" className="relative py-20 px-6 max-w-6xl mx-auto z-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ruby-100 text-ruby-700 text-xs font-bold uppercase tracking-wider mb-3">
          <FaCrown className="w-3.5 h-3.5 text-ruby-600" />
          <span>Why You Are My Everything</span>
        </div>
        <h2 className="font-serif font-bold text-3xl sm:text-5xl text-ruby-950 tracking-tight">
          10 Reasons Why <span className="text-ruby-600 italic">Shally</span> Is Special 💖
        </h2>
        <p className="mt-2 text-sm sm:text-base text-ruby-900/70 font-medium">
          Duniya mein lakhon log hain, par mera dil sirf tumhare liye dhadakta hai kyunki:
        </p>
      </div>

      {/* Grid of 10 reasons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="p-6 rounded-3xl romantic-glass-white border border-ruby-200/80 shadow-md hover:shadow-xl hover:border-ruby-400 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-ruby-600 to-rose-500 text-white font-serif font-bold text-base flex items-center justify-center shadow-md shadow-ruby-500/20 mb-4">
                #{index + 1}
              </div>
              <h3 className="font-serif font-bold text-xl text-ruby-950 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-ruby-900/80 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-ruby-100 flex items-center justify-between text-ruby-500">
              <span className="text-xs font-bold uppercase tracking-wider font-sans">Sirf Shally Ke Liye</span>
              <FaHeart className="w-3.5 h-3.5 text-ruby-600" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
