import React, { useState } from 'react';
import styled from 'styled-components';
import NameInput from './NameInput';

const LandingPageContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #1a1a1a;
    /* background-image:
        linear-gradient(#00ff00 1px, transparent 1px),
        linear-gradient(90deg, #00ff00 1px, transparent 1px);
    background-size: 20px 20px; */
    color: #00ff00;
    font-family: 'Orbitron', sans-serif;
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
            test
            {step === 'input' && <NameInput onSubmit={handleNameSubmit}/>}
            {step === 'greeting' && <button>Greeting Placeholder</button>}
            {step === 'unlocking' && <button>Unlocking Placeholder</button>}
            {step === 'content' && <button>Content Placeholder</button>}
        </LandingPageContainer>
    );
};

export default LandingPage;