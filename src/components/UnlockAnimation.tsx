import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import DoorSound from '/spacedoor-open.mp3';
import DoorTextureLeft from '../assets/doorTextureLeft.jpg';
import DoorTextureRight from '../assets/doorTextureRight.jpg';

const UnlockContainer = styled(motion.div)`
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const DoorPanel = styled(motion.div)<{ side: 'left' | 'right' }>`
    width: 50%;
    height: 100%;
    display: block;
    background-image: url(${props => ( props.side === 'left' ? DoorTextureLeft : DoorTextureRight)});
    background-repeat: repeat;
    background-size: contain;
    position: absolute;
    ${(props) => (props.side === 'left' ? 'left: 0;' : 'right: 0;')}
    z-index: 1;
    color: white;
    overflow: hidden;
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
        doorOpenSound.current.volume = 1;
    };

    return (
        <UnlockContainer
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
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