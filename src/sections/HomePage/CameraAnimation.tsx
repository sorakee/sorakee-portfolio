import { useFrame, useThree } from '@react-three/fiber';
import { useSpring } from '@react-spring/three';
import React, { useState } from 'react';
import { PerspectiveCamera } from 'three';

interface CameraAnimationProps {
    setAnimationComplete: (done: boolean) => void;
};

const CameraAnimation: React.FC<CameraAnimationProps> = ({ setAnimationComplete }) => {
    const { camera } = useThree();
    const [animationDone, setAnimationDone] = useState(false);
  
    // Spring animation for zoom-in and fade-in
    const { position, zoom } = useSpring({
        from: { position: [0, 0, 100], zoom: 160 },  // Start farther away and invisible
        to: async (next) => {
            await next({ position: [0, 0, 17.667], zoom: 80 });
            setAnimationDone(true);
            setAnimationComplete(true);
        },
        config: { mass: 10, tension: 170, friction: 67.5 },
    });
  
    useFrame(() => {
        if (!animationDone) {
            const perspectiveCamera = camera as PerspectiveCamera;
            perspectiveCamera.fov = zoom.get();
            const [x, y, z] = position.get() as [number, number, number];
            perspectiveCamera.position.lerp({ x, y, z }, 0.1);
            perspectiveCamera.updateProjectionMatrix();
        }
    });
  
    return null;
};

export default CameraAnimation;

