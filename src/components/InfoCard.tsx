import React from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import CameraPosition from "./types/CameraPosition";

const Card = styled(animated.div)`
    margin: 0;
    position: fixed;
    /* text-align: center; */
    top: 50%;
    left: 50%;
    color: black;
    background-color: white;
    width: 200px;
    height: 200px;

    display: flex;
    font-family: 'Orbitron', sans-serif;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
`;

interface InfoCardProps {
    position: CameraPosition,
    currentPosition: CameraPosition,
    // This refers to the 'Enter' animation (zoom, fade-in thing)
    isAnimationDone: boolean
};

// The card component that appears based on scroll
const InfoCard: React.FC<InfoCardProps> = ({ position, currentPosition, isAnimationDone }): JSX.Element => {
    // Determine if the card should be visible based on the camera's current position
    const visible: boolean = (currentPosition === position) && isAnimationDone;

    const props = useSpring({
        opacity: (visible ? 1 : 0),
        transform: (visible ? 'translate(-50%, -50%)' : 'translate(-50%, 200%)'),
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
            return <Card style={props}>Left content</Card>;
        case 'right':
            return <Card style={props}>Right content</Card>;
        case 'center':
        default:
            return <Card style={props}>Center content</Card>;
        }
    };

    return (
        cardContent(position)
    );
};

export default InfoCard;