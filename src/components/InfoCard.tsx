import React from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

type CameraPosition = 'center' | 'left' | 'right';

const Card = styled(animated.div)`
    margin: 0;
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    color: black;
    background-color: white;
`;

interface InfoCardProps {
    position: CameraPosition,
    currentPosition: CameraPosition
}

// The card component that appears based on scroll
const InfoCard: React.FC<InfoCardProps> = ({ position, currentPosition }) => {
    // Determine if the card should be visible based on the camera's current position
    const visible = (currentPosition === position);

    const props = useSpring({
        opacity: (visible ? 1 : 0),
        transform: (visible ? 'translate(-50%, -50%)' : 'translate(-50%, 500%)'),
        config: { tension: 220, friction: 20 },
    });

    const cardContent = (position: CameraPosition) => {
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

export default InfoCard