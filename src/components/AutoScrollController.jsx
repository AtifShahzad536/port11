import React, { useEffect, useRef } from "react";

export const AutoScrollController = () => {
  const isPausedByUserRef = useRef(false);
  const speedRef = useRef(2.2); // Fast, smooth cinematic scroll speed
  const pauseTimeoutRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Handle user manual scroll / touch / drag interruptions
  useEffect(() => {
    const handleUserInteraction = () => {
      isPausedByUserRef.current = true;

      // Clear any previous timer
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }

      // Resume auto-scroll 1.8s after user stops scrolling/touching
      pauseTimeoutRef.current = setTimeout(() => {
        isPausedByUserRef.current = false;
      }, 1800);
    };

    window.addEventListener("wheel", handleUserInteraction, { passive: true });
    window.addEventListener("touchmove", handleUserInteraction, { passive: true });
    window.addEventListener("touchstart", handleUserInteraction, { passive: true });
    window.addEventListener("pointerdown", handleUserInteraction, { passive: true });
    window.addEventListener("keydown", (e) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Space", "Home", "End"].includes(e.code)) {
        handleUserInteraction();
      }
    }, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("touchmove", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
      window.removeEventListener("pointerdown", handleUserInteraction);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  // Continuous Sub-pixel Auto-Scroll Engine
  useEffect(() => {
    let accumulatedScroll = window.scrollY || window.pageYOffset || 0;
    let isRunning = true;

    const scrollLoop = () => {
      if (!isRunning) return;

      if (!isPausedByUserRef.current) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY || window.pageYOffset || 0;

        // If at the bottom, stop smoothly
        if (currentScroll < maxScroll - 5) {
          accumulatedScroll = currentScroll + speedRef.current;
          window.scrollTo(0, accumulatedScroll);
        }
      }

      animationFrameRef.current = requestAnimationFrame(scrollLoop);
    };

    // Small initial delay so hero section is viewed first
    const startDelay = setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(scrollLoop);
    }, 1500);

    return () => {
      isRunning = false;
      clearTimeout(startDelay);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Headless - No buttons on the screen
  return null;
};
