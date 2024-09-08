import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import DoorSound from '../assets/spacedoor-open.mp3';

const UnlockContainer = styled(motion.div)`
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: red; */
    /* background: radial-gradient(circle, #1a1f27, #0d0f15); */
    overflow: hidden;
`;

const DoorPanel = styled(motion.div)<{ side: 'left' | 'right' }>`
    width: 50%;
    height: 100%;
    background: linear-gradient(135deg, #202b34, #353f49);
    position: absolute;
    ${(props) => (props.side === 'left' ? 'left: 0;' : 'right: 0;')}
    z-index: 1;

    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Orbitron', sans-serif;
    color: white;
    font-size: 2rem;
    text-transform: uppercase;
    overflow: hidden;

    @media (max-width: 768px) {
        height: 100%;
        font-size: 1.5rem;
    }
`;

interface UnlockAnimationProps {
    isUnlocked: boolean;
    onComplete: () => void;
};

const UnlockAnimation: React.FC<UnlockAnimationProps> = ({ isUnlocked, onComplete }) => {
    const [fadeInComplete, setFadeInComplete] = useState<boolean>(false);
    const doorOpenSound = useRef<HTMLAudioElement>(new Audio(DoorSound));

    const doorVariants = {
        closed: { x: 0 },
        openLeft: { x: '-100%' },
        openRight: { x: '100%' }
    };

    const handleDoorAnimation = ( complete: boolean ) => {
        setFadeInComplete(complete);
        doorOpenSound.current.play();
    };

    return (
        <UnlockContainer
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            onAnimationComplete={() => handleDoorAnimation(true)}
        >
            {/* Left Panel */}
            <DoorPanel
                side='left'
                initial='closed'
                animate={isUnlocked && fadeInComplete ? 'openLeft' : 'closed'}
                transition={{ duration: 1.75, ease: 'easeInOut' }}
                variants={doorVariants}
                onAnimationComplete={() => onComplete()}
            />

            {/* Right Panel */}
            <DoorPanel
                side='right'
                initial='closed'
                animate={isUnlocked && fadeInComplete ? 'openRight' : 'closed'}
                transition={{ duration: 1.75, ease: 'easeInOut' }}
                variants={doorVariants}
            />
        </UnlockContainer>
    );
};

export default UnlockAnimation;