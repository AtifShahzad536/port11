import React from "react";
import { FloatingParticlesCanvas } from "./components/FloatingParticlesCanvas";
import { ClickHeartSpawner } from "./components/ClickHeartSpawner";
import { MusicPlayer } from "./components/MusicPlayer";
import { AutoScrollController } from "./components/AutoScrollController";
import { RomanticNavbar } from "./components/RomanticNavbar";
import { HeroSection } from "./components/HeroSection";
import { LoveLetterSection } from "./components/LoveLetterSection";
import { PashtoWordsSection } from "./components/PashtoWordsSection";
import { MemoriesGallery } from "./components/MemoriesGallery";
import { ReasonsSection } from "./components/ReasonsSection";
import { PromisesSection } from "./components/PromisesSection";
import { ForgiveGame } from "./components/ForgiveGame";
import { RomanticFooter } from "./components/RomanticFooter";

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#FFF5F6] text-[#4C0519] selection:bg-ruby-600 selection:text-white overflow-x-hidden">
      {/* 60fps Floating Hearts & Falling Rose Petals Canvas */}
      <FloatingParticlesCanvas />

      {/* Click-anywhere Floating Hearts & Words */}
      <ClickHeartSpawner />

      {/* Procedural Romantic Melody Player */}
      <MusicPlayer />

      {/* Cinematic Automatic & Manual Scroll Controller */}
      <AutoScrollController />

      {/* Top Navbar */}
      <RomanticNavbar />

      {/* Main Content Sections */}
      <main className="relative z-20">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Interactive Love Letter ("Dard-e-Dil Khat") */}
        <LoveLetterSection />

        {/* 3. Dedicated Pashto Cute Love Words Showcase & Dictionary */}
        <PashtoWordsSection />

        {/* 4. The 10 Memories & Cute Ashiq Quotes (with Urdu translation) */}
        <MemoriesGallery />

        {/* 5. 10 Reasons Why Shally Is Special */}
        <ReasonsSection />

        {/* 6. 5 Sacred Love Promises */}
        <PromisesSection />

        {/* 7. Interactive Forgiveness Game (Dodging No & Confetti Yes) */}
        <ForgiveGame />
      </main>

      {/* Footer */}
      <RomanticFooter />
    </div>
  );
}
