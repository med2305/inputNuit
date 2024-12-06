"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fish } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FishSchoolProps {
  isActive: boolean;
  letterCount: number;
}

export function FishSchool({ isActive, letterCount }: FishSchoolProps) {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Poissons en arrière-plan */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-sm aspect-[2/1]">
          {Array.from({ length: Math.min(10, Math.max(3, letterCount)) }).map((_, i) => {
            const position = {
              x: 10 + Math.random() * 80,
              y: 10 + Math.random() * 80,
              rotation: Math.random() * 360,
            };

            return (
              <motion.div
                key={i}
                initial={{
                  x: `${position.x}%`,
                  y: `${position.y}%`,
                  rotate: position.rotation,
                  scale: 0.5 + Math.random() * 0.5,
                }}
                animate={{
                  x: `${position.x}%`,
                  y: `${position.y}%`,
                  rotate: position.rotation,
                  scale: [0.8, 1, 0.8],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className={cn(
                  "absolute transition-all duration-500",
                  isActive ? "opacity-100" : "opacity-0"
                )}
              >
                <Fish
                  className={cn(
                    "text-blue-500/50"
                  )}
                  size={20}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}