"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Floating gradient orbs that animate continuously in the background.
 * GPU-safe: only animates transform and opacity.
 */
export function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Orb 1 - Large, slow drift */}
      <motion.div
        animate={{
          x: [0, 80, -60, 40, 0],
          y: [0, -70, 50, -40, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.12]"
        style={{ background: "radial-gradient(circle, rgb(var(--color-primary)), transparent 70%)" }}
      />

      {/* Orb 2 - Medium, faster */}
      <motion.div
        animate={{
          x: [0, -50, 70, -30, 0],
          y: [0, 60, -80, 30, 0],
          scale: [1, 0.9, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-1/3 -right-24 w-[400px] h-[400px] rounded-full opacity-[0.08]"
        style={{ background: "radial-gradient(circle, rgb(var(--color-tertiary)), transparent 70%)" }}
      />

      {/* Orb 3 - Small, snappy */}
      <motion.div
        animate={{
          x: [0, 40, -30, 60, 0],
          y: [0, -50, 40, -60, 0],
          scale: [1, 1.2, 0.85, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 7 }}
        className="absolute bottom-16 left-1/4 w-[300px] h-[300px] rounded-full opacity-[0.1]"
        style={{ background: "radial-gradient(circle, rgb(var(--color-secondary)), transparent 70%)" }}
      />

      {/* Orb 4 - Accent glow, drifts center */}
      <motion.div
        animate={{
          x: [0, -70, 50, -40, 0],
          y: [0, 40, -50, 70, 0],
          scale: [1, 1.05, 0.9, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 10 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle, rgb(var(--color-primary)), transparent 60%)" }}
      />

      {/* Subtle noise/grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

/**
 * A soft glowing circle that follows the cursor with spring physics.
 * Uses useMotionValue to avoid re-renders — GPU only.
 */
export function CursorGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show on devices with fine pointer (not touch)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    function handleMouseMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
      }
    }

    function handleMouseLeave() {
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed top-0 left-0 -z-5 pointer-events-none opacity-0"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        transition: "opacity 0.3s ease",
      }}
    >
      {/* Outer soft glow */}
      <div
        className="w-[350px] h-[350px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgb(var(--color-primary) / 0.08) 0%, transparent 70%)",
        }}
      />
      {/* Inner bright spot */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgb(var(--color-primary) / 0.12) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
