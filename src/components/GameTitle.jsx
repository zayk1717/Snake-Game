import React from "react";

export default function GameTitle() {
  return (
    <h1
      className="
        text-3xl 
        font-extrabold
        text-transparent bg-clip-text
        bg-gradient-to-r from-green-400 via-green-600 to-green-800
        font-press-start2p
        tracking-widest
        drop-shadow-lg
        select-none
        whitespace-nowrap
        animate-pulse
        px-2 sm:px-4
        text-center sm:text-left
      "
      style={{ fontFamily: '"Press Start 2P", cursive' }}
      aria-label="Glitch Cobra game title"
    >
      Glitch Cobra
    </h1>
  );
}
