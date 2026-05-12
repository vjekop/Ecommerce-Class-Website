'use client';

import { Hero } from '@/components/ui/Hero';
import { Scene } from '@/components/3d/Scene';
import { Model, preloadModel } from '@/components/3d/Model';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const models = [
  {
    name: 'Berserk',
    path: '/models/berserk.glb',
    title: 'The Black Swordsman',
    character: 'Guts',
    series: 'Berserk',
    description: 'Guts, the Black Swordsman — branded wanderer, former mercenary, and bearer of the Dragon Slayer.',
    scale: 1.2
  },
  {
    name: 'Iron Man',
    path: '/models/ironman.glb',
    title: 'The Armored Avenger',
    character: 'Tony Stark',
    series: 'Marvel Universe',
    description: 'High-tech armor with repulsor beams, advanced flight, and an onboard AI. Stark\'s masterpiece.',
    scale: 0.8
  },
  {
    name: 'Drone',
    path: '/models/drone.glb',
    title: 'Autonomous Recon',
    character: 'V-9 Scout',
    series: 'Future Warfare',
    description: 'High-altitude surveillance drone with thermal imaging and stealth composites.',
    scale: 1.0
  },
];

export default function Home() {
  const [currentModel, setCurrentModel] = useState(models[0]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />

      {/* Interactive 3D Section */}
      <section className="h-[100svh] w-full relative z-10 flex items-center bg-zinc-950">
        {/* 3D Scene */}
        <div className="absolute inset-0 z-0">
          <Scene>
            <Model path={currentModel.path} scale={currentModel.scale} />
          </Scene>
        </div>

        {/* Model Details Overlay — top-left on mobile, mid-left on desktop */}
        <div className="relative z-10 pointer-events-none w-full px-4 md:px-12 flex flex-col items-start h-full pt-6 md:pt-0 md:justify-center pb-36 md:pb-0">
          <div className="max-w-xs md:max-w-md space-y-3 md:space-y-6">
            <div>
              <p className="font-mono text-[9px] md:text-xs text-zinc-500 uppercase tracking-widest mb-1">
                {currentModel.series}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tighter uppercase leading-none">
                {currentModel.character}
              </h2>
            </div>
            <div className="h-px w-8 md:w-12 bg-zinc-700" />
            {/* Description hidden on smallest screens to avoid covering the model */}
            <p className="hidden sm:block text-zinc-400 text-xs md:text-sm leading-relaxed max-w-xs">
              {currentModel.description}
            </p>
            <div className="inline-block border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2">
              <span className="font-mono text-[9px] md:text-xs text-zinc-300 uppercase tracking-widest">
                {currentModel.title}
              </span>
            </div>
          </div>
        </div>

        {/* Model Selector — always bottom-right */}
        <div className="absolute bottom-6 md:bottom-12 right-4 md:right-12 z-20 flex flex-col gap-0.5 md:gap-2 items-end">
          <p className="font-mono text-[9px] md:text-xs text-zinc-600 uppercase tracking-widest mb-1 md:mb-2">
            3D Models
          </p>
          {models.map((model) => (
            <button
              key={model.name}
              onClick={() => setCurrentModel(model)}
              onMouseEnter={() => preloadModel(model.path)}
              className={cn(
                "px-3 md:px-4 py-2 md:py-3 text-right text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest transition-all",
                currentModel.name === model.name
                  ? "text-white border-r-2 border-white"
                  : "text-zinc-500 border-r-2 border-transparent hover:text-zinc-300 active:text-zinc-300"
              )}
            >
              {model.name}
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-black/20 py-10 text-center text-zinc-500">
        <p className="text-xs md:text-sm">© 2024 FrostForge. Based in Frostburg, Maryland.</p>
      </footer>
    </main>
  );
}
