"use client";

import ReactConfetti from "react-confetti";
import { useConfettiStore } from "@/hooks/use-confetti-store";

export const ConfettiProvider = () => {
  const confetti = useConfettiStore();

  if (!confetti.isOpen) return null;

  return (
    <ReactConfetti
      recycle={false}
      className="pointer-events-none z-[9999]"
      numberOfPieces={1000}
      onConfettiComplete={() => confetti.onClose()}
    />
  );
};
