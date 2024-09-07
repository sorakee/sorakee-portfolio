import React, { useState } from 'react';
import styled from 'styled-components';

const LandingPageContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1a1a1a;
    color: white;
`;

const LandingPage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [step, setStep] = useState<'input' | 'greeting' | 'unlocking' | 'content'>('input');

    const handleNameSubmit = (submittedName: string) => {
        setName(submittedName);
        setStep('greeting');
    };
    
    const handleGreetingComplete = () => {
        setStep('unlocking');
    };

    const handleUnlockComplete = () => {
        setStep('content');
    };

    return (
        <LandingPageContainer>
            {step === 'input' && <button>Input Placeholder</button>}
            {step === 'greeting' && <button>Greeting Placeholder</button>}
            {step === 'unlocking' && <button>Unlocking Placeholder</button>}
            {step === 'content' && <button>Content Placeholder</button>}
        </LandingPageContainer>
    );
};

export default LandingPage;