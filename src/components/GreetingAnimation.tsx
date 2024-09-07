import React from 'react';
import { TypeAnimation } from 'react-type-animation';

interface GreetingAnimationProps {
    name: string;
    onComplete: () => void;
}

const GreetingAnimation: React.FC<GreetingAnimationProps> = ({ name, onComplete }) => {
    return (
        <TypeAnimation
            sequence={[
                `Hello, ${name}!`,
                1000,
                `Welcome to my domain...`,
                1000,
                'Preparing to unlock.',
                1000,
                'Preparing to unlock..',
                1000,
                'Preparing to unlock...',
                1000,
                () => onComplete(),
            ]}
            wrapper="span"
            cursor={true}
            repeat={1}
            style={{ 
                fontSize: '2rem', 
                height: '50px', 
                textShadow: '0 0 10px #00ff007f'
            }}
            speed={60}
        />
    );
};

export default GreetingAnimation