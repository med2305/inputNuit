"use client";

import { motion } from "framer-motion";
import { Droplets } from "lucide-react";
import { useEffect, useState } from "react";

export function WaterDroplets() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    setIsClient(true);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isClient) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * windowWidth,
            y: -20,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: window.innerHeight + 20,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <Droplets className="text-blue-300/30" />
        </motion.div>
      ))}
    </div>
  );
}