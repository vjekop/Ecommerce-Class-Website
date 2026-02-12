'use client';

import { Hero } from '@/components/ui/Hero';
import { Scene } from '@/components/3d/Scene';
import { Model } from '@/components/3d/Model';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const models = [
  {
    name: 'Berserk',
    path: '/models/berserk.glb',
    title: 'The Black Swordsman',
    character: 'Guts',
    series: 'Berserk',
    description: 'Guts, known as the "Black Swordsman," is a former mercenary and branded wanderer who travels the world in a constant internal and external struggle between pursuing his own ends and protecting those dear to him.',
    scale: 1.2
  },
  {
    name: 'Iron Man',
    path: '/models/ironman.glb',
    title: 'The Armored Avenger',
    character: 'Tony Stark',
    series: 'Marvel Universe',
    description: 'A suit of high-tech armor equipped with repulsor beams, advanced flight capabilities, and an onboard AI. Tony Stark\'s masterpiece turns a man into a one-man army.',
    scale: 0.8
  },
  {
    name: 'Drone',
    path: '/models/drone.glb',
    title: 'Autonomous Recon',
    character: 'V-9 Scout',
    series: 'Future Warfare',
    description: 'The V-9 Scout is a high-altitude autonomous surveillance drone used for perimeter defense and reconnaissance. Equipped with thermal imaging and stealth composites, it is the silent eye of the battlefield.',
    scale: 1.0
  },
];

export default function Home() {
  const [currentModel, setCurrentModel] = useState(models[0]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />

      {/* Interactive 3D Section */}
      <section className="h-screen w-full relative z-10 flex items-center bg-zinc-950">
        {/* 3D Scene */}
        <div className="absolute inset-0 z-0">
          <Scene>
            <Model path={currentModel.path} scale={currentModel.scale} />
          </Scene>
        </div>

        {/* Model Details Overlay */}
        <div className="relative z-10 pointer-events-none w-full px-6 md:px-12 flex flex-col md:flex-row items-end md:items-center justify-between h-full pb-32 md:pb-0">
          <div className="max-w-md space-y-6">
            <div>
              <h3 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1">
                {currentModel.series}
              </h3>
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase leading-none">
                {currentModel.character}
              </h2>
            </div>
            <div className="h-px w-12 bg-zinc-700" />
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-sm">
              {currentModel.description}
            </p>
            <div className="inline-block border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm px-4 py-2">
              <span className="font-mono text-xs text-zinc-300 uppercase tracking-widest">
                Model: {currentModel.title}
              </span>
            </div>
          </div>
        </div>

        {/* Model Selector */}
        <div className="absolute bottom-12 right-6 md:right-12 z-20 flex flex-col gap-2 items-end">
          <h3 className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
            3D Models:
          </h3>
          {models.map((model) => (
            <button
              key={model.name}
              onClick={() => setCurrentModel(model)}
              className={cn(
                "px-4 py-3 text-right text-xs font-mono font-bold uppercase tracking-widest transition-all",
                currentModel.name === model.name
                  ? "text-white border-r-2 border-white"
                  : "text-zinc-500 border-r-2 border-transparent hover:text-zinc-300"
              )}
            >
              {model.name}
            </button>
          ))}
        </div>
      </section>

      {/* Footer Placeholder */}
      <footer className="w-full border-t border-white/5 bg-black/20 py-10 text-center text-zinc-500">
        <p>© 2024 FrostForge. Based in Frostburg, Maryland.</p>
      </footer>
    </main>
  );
}
