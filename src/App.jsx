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
import { FloatingCountdownTimer } from "./components/FloatingCountdownTimer";

const TIMER_DURATION_MS = 20 * 60 * 1000; // 20 Minutes (in milliseconds)
const STORAGE_KEY = "shally_first_visit_time";

export default function App() {
  const [showPhotoWall, setShowPhotoWall] = useState(false);
  const [remainingMs, setRemainingMs] = useState(TIMER_DURATION_MS);

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

    // 3. Live 1-second countdown ticker
    const updateCountdown = () => {
      const currentNow = Date.now();
      const elapsed = currentNow - firstVisit;
      const left = Math.max(0, TIMER_DURATION_MS - elapsed);
      setRemainingMs(left);

      if (left <= 0) {
        setShowPhotoWall(true);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleResetTimer = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.setItem(STORAGE_KEY, Date.now().toString());
    setRemainingMs(TIMER_DURATION_MS);
    setShowPhotoWall(false);
  };

  // If 20 minutes have passed, show only the Pinterest-style seamless photo gallery with gallery song
  if (showPhotoWall) {
    return <PinterestPhotoWall onReset={handleResetTimer} />;
  }

  return (
    <div className="relative min-h-screen bg-[#FFF5F6] text-[#4C0519] selection:bg-ruby-600 selection:text-white overflow-x-hidden">
      {/* 60fps Floating Hearts & Falling Rose Petals Canvas */}
      <FloatingParticlesCanvas />

      {/* Click-anywhere Floating Hearts & Words */}
      <ClickHeartSpawner />

      {/* Main Portfolio Music Player (Plays portfolio-song.mp3) */}
      <MusicPlayer audioSrc="/portfolio-song.mp3" trackTitle="Sanam Teri Kasam ❤️" />

      {/* Live Floating 20-Minute Countdown Timer Widget on Bottom Right */}
      <FloatingCountdownTimer remainingMs={remainingMs} />

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
