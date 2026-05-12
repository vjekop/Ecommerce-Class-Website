'use client';

import { useGLTF, Float, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

// Draco decoder from Google CDN — required for compressed GLBs
const DRACO_DECODER = 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/';

export function Model({ path, scale = 1 }: { path: string; scale?: number }) {
    const { scene } = useGLTF(path, DRACO_DECODER);
    const modelRef = useRef<THREE.Group>(null);

    // Subtle continuous Y-axis rotation (Scene's autoRotate removed to avoid conflict)
    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.0015;
        }
    });

    return (
        <Float
            speed={1.5}
            rotationIntensity={0.3}
            floatIntensity={0.3}
            floatingRange={[-0.05, 0.05]}
        >
            <group ref={modelRef} dispose={null} scale={scale}>
                <Center top>
                    <primitive object={scene} />
                </Center>
            </group>
        </Float>
    );
}

// Only preload the default model on page load.
// The other models are preloaded on-hover via page.tsx to avoid a 76MB+ cold load.
export function preloadModel(path: string) {
    useGLTF.preload(path, DRACO_DECODER);
}

useGLTF.preload('/models/berserk.glb', DRACO_DECODER);
