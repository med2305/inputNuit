"use client";

import { Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

interface SplashEffectProps {
  x: number;
  y: number;
}

export function SplashEffect({ x, y }: SplashEffectProps) {
  return (
    <div
      className="absolute animate-splash pointer-events-none"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="relative">
        {/* Cercles concentriques */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute rounded-full border-2 border-blue-400/40",
              "animate-ripple"
            )}
            style={{
              width: `${(i + 1) * 40}px`,
              height: `${(i + 1) * 40}px`,
              left: `${-(i + 1) * 20}px`,
              top: `${-(i + 1) * 20}px`,
              animationDelay: `${i * 100}ms`
            }}
          />
        ))}
        
        {/* Gouttes d'eau */}
        {[...Array(6)].map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          const distance = 20;
          return (
            <div
              key={`drop-${i}`}
              className="absolute w-2 h-2 bg-blue-400/40 rounded-full animate-drop"
              style={{
                left: Math.cos(angle) * distance,
                top: Math.sin(angle) * distance,
                transform: `rotate(${angle}rad)`,
                animationDelay: `${i * 50}ms`
              }}
            />
          );
        })}
        
        <Droplets className="text-blue-400" />
      </div>
    </div>
  );
}