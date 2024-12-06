"use client";

import { RiverInput } from "@/components/river-input";
import { WaterBackground } from "@/components/water-background";
import { FishSchool } from "@/components/river/fish-school";
import { WaterDroplets } from "@/components/river/water-droplets";

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-blue-50">
      <WaterBackground />
      <FishSchool />
      <WaterDroplets />
      <div className="relative z-10 flex h-full items-center justify-center">
        <RiverInput />
      </div>
    </main>
  );
}