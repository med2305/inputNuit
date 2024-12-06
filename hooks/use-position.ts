"use client";

import { useState, useEffect } from "react";

export function usePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => ({
        x: prev.x + (Math.random() * 2 - 1) * 3,
        y: prev.y + (Math.random() * 2 - 1),
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return position;
}