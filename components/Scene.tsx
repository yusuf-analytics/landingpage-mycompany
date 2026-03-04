'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useAppContext } from './Providers';

function AnimatedSphere({ theme }: { theme: 'light' | 'dark' }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <Sphere ref={meshRef} args={[1, 64, 64]} scale={2.5}>
                <MeshDistortMaterial
                    color={theme === 'light' ? '#60a5fa' : '#3b82f6'}
                    envMapIntensity={theme === 'light' ? 0.5 : 1}
                    clearcoat={0.8}
                    clearcoatRoughness={0}
                    metalness={0.5}
                    roughness={0.2}
                    distort={0.4}
                    speed={2}
                />
            </Sphere>
        </Float>
    );
}

export default function Scene() {
    const { theme } = useAppContext();
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.8 }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={theme === 'light' ? 0.8 : 0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} color="#8b5cf6" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#3b82f6" />
                <AnimatedSphere theme={theme} />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
