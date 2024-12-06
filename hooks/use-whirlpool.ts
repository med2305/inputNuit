"use client";

import { useState, useEffect } from "react";

export function useWhirlpool() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [intensity, setIntensity] = useState(0);

  useEffect(() => {
    const whirlpoolInterval = setInterval(() => {
      // Augmenter la probabilité d'apparition du tourbillon
      if (Math.random() < 0.1 && !isSpinning) {
        setIsSpinning(true);
        let currentIntensity = 0;
        
        const intensityInterval = setInterval(() => {
          currentIntensity += 0.15; // Accélérer la rotation
          // Créer un effet de rotation plus dynamique
          setIntensity(Math.sin(currentIntensity) * 720); // Doubler l'amplitude de rotation
          
          if (currentIntensity >= Math.PI * 2) { // Faire deux tours complets
            clearInterval(intensityInterval);
            setIsSpinning(false);
            setIntensity(0);
          }
        }, 30); // Réduire l'intervalle pour une animation plus fluide

        return () => clearInterval(intensityInterval);
      }
    }, 3000); // Réduire l'intervalle entre les tourbillons

    return () => clearInterval(whirlpoolInterval);
  }, [isSpinning]);

  return { isSpinning, intensity };
}