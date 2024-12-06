"use client";

import { useEffect, useRef } from "react";
import { Howl } from "howler";

export function useAudio() {
  const soundsRef = useRef<{
    water?: Howl;
    success?: Howl;
    ambient?: Howl;
  }>({});

  useEffect(() => {
    soundsRef.current.water = new Howl({
      src: ["/sounds/water-splash.mp3"],
      volume: 0.3,
    });

    soundsRef.current.success = new Howl({
      src: ["/sounds/success.mp3"],
      volume: 0.5,
    });

    soundsRef.current.ambient = new Howl({
      src: ["/sounds/river-ambient.mp3"],
      volume: 0.2,
      loop: true,
    });

    soundsRef.current.ambient?.play();

    return () => {
      Object.values(soundsRef.current).forEach(sound => sound?.unload());
    };
  }, []);

  const playWaterSound = () => soundsRef.current.water?.play();
  const playSuccessSound = () => soundsRef.current.success?.play();

  return {
    playWaterSound,
    playSuccessSound,
  };
}