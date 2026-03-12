import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles, Float, SpotLight } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '../hooks/useIsMobile';

// Embers floating up
const Embers = ({ isMobile }) => {
  return (
    <Sparkles 
      count={isMobile ? 100 : 400} 
      scale={[15, 10, 10]} 
      size={3} 
      speed={0.4} 
      opacity={0.8} 
      color="#ff4500" // orange glow
      noise={0.5}
    />
  );
};

// Smoke equivalent using large faded particles
const Smoke = ({ isMobile }) => {
  return (
    <Sparkles 
      count={isMobile ? 30 : 100} 
      scale={[20, 20, 10]} 
      size={50} 
      speed={0.1} 
      opacity={0.05} 
      color="#7a0000" // crimson smoke
      position={[0, -2, -5]}
    />
  );
};

// Camera parallax based on mouse
const Rig = () => {
  const { camera, mouse } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    // Smoothly move the camera based on normalized mouse coordinates
    camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 2, camera.position.z), 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
};

const CanvasScene = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.1} color="#1a001f" />
        <SpotLight position={[0, 5, 0]} angle={0.3} penumbra={1} intensity={2} color="#7a0000" />
        
        <Embers isMobile={isMobile} />
        <Smoke isMobile={isMobile} />
        <Stars radius={100} depth={50} count={isMobile ? 500 : 2000} factor={4} saturation={0} fade speed={1} />
        
        {/* Floating Runes in the background */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={[-4, 2, -2]}>
          <mesh>
             <ringGeometry args={[0.3, 0.4, 3]} />
             <meshBasicMaterial color="#ff4500" wireframe transparent opacity={0.3}/>
          </mesh>
        </Float>

        <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5} position={[5, -1, -3]}>
          <mesh>
             <octahedronGeometry args={[0.6, 0]} />
             <meshBasicMaterial color="#7a0000" wireframe transparent opacity={0.4}/>
          </mesh>
        </Float>

        <Rig />
      </Canvas>
    </div>
  );
};

export default CanvasScene;
