import React, { useState, useEffect, Suspense } from 'react';
import styled from 'styled-components';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { RangeInput } from 'grommet';
import { MdOutlineSpeed } from "react-icons/md";
import NameInput from './NameInput';
import GreetingAnimation from './GreetingAnimation';
import PageTransition from '../../components/PageTransition';
import GameOfLife from './GameOfLife';
import LoadingAnimation from '../../components/LoadingAnimation';

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

const SliderContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row-reverse;
    width: 125px;
    height: 30px;
    bottom: 30px;

    @media screen and (max-width: 440px) {
        width: 100px;
    }

    @media screen and (max-width: 290px) {
        width: 80px;
    }

    @media screen and (max-height: 290px) {
        bottom: 10px;
    }
`;

const Slider = styled(RangeInput)`
    width: 100%;
`;

const StyledSpeed = styled(MdOutlineSpeed)`
    width: 32px;
    height: 32px;
    padding-right: 8px;

    @media screen and (max-width: 440px) {
        width: 26px;
        height: 26px;
    }

    @media screen and (max-height: 290px) {
        width: 26px;
        height: 26px;
    }
`;

const LandingPage: React.FC = () => {
    const navigate: NavigateFunction = useNavigate();
    const [name, setName] = useState<string>('');
    const [speed, setSpeed] = useState<number>(20);
    const [showGameOfLife, setShowGameOfLife] = useState<boolean>(true);
    const [dimensions, setDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
    const [step, setStep] = useState<'input' | 'greeting' | 'unlocking'>('input');

    const handleNameSubmit = (submittedName: string): void => {
        setName(submittedName);
        setShowGameOfLife(false)
        setStep('greeting');
    };
    
    const handleGreetingComplete = (): void => {
        setStep('unlocking');
    };

    const handleUnlockComplete = (): void => {
        navigate('/home');
    };

    useEffect(() => {
        function handleResize(): void {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return (): void => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <Suspense fallback={<LoadingAnimation/>}>
            <LandingPageContainer>
                <GameOfLife show={showGameOfLife} width={dimensions.width} height={dimensions.height} speed={speed}/>
                {step === 'input' && (
                    <NameInput onSubmit={handleNameSubmit}>
                        <SliderContainer>
                            <Slider
                                min={10}
                                max={60}
                                step={1}
                                value={speed}
                                disabled={false}
                                onChange={e => setSpeed(e.target.valueAsNumber)}
                            />
                            <StyledSpeed />
                        </SliderContainer>
                    </NameInput>
                )}
                {step === 'greeting' && <GreetingAnimation name={name} onComplete={handleGreetingComplete}/>}
                {step === 'unlocking' && <PageTransition isTransitioning={true} onComplete={handleUnlockComplete}/>}
            </LandingPageContainer>
        </Suspense>
    );
};

export default LandingPage;