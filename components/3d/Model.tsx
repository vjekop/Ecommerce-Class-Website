'use client';

import { useGLTF, Float, Stage, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function Model({ path, scale = 1 }: { path: string, scale?: number }) {
    const { scene } = useGLTF(path);
    const modelRef = useRef<THREE.Group>(null);

    // Subtle continuous rotation in addition to the Float component
    useFrame((state) => {
        if (modelRef.current) {
            modelRef.current.rotation.y += 0.005;
        }
    });

    return (
        <Float 
            speed={2} 
            rotationIntensity={0.5} 
            floatIntensity={0.5} 
            floatingRange={[-0.1, 0.1]}
        >
            <group ref={modelRef} dispose={null} scale={scale}>
                <Center top>
                    <primitive object={scene} />
                </Center>
            </group>
        </Float>
    );
}

// Preload models to prevent flickering when switching
useGLTF.preload('/models/berserk.glb');
useGLTF.preload('/models/ironman.glb');
useGLTF.preload('/models/drone.glb');
