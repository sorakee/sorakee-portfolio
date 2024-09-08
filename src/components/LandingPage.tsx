import React, { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NameInput from './NameInput';
import GreetingAnimation from './GreetingAnimation';
import UnlockAnimation from './UnlockAnimation';
import GameOfLife from './GameOfLife';
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
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [showGameOfLife, setShowGameOfLife] = useState<boolean>(true);
    const [dimensions, setDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
    const [step, setStep] = useState<'input' | 'greeting' | 'unlocking' | 'content'>('input');

    const handleNameSubmit = (submittedName: string) => {
        setName(submittedName);
        setShowGameOfLife(false)
        setStep('greeting');
    };
    
    const handleGreetingComplete = () => {
        setStep('unlocking');
    };

    const handleUnlockComplete = () => {
        setStep('content');
        navigate('/home');
    };

    useEffect(() => {
        function handleResize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <LandingPageContainer>
                <GameOfLife show={showGameOfLife} width={dimensions.width} height={dimensions.height} speed={20}/>
                {step === 'input' && <NameInput onSubmit={handleNameSubmit}/>}
                {step === 'greeting' && <GreetingAnimation name={name} onComplete={handleGreetingComplete}/>}
                {step === 'unlocking' && <UnlockAnimation isUnlocked={true} onComplete={handleUnlockComplete}/>}
                {step === 'content' && <button>Content Placeholder</button>}
            </LandingPageContainer>
        </ThemeProvider>
    );
};

export default LandingPage;