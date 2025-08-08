import React from "react";
import { GiSnake, GiGlitch } from "react-icons/gi";

export default function GameTitle() {
  return (
    <div
      className="
        flex items-center justify-center sm:justify-start max-w-full
        px-2
        select-none
        space-x-2
        text-transparent bg-clip-text
        bg-gradient-to-r from-green-400 via-green-600 to-green-800
        font-press-start2p tracking-widest
        drop-shadow-lg
      "
      aria-label="Glitch Cobra game title"
    >
      <GiGlitch size="1.5em" />
      <h1
        className="
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold
          animate-pulse animate-flicker
          whitespace-nowrap
        "
      >
        Glitch Cobra
      </h1>
      <GiSnake size="1.5em" />
    </div>
  );
}
