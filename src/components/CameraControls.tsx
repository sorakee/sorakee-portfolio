import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSpring } from '@react-spring/three';
import CameraPosition from './types/CameraPosition';

interface CameraControlsProps {
    setCameraPosition: (position: CameraPosition) => void;
};

// This component will handle the camera rotation and scrolling logic
const CameraControls: React.FC<CameraControlsProps> = ({ setCameraPosition }) => {
    const { camera } = useThree();
    const scrollYRef = useRef<number>(0);
    const targetRotation = useRef<number>(0);
     // Track touch start position
    const touchStartYRef = useRef<number | null>(null);

    // React spring for smooth camera rotation animation
    const { rotation } = useSpring({
        rotation: [0, targetRotation.current * (Math.PI / 180), 0],
        config: { mass: 5, tension: 170, friction: 32 },
    });

    useFrame(() => {
        // Update the camera rotation smoothly based on scroll
        camera.rotation.y = rotation.get()[1];

        // Update cameraPosition state based on the current rotation
        if (targetRotation.current === 90) {
            setCameraPosition('left');
        } else if (targetRotation.current === -90) {
            setCameraPosition('right');
        } else if (targetRotation.current === 0) {
            setCameraPosition('center');
        }
    });

    useEffect(() => {
        // Function to handle desktop scroll and mobile swipe
        const handleScrollOrSwipe = (deltaY: number) => {
            scrollYRef.current += deltaY;
        
            if (scrollYRef.current > 50) {
                // Scroll Down: Move camera to the right (rotate towards 90 degrees)
                if (targetRotation.current > -90) {
                    targetRotation.current -= 90;
                }
                scrollYRef.current = 0; // Reset scroll/swipe
            } else if (scrollYRef.current < -50) {
                // Scroll Up: Move camera to the left (rotate towards -90 degrees)
                if (targetRotation.current < 90) {
                    targetRotation.current += 90;
                }
                scrollYRef.current = 0; // Reset scroll/swipe
            }
        };
    
        // Desktop scroll event listener
        const handleScroll = (e: WheelEvent) => {
            handleScrollOrSwipe(e.deltaY);
        };
    
        // Mobile touch event listeners
        const handleTouchStart = (e: TouchEvent) => {
            touchStartYRef.current = e.touches[0].clientY; // Store the starting Y position of the touch
        };
    
        const handleTouchMove = (e: TouchEvent) => {
            if (touchStartYRef.current === null) return;
    
            const touchEndY = e.touches[0].clientY;
            const deltaY = touchStartYRef.current - touchEndY; // Calculate the difference in Y position
    
            handleScrollOrSwipe(deltaY);
            touchStartYRef.current = touchEndY; // Update the touch start position for smooth tracking
        };
    
        const handleTouchEnd = () => {
            touchStartYRef.current = null; // Reset when touch ends
        };
    
        // Add scroll and touch event listeners
        window.addEventListener('wheel', handleScroll);
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
    
        // Cleanup listeners on component unmount
        return () => {
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return null;
}

export default CameraControls;