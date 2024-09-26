import React, { useState, useRef, useEffect } from 'react';
import CameraPosition from '../types/CameraPosition';
import styled from 'styled-components';
import transitionSFX from '/switch-camera.mp3'

const Video = styled.video<{ $isVisible: boolean }>`
    position: absolute;
    width: 100%;
    height: 100%;
    transition: opacity 500ms ease-in-out;
    opacity: ${props => (props.$isVisible ? 1 : 0)};
    object-position: center;
    object-fit: cover;
`;

const Image = styled.img<{ $isVisible: boolean }>`
    position: absolute;
    width: 100%;
    height: 100%;
    transition: opacity 250ms ease-in-out;
    opacity: ${props => (props.$isVisible ? 1 : 0)};
    object-position: center;
    object-fit: cover;
`;

interface VideoTransitionProps {
    cameraPosition: CameraPosition;
    onChange: (position: CameraPosition) => void;
};

const VideoTransition: React.FC<VideoTransitionProps> = ({ cameraPosition, onChange }) => {
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const prevCameraPosition = useRef<CameraPosition>('center');
    const centerToLeftRef = useRef<HTMLVideoElement>(null);
    const leftToCenterRef = useRef<HTMLVideoElement>(null);
    const centerToRightRef = useRef<HTMLVideoElement>(null);
    const rightToCenterRef = useRef<HTMLVideoElement>(null);
    const touchStartYRef = useRef<number | null>(null);
    const transitionSound = useRef<HTMLAudioElement>(new Audio(transitionSFX));

    const playVideo = (videoRef: React.RefObject<HTMLVideoElement>) => {
        const video = videoRef.current;
        if (video) {
            video.currentTime = 0;
            video.play();
            transitionSound.current.play();
            // Disable scroll during transition
            setIsTransitioning(true);
        }
    };

    useEffect(() => {
        const handleScrollOrSwipe = (deltaY: number): void => {
            if (isTransitioning) return;

            const scrollDirection = deltaY;

            if (scrollDirection < 0 && cameraPosition === 'center') {
                onChange('left');
            } else if (scrollDirection > 0 && cameraPosition === 'center') {
                onChange('right');
            } else if (scrollDirection < 0 && cameraPosition === 'right') {
                onChange('center');
            } else if (scrollDirection > 0 && cameraPosition === 'left') {
                onChange('center');
            }
        };

        const handleScroll = (e: WheelEvent): void => {
            handleScrollOrSwipe(e.deltaY);
        };
    
        // Mobile touch event listeners START
        const handleTouchStart = (e: TouchEvent): void => {
            touchStartYRef.current = e.touches[0].clientY;
        };
    
        const handleTouchMove = (e: TouchEvent): void => {
            if (touchStartYRef.current === null) return;
    
            const touchEndY: number = e.touches[0].clientY;
            const deltaY: number = touchEndY - touchStartYRef.current;
    
            handleScrollOrSwipe(deltaY);
            touchStartYRef.current = touchEndY;
        };
    
        const handleTouchEnd = (): void => {
            touchStartYRef.current = null;
        };
        // Mobile touch event listeners END

        // Add scroll and touch event listeners
        window.addEventListener('wheel', handleScroll);
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);
    
        // Cleanup listeners on component unmount
        return (): void => {
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };

    }, [cameraPosition, isTransitioning]);

    // Play the correct video when the camera position changes
    useEffect(() => {
        if (prevCameraPosition.current == cameraPosition) return;

        console.log("Previous Camera Position:", prevCameraPosition.current)
        console.log("Camera Position:", cameraPosition)
        let videoRef: React.RefObject<HTMLVideoElement> | null = null;

        if (cameraPosition === 'left' && prevCameraPosition.current === 'center') {
            console.log("Playing CenterToLeft transition...");
            videoRef = centerToLeftRef;
        } else if (cameraPosition === 'center' && prevCameraPosition.current === 'left') {
            console.log("Playing LeftToCenter transition...");
            videoRef = leftToCenterRef;
        } else if (cameraPosition === 'right' && prevCameraPosition.current === 'center') {
            console.log("Playing CenterToRight transition...");
            videoRef = centerToRightRef;
        } else if (cameraPosition === 'center' && prevCameraPosition.current === 'right') {
            console.log("Playing RightToCenter transition...");
            videoRef = rightToCenterRef;
        }

        if (videoRef) {
            playVideo(videoRef);
        }
    }, [cameraPosition]);

    return (
        <div style={{ width: '100vw', height: '100vh', overflow: 'hidden'}}>
            <Video
                ref={centerToLeftRef}
                $isVisible={cameraPosition === 'left' && prevCameraPosition.current === 'center'}
                onEnded={() => {
                    setIsTransitioning(false);
                    prevCameraPosition.current = cameraPosition;
                }}
                muted
            >
                <source src="/transition/CenterToLeft.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </Video>
            <Video
                ref={leftToCenterRef}
                $isVisible={cameraPosition === 'center' && prevCameraPosition.current === 'left'}
                onEnded={() => {
                    setIsTransitioning(false);
                    prevCameraPosition.current = cameraPosition;
                }}
                muted
            >
                <source src="/transition/LeftToCenter.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </Video>
            <Video
                ref={centerToRightRef}
                $isVisible={cameraPosition === 'right' && prevCameraPosition.current === 'center'}
                onEnded={() => {
                    setIsTransitioning(false);
                    prevCameraPosition.current = cameraPosition;
                }}
                muted
            >
                <source src="/transition/CenterToRight.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </Video>
            <Video
                ref={rightToCenterRef}
                $isVisible={cameraPosition === 'center' && prevCameraPosition.current === 'right'}
                onEnded={() => {
                    setIsTransitioning(false);
                    prevCameraPosition.current = cameraPosition;
                }}
                muted
            >
                <source src="/transition/RightToCenter.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </Video>
            <div style={{ width: '100vw', height: '100vh', overflow: 'hidden'}}>
                <Image 
                    src="/transition/staticCenter.png" 
                    alt="Center Background" 
                    $isVisible={cameraPosition === 'center' && !isTransitioning}
                />
                <Image 
                    src="/transition/staticLeft.png" 
                    alt="Left Background" 
                    $isVisible={cameraPosition === 'left' && !isTransitioning}
                />
                <Image 
                    src="/transition/staticRight.png" 
                    alt="Right Background" 
                    $isVisible={cameraPosition === 'right' && !isTransitioning}
                />
            </div>
        </div>
    );
};

export default VideoTransition;
