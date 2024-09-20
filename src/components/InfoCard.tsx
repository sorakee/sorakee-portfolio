import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import CameraPosition from "./types/CameraPosition";
import styled, { keyframes } from "styled-components";
import { IoMdMusicalNotes } from "react-icons/io";
import { FaLaptopCode } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const glow = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Card = styled(animated.button)`
    margin: 0;
    position: fixed;
    top: 50%;
    left: 50%;
    color: black;
    background-color: white;
    width: 175px;
    height: 175px;

    display: flex;
    flex-direction: column;
    font-family: 'Orbitron', sans-serif;
    font-weight: 1000;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    gap: 10px;

    outline: none;
    border: none;
    
    font-size: 1.25rem;

    &:hover {
        cursor: pointer;
    }

    &::before {
        content: '';
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        border-radius: 50%;
        box-shadow: 0px 10px 15px rgba(255, 255, 255, 1), 
                    0px -10px 15px #4998ff,
                    10px 0px 15px rgba(255, 255, 255, 1),
                    -10px 0px 15px #4998ff;
        z-index: -1;
        opacity: 0.6;
        animation: ${glow} 1.25s infinite cubic-bezier(0, 0, 0, 0);
    }
`;

interface InfoCardProps {
    position: CameraPosition,
    currentPosition: CameraPosition,
    // This refers to the 'Enter' animation (zoom, fade-in thing)
    isAnimationDone: boolean
};

// The card component that appears based on scroll
const InfoCard: React.FC<InfoCardProps> = ({ position, currentPosition, isAnimationDone }): JSX.Element => {
    const navigate: NavigateFunction = useNavigate();

    // Determine if the card should be visible based on the camera's current position
    const visible: boolean = (currentPosition === position) && isAnimationDone;

    const props = useSpring({
        opacity: (visible ? 1 : 0),
        transform: (visible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, 200%) scale(0)'),
        config: { mass: 5, tension: 170, friction: 32 },
        onRest: (e) => {
            if (e.finished === true && currentPosition === position) {
                console.log("Transition animation to", currentPosition, "finished");
            }
        }
    });

    const cardContent = (position: CameraPosition): JSX.Element => {
        switch (position) {
        case 'left':
            return (
                <Card style={props} onClick={() => navigate('/music')}>
                    <IoMdMusicalNotes size={32} />
                    Music
                </Card>
            );
        case 'right':
            return (
                <Card style={props} onClick={() => navigate('/projects')}>
                    <FaLaptopCode size={32} />
                    Projects
                </Card>
            );
        case 'center':
        default:
            return (
                <Card style={props}>
                    <CgProfile size={32} />
                    Profile
                </Card>
            );
        }
    };

    return (
        cardContent(position)
    );
};

export default InfoCard;