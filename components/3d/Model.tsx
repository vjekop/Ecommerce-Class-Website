'use client';

import { useGLTF, Float, Stage } from '@react-three/drei';
import * as THREE from 'three';

export function Model({ path, scale = 1 }: { path: string, scale?: number }) {
    const { scene } = useGLTF(path);

    return (
        <group dispose={null} scale={scale}>
            {/* Stage automatically centers and scales the model, but we disable camera adjustment to prevent popping */}
            <Stage environment="city" intensity={0.5} adjustCamera={false}>
                <primitive object={scene} />
            </Stage>
        </group>
    );
}
