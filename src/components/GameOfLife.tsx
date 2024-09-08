import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.1;
`;

interface GameOfLifeProps {
    width: number;
    height: number;
    speed: number;
};

const GameOfLife: React.FC<GameOfLifeProps> = ({ width, height, speed }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const cellSize = 10;
        const cols = Math.floor(width / cellSize);
        const rows = Math.floor(height / cellSize);

        let grid = Array(cols).fill(null).map(() => 
            Array(rows).fill(null).map(() => Math.random() > 0.7)
        );

        const drawGrid = () => {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    if (grid[i][j]) {
                        ctx.fillStyle = '#ffffff';
                        ctx.fillRect(i * cellSize, j * cellSize, cellSize - 1, cellSize - 1);
                    }
                }
            }
        };

        const updateGrid = () => {
            const newGrid = grid.map((col, i) => 
                col.map((cell, j) => {
                    const neighbors = [
                        [-1, -1], [-1, 0], [-1, 1],
                        [0, -1], [0, 1],
                        [1, -1], [1, 0], [1, 1]
                    ].reduce((acc, [x, y]) => {
                        const newI = (i + x + cols) % cols;
                        const newJ = (j + y + rows) % rows;
                        return acc + (grid[newI][newJ] ? 1 : 0);
                    }, 0);
                    return neighbors === 3 || (cell && neighbors === 2);
                })
            );
            grid = newGrid; 
        };

        const animate = () => {
            drawGrid();
            updateGrid();
            // requestAnimationFrame(animate);
        }

        const intervalId = setInterval(animate, 1000 / speed)

        return () => {
            clearInterval(intervalId);
        };

    }, [width, height, speed]);    

    return (
        <Canvas ref={canvasRef} width={width} height={height}/>
    );
};

export default GameOfLife;