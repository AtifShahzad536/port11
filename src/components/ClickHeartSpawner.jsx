import React, { useState, useEffect } from "react";
import { romanticSound } from "../utils/soundSynthesizer";

const cutePashtoWords = [
  "Zargo (زړګو) ❤️",
  "Zama Spogmai 🌙",
  "Zargiya (زړګیه) 🥺",
  "Khwaga Shally 💕",
  "Zama Rana ✨",
  "Zrajaan (زړه جان) 💖",
  "Bakhana Raka 🌹",
  "Shahzadi Shally 👑",
  "Grana Shally ❤️",
  "Janman 🌹",
  "Guljana 🌸",
  "Sorry Shally 🥺",
  "Sta Na Qurban 💕",
  "Zama Malaka 💍"
];

export const ClickHeartSpawner = () => {
  const [floatingTexts, setFloatingTexts] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const id = Date.now() + Math.random();
      const randomWord = cutePashtoWords[Math.floor(Math.random() * cutePashtoWords.length)];
      
      const newSpawn = {
        id,
        x: e.clientX,
        y: e.clientY,
        text: randomWord,
        scale: Math.random() * 0.4 + 0.9,
        rot: (Math.random() - 0.5) * 30
      };

      setFloatingTexts((prev) => [...prev.slice(-15), newSpawn]);
      romanticSound.playHeartPop();

      setTimeout(() => {
        setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
      }, 1400);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {floatingTexts.map((item) => (
        <div
          key={item.id}
          className="absolute flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 text-ruby-600 font-script font-bold text-lg md:text-xl shadow-xl border border-ruby-200 animate-float-up pointer-events-none"
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
            transform: `translate(-50%, -50%) rotate(${item.rot}deg) scale(${item.scale})`
          }}
        >
          <span>❤️</span>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
};
