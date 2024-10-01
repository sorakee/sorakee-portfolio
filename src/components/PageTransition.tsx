import React, { useEffect, useRef } from "react";
import LoadingAnimation from "./LoadingAnimation";
import BeepSFX from "/beep.mp3";

const gridSize = 80;
const cols = Math.ceil(2000 / gridSize);
const rows = Math.ceil(2000 / gridSize);

const generateAllPositions = (): { x: number, y: number }[] => {
    const positions = [];
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            positions.push({ x, y });
        }
    }

    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    return positions;
}

interface PageTransitionProps {
    isTransitioning: boolean;
    onComplete: () => void;
}

const PageTransition: React.FC<PageTransitionProps> = ({ isTransitioning, onComplete }) => {
    const totalSquares = useRef<number>(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const allPositions = useRef<{ x: number, y: number}[]>(generateAllPositions());
    const beepSound = useRef<HTMLAudioElement>(new Audio(BeepSFX));

    useEffect(() => {
        beepSound.current.volume = 0.5;
        let animationFrameId: number;
        
        if (isTransitioning) {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const drawSquare = (x: number, y: number) => {
                ctx.fillStyle = 'black';
                ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
            };
        
            const addSquare = () => {
                if (allPositions.current.length > 0) {
                    const { x, y } = allPositions.current[allPositions.current.length - 1];
                    drawSquare(x, y);
                    beepSound.current.currentTime = 0;
                    beepSound.current.play();
                    allPositions.current.pop();
                    totalSquares.current++;
                }
            };

            const animate = () => {
                if (totalSquares.current < cols * rows) {
                    console.log("Adding square...");
                    addSquare();
                    animationFrameId = requestAnimationFrame(animate);
                } else {
                    setTimeout(onComplete, 1000);
                    return;
                }
            };

            animationFrameId = requestAnimationFrame(animate);
        }

        return () => {
            cancelAnimationFrame(animationFrameId);
            beepSound.current.pause();
        };
    }, [isTransitioning, onComplete])

    return (
        <>
            <LoadingAnimation />
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: '999' }}/>
        </>
    );
};

export default PageTransition;