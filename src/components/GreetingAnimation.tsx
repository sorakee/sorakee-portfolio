import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import styled from 'styled-components';

const TypeWrapper = styled.div`
    font-size: 2rem;
    font-weight: 500;
    height: 50px;

    @media screen and (max-width: 440px) 
    {
        height: 40px;
        font-size: 1.35rem;
        text-align: center;
    }
`
interface GreetingAnimationProps {
    name: string;
    onComplete: () => void;
}

const GreetingAnimation: React.FC<GreetingAnimationProps> = ({ name, onComplete }) => {
    const [textColor, setTextColor] = useState<string>();
    const [textShadow, setTextShadow] = useState<string>('5px #00ff007f');
    const [typeComplete, setTypeComplete] = useState<boolean>(false);

    const textVariants = {
        hold: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 6 }
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
                transition: 'color 1s ease-in-out, text-shadow 1s ease-in-out'
            }}
            onAnimationComplete={() => onComplete()}
        >
            <TypeWrapper>
                <TypeAnimation
                    sequence={[
                        `Hello, ${name}!`,
                        1000,
                        'Preparing.',
                        500,
                        'Preparing..',
                        500,
                        'Preparing...',
                        500,
                        'Welcome aboard',
                        1000,
                        'Welcome aboard :)',
                        1000,
                        () => setTextColor('white'),
                        () => setTextShadow('2px #ffffff'),
                        2000,
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

export default GreetingAnimation