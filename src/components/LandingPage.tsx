import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NameInput from './NameInput';
import GreetingAnimation from './GreetingAnimation';
import UnlockAnimation from './UnlockAnimation';
import { theme } from '../styles/theme'

const LandingPageContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-family: 'Orbitron', sans-serif;
    box-sizing: border-box;
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
        <ThemeProvider theme={theme}>
            <LandingPageContainer>
                {step === 'input' && <NameInput onSubmit={handleNameSubmit}/>}
                {step === 'greeting' && <GreetingAnimation name={name} onComplete={handleGreetingComplete}/>}
                {step === 'unlocking' && <UnlockAnimation onComplete={handleUnlockComplete}/>}
                {step === 'content' && <button>Content Placeholder</button>}
            </LandingPageContainer>
        </ThemeProvider>
    );
};

export default LandingPage;