import React, { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { animated, useSpring } from "react-spring";
import CameraPosition from "../types/CameraPosition";
import styled, { keyframes } from "styled-components";
import { IoMdMusicalNotes } from "react-icons/io";
import { FaLaptopCode } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import ProfileDetails from "./ProfileDetails";

const ProfileContainer = styled(animated.div)`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 81.5vw;
    height: 75vh;
    /* background: red; */
    color: white;
    font-family: 'Orbitron', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: visible;
`;

const glow = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Card = styled(animated.button)`
    z-index: 10;
    margin: 0;
    position: fixed;
    width: 175px;
    height: 175px;
    top: 50%;
    left: 50%;

    color: black;
    background-color: white;
    font-size: 1.25rem;
    font-family: 'Orbitron', sans-serif;
    font-weight: 1000;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;

    outline: none;
    border: none;
    border-radius: 50%;
    
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
        box-shadow: 0px 10px 15px white, 
                    0px -10px 15px #4998ff,
                    10px 0px 15px white,
                    -10px 0px 15px #4998ff;
        z-index: -1;
        opacity: 0.6;
        animation: ${glow} 1.25s infinite cubic-bezier(0, 0, 0, 0);
    }
`;

interface InfoCardProps {
    position: CameraPosition,
    currentPosition: CameraPosition,
    isAnimationDone: boolean,
    showDetails: boolean,
    onShow: (state: boolean) => void;
};

// The card component that appears based on scroll
const InfoCard: React.FC<InfoCardProps> = ({ position, currentPosition, isAnimationDone, showDetails, onShow }): JSX.Element => {
    const navigate: NavigateFunction = useNavigate();

    // Determine if the card should be visible based on the camera's current position
    const visible: boolean = (currentPosition === position) && isAnimationDone;

    const animOne = useSpring({
        opacity: (visible ? 1 : 0),
        transform: (visible ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, 200%) scale(0)'),
        config: { mass: 5, tension: 170, friction: 32 },
        onRest: (e) => {
            // if (e.finished === true && currentPosition === position) {
            //     console.log("Transition animation to", currentPosition, "finished");
            // }
        },
        onStart: (e) => {
            if (showDetails) onShow(false);
        }
    });

    const animTwo = useSpring({
        opacity: (visible && !showDetails ? 1 : 0),
        transform: (visible && !showDetails ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)'),
        config: { mass: 5, tension: 170, friction: 32 }
    });

    const animProfile = useSpring({
        opacity: (showDetails ? 1 : 0),
        transform:( showDetails ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.5)'),
        config: { tension: 300, friction: 25 },
    });

    switch (position) {
        case 'left':
            return (
                <Card style={animOne} onClick={() => navigate('/music')}>
                    <IoMdMusicalNotes size={32} />
                    Music
                </Card>
            );
        case 'right':
            return (
                <Card style={animOne} onClick={() => navigate('/projects')}>
                    <FaLaptopCode size={32} />
                    Projects
                </Card>
            );
        case 'center':
        default:
            return (
                    showDetails ? (
                        <ProfileContainer style={animProfile}>
                            <ProfileDetails />
                        </ProfileContainer>
                    ) : (
                        <Card style={animTwo} onClick={() => onShow(!showDetails)}>
                                <CgProfile size={32} />
                                Profile
                        </Card>
                    )
            );
    }
};

export default InfoCard;