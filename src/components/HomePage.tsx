import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { animated, useSpring } from '@react-spring/three';
import Spaceship from './Spaceship';

type CameraPosition = 'center' | 'left' | 'right';

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
        config: { friction: 50 },
    });

    useFrame(() => {
        // Update the camera rotation smoothly based on scroll
        camera.rotation.y = rotation.get()[1];

        // Update cameraPosition state based on the current rotation
        if (targetRotation.current === 90) {
            setCameraPosition('left');
        } else if (targetRotation.current === -90) {
            setCameraPosition('right');
        } else {
            setCameraPosition('center');
        }
    });

    useEffect(() => {
        // Function to handle desktop scroll and mobile swipe
        const handleScrollOrSwipe = (deltaY: number) => {
            scrollYRef.current += deltaY;
        
            if (scrollYRef.current > 50) {
                // Scroll Down: Move camera to the right (rotate towards -90 degrees)
                if (targetRotation.current > -90) {
                    targetRotation.current -= 90;
                }
                scrollYRef.current = 0; // Reset scroll/swipe
            } else if (scrollYRef.current < -50) {
                // Scroll Up: Move camera to the left (rotate towards 90 degrees)
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

// The card component that appears based on scroll
const InfoCard: React.FC<{ visible: boolean; position: CameraPosition }> = ({ visible, position }) => {
    const props = useSpring({
        opacity: (visible ? 1 : 0),
        transform: (visible ? 'translateY(0%)' : 'translateY(100%)'),
        config: { tension: 220, friction: 20 }, // Optional: Customize animation feel
    });

    const cardContent = (position: CameraPosition) => {
        switch (position) {
        case 'left':
            return <div className="card">Left card content with a button</div>;
        case 'right':
            return <div className="card">Right card content with a button</div>;
        case 'center':
        default:
            return <div className="card">Center card content with a button</div>;
        }
    };

    return (
        <animated.div className="info-card" style={props}>
            {cardContent(position)}
        </animated.div>
    );
};

const HomePage: React.FC = () => {
    const [cameraPosition, setCameraPosition] = useState<CameraPosition>('center');

    return (
        <>
            <Canvas
                camera={{
                    position: [20.15, 0, -10]
                }}
            >
                <ambientLight intensity={1} />
                <spotLight position={[20.15, 0, -10]} angle={0.15} penumbra={1} />
                <Spaceship />
                <CameraControls setCameraPosition={setCameraPosition}/>
            </Canvas>

            {/* Display the info card, controlling its visibility based on camera position */}
            {/* <InfoCard visible={cameraPosition !== 'center'} position={cameraPosition} /> */}
        </>
    );
}

export default HomePage;
