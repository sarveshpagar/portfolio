import { motion } from "motion/react";

export default function GlobalHUD() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.005] mix-blend-overlay"></div>
      
      {/* Scanline */}
      <div className="absolute inset-0 scanline opacity-5"></div>
    </div>
  );
}
