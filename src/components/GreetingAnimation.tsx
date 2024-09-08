import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

interface GreetingAnimationProps {
    name: string;
    onComplete: () => void;
}

const GreetingAnimation: React.FC<GreetingAnimationProps> = ({ name, onComplete }) => {
    const [textColor, setTextColor] = useState<string>();
    const [textShadow, setTextShadow] = useState<string>('10px #00ff007f');
    const [typeComplete, setTypeComplete] = useState<boolean>(false);

    const textVariants = {
        hold: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 6 }
    };

    return (
        <motion.div 
            initial='hold'
            animate={typeComplete ? 'exit' : 'hold'}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            variants={textVariants}
            style={{
                color: textColor,
                textShadow: `0 0 ${textShadow}`,
                transition: 'color 1s ease-in-out, text-shadow 1s ease-in-out'
            }}
            onAnimationComplete={() => onComplete()}
        >
            <TypeAnimation
                sequence={[
                    `Hello, ${name}!`,
                    1000,
                    'Preparing to enter.',
                    500,
                    'Preparing to enter..',
                    500,
                    'Preparing to enter...',
                    500,
                    'Welcome aboard',
                    1000,
                    'Welcome aboard :)',
                    1000,
                    () => setTextColor('white'),
                    () => setTextShadow('5px #ffffff'),
                    2000,
                    () => setTypeComplete(true)
                ]}
                wrapper="span"
                cursor={true}
                repeat={0}
                style={{ 
                    fontSize: '2rem', 
                    height: '50px'
                }}
                speed={60}
            />
        </motion.div>
    );
};

export default GreetingAnimation