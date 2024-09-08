import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

interface GreetingAnimationProps {
    name: string;
    onComplete: () => void;
}

const GreetingAnimation: React.FC<GreetingAnimationProps> = ({ name, onComplete }) => {
    const [textColor, setTextColor] = useState<string>('')

    return (
        <div style={{
            color: textColor,
            transition: 'color 1s ease-in-out'
        }}>
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
                    `Welcome to ARK`,
                    1000,
                    `Welcome to ARK :)`,
                    1000,
                    () => setTextColor('white'),
                    2000,
                    () => onComplete()
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
        </div>
    );
};

export default GreetingAnimation