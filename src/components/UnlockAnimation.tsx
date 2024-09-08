import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const UnlockContainer = styled.div`
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
        height: 90%;
        font-size: 1.5rem;
    }
`;

interface UnlockAnimationProps {
    onComplete: () => void;
};

const UnlockAnimation: React.FC<UnlockAnimationProps> = ({ onComplete }) => {
    const [isUnlocked, setIsUnlocked] = useState<boolean>(false);

    const doorVariants = {
        closed: { x: 0 },
        openLeft: { x: '-100%' },
        openRight: { x: '100%' }
    }

    useEffect(() => {
        setIsUnlocked(true)
    }, [onComplete]);

    return (
        <UnlockContainer>
            {/* Left Panel */}
            <DoorPanel
                side="left"
                initial="closed"
                animate={isUnlocked ? 'openLeft' : 'closed'}
                transition={{ duration: 1, ease: 'easeInOut' }}
                variants={doorVariants}
            />

            {/* Right Panel */}
            <DoorPanel
                side="right"
                initial="closed"
                animate={isUnlocked ? 'openRight' : 'closed'}
                transition={{ duration: 1, ease: 'easeInOut' }}
                variants={doorVariants}
            />
        </UnlockContainer>
    );
};

export default UnlockAnimation;