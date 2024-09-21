import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import AccessGranted from '/access-granted-87075_spdup.wav'
import styled from 'styled-components';

const TypeWrapper = styled.div`
    font-size: 2rem;
    font-weight: 500;

    @media screen and (max-width: 440px) 
    {
        font-size: 1.35rem;
        text-align: center;
    }
`;
interface GreetingAnimationProps {
    name: string;
    onComplete: () => void;
};

const GreetingAnimation: React.FC<GreetingAnimationProps> = ({ name, onComplete }) => {
    const [textColor, setTextColor] = useState<string>();
    const [textShadow, setTextShadow] = useState<string>('5px #00ff007f');
    const [typeComplete, setTypeComplete] = useState<boolean>(false);
    const accessSound = useRef<HTMLAudioElement>(new Audio(AccessGranted));

    const triggerVoice = (): void => {
        accessSound.current.play();
        accessSound.current.volume = 1;
    };

    const textVariants = {
        hold: { opacity: 1 },
        exit: { opacity: 0 }
    };

    return (
        <motion.div 
            initial='hold'
            animate={typeComplete ? 'exit' : 'hold'}
            transition={{ duration: 1, ease: 'easeInOut' }}
            variants={textVariants}
            style={{
                color: textColor,
                textShadow: `0 0 ${textShadow}`,
                transition: 'color 500ms ease-in-out, text-shadow 500ms ease-in-out'
            }}
            onAnimationComplete={(): void => onComplete()}
        >
            <TypeWrapper>
                <TypeAnimation
                    sequence={[
                        () => triggerVoice(),
                        250,
                        'Access granted',
                        1000,
                        `Hello, ${name}!`,
                        1000,
                        'Welcome aboard',
                        1000,
                        () => setTextColor('white'),
                        () => setTextShadow('2px #ffffff'),
                        1000,
                        () => setTypeComplete(true)
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={0}
                    speed={60}
                />
            </TypeWrapper>
        </motion.div>
    );
};

export default GreetingAnimation;