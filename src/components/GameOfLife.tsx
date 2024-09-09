import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas<{ show: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: ${props => props.show ? 0.06 : 0};
    transition: opacity 5s ease-in-out;
`;

interface GameOfLifeProps {
    width: number;
    height: number;
    speed: number;
    show: boolean;
};

const GameOfLife: React.FC<GameOfLifeProps> = ({ width, height, speed, show }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas: HTMLCanvasElement | null = canvasRef.current;
        if (!canvas) return;

        const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');
        if (!ctx) return;

        const cellSize = 10;
        const cols = Math.floor(width / cellSize);
        const rows = Math.floor(height / cellSize);

        let grid: boolean[][] = Array(cols).fill(null).map(() => 
            Array(rows).fill(null).map(() => Math.random() > 0.7)
        );

        const checkNeighbours = (i: number, j: number, cell: boolean) => {
            // Count number of neighbours
            const neighbours: number = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], [0, 1],
                [1, -1], [1, 0], [1, 1]
            ].reduce((acc, [x, y]) => {
                const neighbourI = (i + x + cols) % cols;
                const neighbourJ = (j + y + rows) % rows;
                return acc + (grid[neighbourI][neighbourJ] ? 1 : 0);
            }, 0);
            // Determines the next state of the current cell
            return neighbours === 3 || (cell && neighbours === 2);
        }

        const drawGrid = () => {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    if (grid[i][j]) {
                        ctx.fillStyle = '#00ff00';
                        ctx.fillRect(i * cellSize, j * cellSize, cellSize - 1, cellSize - 1);
                    }
                }
            }
        };

        const updateGrid = () => {
            const newGrid: boolean[][] = grid.map((col, i) => 
                col.map((cell, j) => {
                    return checkNeighbours(i, j, cell)
                })
            );
            grid = newGrid; 
        };

        const animate = () => {
            drawGrid();
            updateGrid();
        }

        const intervalId: number = setInterval(animate, 1000 / speed)

        return () => {
            clearInterval(intervalId);
        };

    }, [width, height, speed]);

    return (
        <Canvas ref={canvasRef} show={show} width={width} height={height}/>
    );
};

export default GameOfLife;