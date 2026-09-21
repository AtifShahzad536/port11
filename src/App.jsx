import React, { useState, useEffect } from "react";
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
import { PinterestPhotoWall } from "./components/PinterestPhotoWall";

const TIMER_DURATION_MS = 30 * 60 * 1000; // 30 Minutes (in milliseconds)
const STORAGE_KEY = "shally_first_visit_time";

export default function App() {
  const [showPhotoWall, setShowPhotoWall] = useState(true);

  useEffect(() => {
    // 1. Check for URL query params (e.g. ?reset=1 or ?gallery=1)
    const params = new URLSearchParams(window.location.search);
    if (params.get("reset") === "1" || params.get("reset") === "true") {
      localStorage.removeItem(STORAGE_KEY);
      const url = new URL(window.location.href);
      url.searchParams.delete("reset");
      window.history.replaceState({}, document.title, url.pathname);
    }

    if (params.get("gallery") === "1" || params.get("photos") === "1") {
      setShowPhotoWall(true);
      return;
    }

    // 2. Read or initialize first visit timestamp in localStorage
    const storedTime = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();
    let firstVisit = storedTime ? parseInt(storedTime, 10) : null;

    if (!firstVisit || isNaN(firstVisit)) {
      firstVisit = now;
      localStorage.setItem(STORAGE_KEY, now.toString());
    }

    const elapsed = now - firstVisit;
    const remaining = TIMER_DURATION_MS - elapsed;

    if (remaining <= 0) {
      // 30 minutes have already passed!
      setShowPhotoWall(true);
    } else {
      // Set timer to trigger when 30 minutes complete
      const timer = setTimeout(() => {
        setShowPhotoWall(true);
      }, remaining);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleResetTimer = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setShowPhotoWall(false);
  };

  // If 30 minutes have passed, show only the Pinterest-style seamless photo gallery
  if (showPhotoWall) {
    return <PinterestPhotoWall onReset={handleResetTimer} />;
  }

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
