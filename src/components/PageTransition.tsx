import React, { useEffect, useRef } from "react";
import LoadingAnimation from "./LoadingAnimation";

const gridSize = 80;
const cols = Math.ceil(window.innerWidth / gridSize);
const rows = Math.ceil(window.innerHeight / gridSize);

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
    onComplete: () => void;
}

const PageTransition: React.FC<PageTransitionProps> = ({ onComplete }) => {
    const totalSquares = useRef<number>(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const allPositions = useRef<{ x: number, y: number}[]>(generateAllPositions());

    useEffect(() => {
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
                console.log(x, y)
                allPositions.current.pop();
                drawSquare(x, y);
                totalSquares.current++;
            }
        }

        let animationFrameId: number;
        let lastUpdateTime: number = 0;
        const updateInterval: number = 1000 / 6000;

        const animate = (timestamp: number) => {
            if (timestamp - lastUpdateTime >= updateInterval) {
                addSquare();
                lastUpdateTime = timestamp;
            }
            if (totalSquares.current < cols * rows) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setTimeout(onComplete, 500);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrameId);
    }, [onComplete])

    return (
        <>
            <LoadingAnimation />
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: '999' }}/>
        </>
    );
};

export default PageTransition;