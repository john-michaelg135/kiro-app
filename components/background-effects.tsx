"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * Floating gradient orbs that animate continuously in the background.
 */
export function BackgroundOrbs() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -1 }}
    >
      {/* Orb 1 - Large, slow drift top-left */}
      <motion.div
        animate={{
          x: [0, 80, -60, 40, 0],
          y: [0, -70, 50, -40, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute rounded-full"
        style={{
          top: "-100px",
          left: "-100px",
          width: "500px",
          height: "500px",
          opacity: 0.15,
          background: "radial-gradient(circle, rgb(var(--color-primary)), transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* Orb 2 - Medium, right side */}
      <motion.div
        animate={{
          x: [0, -50, 70, -30, 0],
          y: [0, 60, -80, 30, 0],
          scale: [1, 0.9, 1.15, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute rounded-full"
        style={{
          top: "30%",
          right: "-80px",
          width: "400px",
          height: "400px",
          opacity: 0.1,
          background: "radial-gradient(circle, rgb(var(--color-tertiary)), transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* Orb 3 - Bottom left */}
      <motion.div
        animate={{
          x: [0, 40, -30, 60, 0],
          y: [0, -50, 40, -60, 0],
          scale: [1, 1.2, 0.85, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 7 }}
        className="absolute rounded-full"
        style={{
          bottom: "10%",
          left: "20%",
          width: "350px",
          height: "350px",
          opacity: 0.12,
          background: "radial-gradient(circle, rgb(var(--color-secondary)), transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* Orb 4 - Center large ambient */}
      <motion.div
        animate={{
          x: [0, -70, 50, -40, 0],
          y: [0, 40, -50, 70, 0],
          scale: [1, 1.05, 0.9, 1.1, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 10 }}
        className="absolute rounded-full"
        style={{
          top: "40%",
          left: "40%",
          width: "600px",
          height: "600px",
          opacity: 0.06,
          background: "radial-gradient(circle, rgb(var(--color-primary)), transparent 60%)",
          willChange: "transform",
        }}
      />
    </div>
  );
}

/**
 * A soft glowing circle that follows the cursor with spring physics.
 */
export function CursorGlow() {
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.5 });

  const visible = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) {
      if (containerRef.current) containerRef.current.style.display = "none";
      return;
    }

    function handleMouseMove(e: MouseEvent) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible.current && containerRef.current) {
        containerRef.current.style.opacity = "1";
        visible.current = true;
      }
    }

    function handleMouseLeave() {
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
        visible.current = false;
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: 0,
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Outer soft glow */}
      <div
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgb(var(--color-primary) / 0.1) 0%, transparent 70%)",
        }}
      />
      {/* Inner bright spot */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgb(var(--color-primary) / 0.2) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
