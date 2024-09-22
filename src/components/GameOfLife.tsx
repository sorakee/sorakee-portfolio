import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

interface GameOfLifeProps {
    width: number;
    height: number;
    speed: number;
    show: boolean;
};

const Canvas = styled.canvas<{ $show: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: ${props => props.$show ? 0.05 : 0};
    transition: opacity 5s ease-in-out;
`;

const GameOfLife: React.FC<GameOfLifeProps> = ({ width, height, speed, show }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mousePosRef = useRef<{ x: number; y: number } | null>(null);
    const gridRef = useRef<boolean[][]>([]);
    const cellSize = 10;
    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);

    // Initialize grid only once
    useEffect(() => {
        gridRef.current = Array(cols).fill(null).map(() => 
            Array(rows).fill(null).map(() => Math.random() > 0.7)
        );
    }, [cols, rows, speed]);

    const checkNeighbours = (i: number, j: number, cell: boolean) => {
        // Count number of neighbours
        const neighbours: number = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ].reduce((acc, [x, y]) => {
            const neighbourI = (i + x + cols) % cols;
            const neighbourJ = (j + y + rows) % rows;
            return acc + (gridRef.current[neighbourI][neighbourJ] ? 1 : 0);
        }, 0);
        // Determines the next state of the current cell
        return neighbours === 3 || (cell && neighbours === 2);
    }

    const drawGrid = useCallback((ctx: CanvasRenderingContext2D) => {
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (gridRef.current[i][j]) {
                    ctx.fillStyle = '#00ff00';
                    ctx.fillRect(i * cellSize, j * cellSize, cellSize - 1, cellSize - 1);
                }
            }
        }
    }, [width, height, cols, rows, cellSize]);

    const updateGrid = useCallback(() => {
        const newGrid = gridRef.current.map((col, i) => 
            col.map((cell, j) => {
                return checkNeighbours(i, j, cell)
            })
        );
        gridRef.current = newGrid; 
    }, [cols, rows]);

    const addCellAtMouse = useCallback(() => {
        if (mousePosRef.current) {
            const centerI = Math.floor(mousePosRef.current.x / cellSize);
            const centerJ = Math.floor(mousePosRef.current.y / cellSize);
            for (let di = -1; di <= 1; di++) {
                for (let dj = -1; dj <= 1; dj++) {
                    const i = (centerI + di + cols) % cols;
                    const j = (centerJ + dj + rows) % rows;
                    if (i >= 0 && i < cols && j >= 0 && j < rows) {
                        gridRef.current[i][j] = true;
                    }
                }
            }
        }
    }, [cols, rows, cellSize]);

    useEffect(() => {
        const canvas: HTMLCanvasElement | null = canvasRef.current;
        if (!canvas) return;

        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let lastUpdateTime = 0;
        const updateInterval = 1000 / speed;

        const updateAndDraw = (timestamp: number) => {
            if (timestamp - lastUpdateTime >= updateInterval) {
                addCellAtMouse();
                updateGrid();
                drawGrid(ctx);
                lastUpdateTime = timestamp;
            }
            animationFrameId = requestAnimationFrame(updateAndDraw);
        };
      
        animationFrameId = requestAnimationFrame(updateAndDraw);

        const handleMouseMove = (event: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mousePosRef.current = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        };
      
        canvas.addEventListener('mousemove', handleMouseMove);

        return () => {
            cancelAnimationFrame(animationFrameId);
            canvas.removeEventListener('mousemove', handleMouseMove);
        };

    }, [width, height, speed, drawGrid, updateGrid, addCellAtMouse]);

    return (
        <Canvas ref={canvasRef} $show={show} width={width} height={height}/>
    );
};

export default GameOfLife;