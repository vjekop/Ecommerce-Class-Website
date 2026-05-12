'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, useProgress } from '@react-three/drei';
import { Suspense } from 'react';

interface SceneProps {
    children: React.ReactNode;
}

/** HTML loading overlay driven by THREE's global LoadingManager progress. */
function LoadingOverlay() {
    const { progress, active } = useProgress();

    if (!active) return null;

    return (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-950 pointer-events-none">
            <div className="text-center space-y-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
                    Loading Model
                </p>
                <div className="w-48 h-px bg-zinc-900 overflow-hidden">
                    <div
                        className="h-full bg-white transition-all duration-200 ease-out"
                        style={{ width: `${Math.round(progress)}%` }}
                    />
                </div>
                <p className="font-mono text-xs text-zinc-700">
                    {Math.round(progress)}%
                </p>
            </div>
        </div>
    );
}

export function Scene({ children }: SceneProps) {
    return (
        <div
            className="relative h-full w-full bg-zinc-950"
            // Allow the browser to handle vertical scroll even over the canvas
            style={{ touchAction: 'pan-y' }}
        >
            <LoadingOverlay />

            <Canvas
                dpr={[1, 1.5]}
                shadows={false}
                // Override R3F's default `touch-action: none` so mobile can still scroll
                style={{ touchAction: 'pan-y' }}
                onCreated={({ gl }) => {
                    gl.domElement.style.touchAction = 'pan-y';
                }}
            >
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

                    {/* Lighting */}
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    {/* Environment for reflections */}
                    <Environment preset="city" />

                    {/* OrbitControls intentionally removed:
                        - All controls (zoom/pan/rotate) were disabled anyway
                        - Model rotation is handled by useFrame in Model.tsx
                        - OrbitControls was intercepting touch events and blocking page scroll */}

                    {children}
                </Suspense>
            </Canvas>
        </div>
    );
}
