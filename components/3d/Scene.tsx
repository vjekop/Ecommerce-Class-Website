'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';

interface SceneProps {
    children: React.ReactNode;
}

export function Scene({ children }: SceneProps) {
    return (
        <div className="relative h-screen w-full bg-zinc-950">
            <Canvas>
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

                    {/* Lighting */}
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    {/* Environment for realistic reflections */}
                    <Environment preset="city" />

                    {/* Controls */}
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        enableRotate={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                        minDistance={5}
                        maxDistance={5}
                        autoRotate
                        autoRotateSpeed={2.0}
                    />

                    {children}
                </Suspense>
            </Canvas>


        </div>
    );
}
