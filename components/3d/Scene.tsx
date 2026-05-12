'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera, useProgress } from '@react-three/drei';
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
                {/* Progress bar */}
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
        <div className="relative h-screen w-full bg-zinc-950">
            {/* Progress overlay — visible outside the Canvas */}
            <LoadingOverlay />

            <Canvas
                // Cap pixel ratio at 1.5× — prevents 3× rendering on Retina/high-DPI screens
                dpr={[1, 1.5]}
                // Disable shadow map — no shadow receivers in scene, just overhead
                shadows={false}
            >
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

                    {/* Lighting */}
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    {/* Environment for realistic reflections */}
                    <Environment preset="city" />

                    {/* Rotation is handled by Model's useFrame — autoRotate removed to avoid conflict */}
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                        minDistance={5}
                        maxDistance={5}
                    />

                    {children}
                </Suspense>
            </Canvas>
        </div>
    );
}
