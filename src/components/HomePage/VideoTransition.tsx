import React, { useState, useRef, useEffect } from 'react';
import CameraPosition from '../types/CameraPosition';
import styled from 'styled-components';
import transitionSFX from '/switch-camera-v2.mp3'

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
    mute: boolean;
    cameraPosition: CameraPosition;
    onChange: (position: CameraPosition) => void;
};

const VideoTransition: React.FC<VideoTransitionProps> = ({ mute, cameraPosition, onChange }) => {
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const prevCameraPosition = useRef<CameraPosition>('center');
    const centerToLeftRef = useRef<HTMLVideoElement>(null);
    const leftToCenterRef = useRef<HTMLVideoElement>(null);
    const centerToRightRef = useRef<HTMLVideoElement>(null);
    const rightToCenterRef = useRef<HTMLVideoElement>(null);
    const touchStartXRef = useRef<number | null>(null);
    const transitionSound = useRef<HTMLAudioElement>(new Audio(transitionSFX));

    const playVideo = (videoRef: React.RefObject<HTMLVideoElement>) => {
        const video = videoRef.current;
        if (video) {
            video.currentTime = 0;
            video.play();
            if (!mute) {
                transitionSound.current.currentTime = 0;
                transitionSound.current.volume = 1.0;
                transitionSound.current.play();
            }
            // Disable scroll during transition
            setIsTransitioning(true);
        }
    };

    useEffect(() => {
        const handleScrollOrSwipe = (delta: number): void => {
            if (isTransitioning) return;

            const scrollDirection = delta;

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
            touchStartXRef.current = e.touches[0].clientX;
        };
    
        const handleTouchMove = (e: TouchEvent): void => {
            if (touchStartXRef.current === null) return;
    
            const touchEndX: number = e.touches[0].clientX;
            const deltaX: number = touchStartXRef.current - touchEndX;
            handleScrollOrSwipe(deltaX);
            touchStartXRef.current = touchEndX;
        };
    
        const handleTouchEnd = (): void => {
            touchStartXRef.current = null;
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

    }, [isTransitioning]);

    // Play the correct video when the camera position changes
    useEffect(() => {
        if (prevCameraPosition.current == cameraPosition || isTransitioning) return;

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
                <source src="/transition/CenterToLeft.webm" type="video/webm" />
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
                <source src="/transition/LeftToCenter.webm" type="video/webm" />
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
                <source src="/transition/CenterToRight.webm" type="video/webm" />
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
                <source src="/transition/RightToCenter.webm" type="video/webm" />
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
