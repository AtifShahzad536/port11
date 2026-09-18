import React from "react";
import { motion } from "framer-motion";
import { FaHeart, FaHandHoldingHeart, FaCheck, FaShieldHeart } from "react-icons/fa6";
import { sorryData } from "../data/sorryData";

export const PromisesSection = () => {
  const { promises } = sorryData;

  return (
    <section id="promises" className="relative py-20 px-6 max-w-5xl mx-auto z-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ruby-100 text-ruby-700 text-xs font-bold uppercase tracking-wider mb-3">
          <FaShieldHeart className="w-3.5 h-3.5 text-ruby-600" />
          <span>Dil Se Kiye Gaye Waday</span>
        </div>
        <h2 className="font-serif font-bold text-3xl sm:text-5xl text-ruby-950 tracking-tight">
          Mere 5 Pakke <span className="text-ruby-600 italic">Waday</span> 💍
        </h2>
        <p className="mt-2 text-sm sm:text-base text-ruby-900/70 font-medium">
          Ye koi aam waday nahi hain, ye mere dil ka har lamha nibhane wala qaul hai:
        </p>
      </div>

      {/* Promises List */}
      <div className="space-y-4">
        {promises.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="p-5 sm:p-6 rounded-2xl romantic-glass-white border border-ruby-200/90 shadow-md hover:shadow-lg hover:border-ruby-400 transition-all flex items-center gap-4 sm:gap-6"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-ruby-600 to-rose-500 text-white font-serif font-bold text-lg flex-shrink-0 flex items-center justify-center shadow-md shadow-ruby-600/30">
              <FaCheck className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <span className="text-[11px] uppercase font-bold tracking-widest text-ruby-500 block mb-0.5">
                Wada #{item.id}
              </span>
              <p className="font-serif italic font-medium text-ruby-950 text-base sm:text-lg">
                "{item.text}"
              </p>
            </div>
            <FaHeart className="w-5 h-5 text-ruby-400 flex-shrink-0" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
