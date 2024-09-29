import React, { useState, Suspense } from 'react';
import styled from 'styled-components';
import { FaGear, FaVolumeHigh, FaVolumeXmark } from 'react-icons/fa6';
import { Leva, useControls } from 'leva';
import InfoCard from './InfoCard';
import LoadingAnimation from '../LoadingAnimation';
import VideoTransition from './VideoTransition';
import ProfileBg from './ProfileBg';
import CameraPosition from '../types/CameraPosition';
import { useBleeps } from '@arwes/react';

// ONLY USED FOR RECORDING THREEJS ANIMATIONS
// import { Canvas } from '@react-three/fiber';
// import Spaceship from './Spaceship';
// import CameraControls from './CameraControls';
// import CameraAnimation from './CameraAnimation';
// import { NoToneMapping } from 'three'
// import { Bloom, DepthOfField, EffectComposer, Noise, Vignette, SMAA, SSR } from '@react-three/postprocessing';
// const StyledCanvas = styled(Canvas)<{ $show: boolean }>`
//     display: block;
//     opacity: ${props => props.$show ? 1 : 0};
//     z-index: -1;
//     transition: opacity 3s;
// `;

const ScifiBorder = styled.div<{ $visible: boolean, $showDetails: boolean }>`
    position: absolute;
    background-color: ${props => props.$showDetails ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0)'};
    width: 95vw;
    height: 95vh;
    top: 50%;
    left: 50%;
    color: ${props => props.$showDetails ? '#4e9eff' : 'white'};
    transform: translate(-50%, -50%) scale(1);
    opacity: ${props => props.$visible ? 1 : 0};
    --aug-tr: 32px;
    --aug-tl: 32px;
    --aug-br: 72px;
    --aug-bl: 72px;
    --aug-l: 48px;
    --aug-r: 48px;
    --aug-border-top: 4px;
    --aug-border-bottom: 4px;
    --aug-border-left: 4px;
    --aug-border-right: 4px;
    --aug-tl-extend2: 160px;
    --aug-tr-extend1: 160px;
    transition: all 400ms ease-in-out;
    border: 1px solid #1980ff;
    backdrop-filter: ${props => props.$showDetails ? 'blur(4px)' : 'blur(0px)'};

    @media screen and (max-width: 440px) {
        --aug-tr: 24px;
        --aug-tl: 24px;
        --aug-br: 36px;
        --aug-bl: 36px;
        --aug-l: 16px;
        --aug-r: 16px;
        --aug-tl-extend2: 80px;
        --aug-tr-extend1: 80px;
    }

    @media screen and (max-width: 836px) and (orientation: landscape) {
        --aug-tr: 24px;
        --aug-tl: 24px;
        --aug-br: 36px;
        --aug-bl: 36px;
        --aug-l: 16px;
        --aug-r: 16px;
        --aug-tl-extend2: 80px;
        --aug-tr-extend1: 80px;
    }
`;

const CircleGroup = styled.div`
    display: flex;
    position: absolute;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    width: 95vw;
    bottom: 4.5%;
    gap: 24px;

    @media screen and (max-width: 440px) {
        bottom: 4.5%;
    }

    @media screen and (max-width: 836px) and (orientation: landscape) {
        bottom: 6.5%;
    }
`;

const Circle = styled.span<{ $highlight: boolean }>`
    height: 20px;
    width: 20px;
    background-color: ${props => props.$highlight ? '#3e95ff' : '#ffffff'};
    border-radius: 50%;
    display: inline-block;
    transition: background-color 500ms ease-in-out;

    @media screen and (max-width: 440px) {
        height: 16px;
        width: 16px;
    }

    @media screen and (max-width: 836px) and (orientation: landscape) {
        height: 12px;
        width: 12px;
    }
`;

const ButtonGroup = styled.div<{ $show: boolean }>`
    z-index: 10;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    right: 10%;
    bottom: 5%;
    position: absolute;
    opacity: ${props =>  props.$show ? 1 : 0};
    transition: opacity 500ms ease-in-out;

    @media screen and (max-width: 440px) {
        right: 5%;
        bottom: 60%;
        flex-direction: column;
    }

    @media screen and (max-width: 320px) {
        right: 2.5%;
        bottom: 60%;
        flex-direction: column;
    }

    @media screen and (max-width: 836px) and (orientation: landscape) {
        right: 10%;
        bottom: 5%;
    }
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;

    /* Icon Size */
    & > * {
        width: 24px;
        height: 24px;
    }

    @media screen and (max-width: 440px) {
        width: 50px;
        height: 32px;

        & > * {
            width: 20px;
            height: 20px;
        }
    }

    @media screen and (max-width: 836px) and (orientation: landscape) {
        width: 32px;
        height: 32px;

        & > * {
            width: 18px;
            height: 18px;
        }
    }
`;

const VideoContainer = styled.div`
    position: absolute;
    z-index: -1;
`;

const Tip = styled.span<{ $isAnimationDone: boolean }>`
    bottom: 3.75%;
    left: 50%;
    position: absolute;
    font-family: 'Orbitron', sans-serif;
    font-size: 0.75rem;
    opacity: ${props => props.$isAnimationDone ? 0.5 : 0};
    transform: translateX(-50%);
    transition: opacity 400ms ease-in-out;

    @media screen and (max-width: 440px) {
        font-size: 0.6rem;
    }

    @media screen and (max-width: 836px) and (orientation: landscape) {
        bottom: 2.5%;
        font-size: 0.5rem;
    }
`

const HomePage: React.FC = () => {
    // ONLY USED FOR RECORDING THREEJS ANIMATIONS
    // const [showCanvas, setShowCanvas] = useState<boolean>(false);

    const bleeps = useBleeps();
    const [mute, setMute] = useState<boolean>(false);
    const [showDetails, setShowDetails] = useState<boolean>(false);
    const [isGuiVisible, setIsGuiVisible] = useState<boolean>(false);
    const [animationComplete, setAnimationComplete] = useState<boolean>(false);
    const [cameraPosition, setCameraPosition] = useState<CameraPosition>('center');
    const { Opacity } = useControls({ 
        Opacity: {
            value: 0.75, 
            min: 0, 
            max: 1, 
            step: 0.05
        }
    });

    const handleShowDetails = (state: boolean): void => {
        setShowDetails(state);
    };

    const handleCameraPosition = (pos: CameraPosition) => {
        setCameraPosition(pos);
    };

    return (
        <Suspense fallback={<LoadingAnimation/>}>
            <ScifiBorder $visible={animationComplete} $showDetails={showDetails} data-augmented-ui="l-clip-y r-clip-y tl-2-clip-x tr-2-clip-x br-clip bl-clip border">
                <ProfileBg showDetails={showDetails}/>
                <CircleGroup>
                    <Circle $highlight={cameraPosition === 'left'} />
                    <Circle $highlight={cameraPosition === 'center'} />
                    <Circle $highlight={cameraPosition === 'right'} />
                </CircleGroup>
            </ScifiBorder>

            <>
                {/* ONLY USED FOR RECORDING THREEJS ANIMATIONS */}
                {/* <StyledCanvas
                    $show={showCanvas}
                    gl={{ 
                        antialias: true, 
                        toneMapping: NoToneMapping, 
                        preserveDrawingBuffer: false,
                    }}
                    linear
                    shadows
                >
                    <CameraAnimation setAnimationComplete={() => setAnimationComplete(true)}/>
                    <ambientLight intensity={Brightness} />
                    <Spaceship onLoad={() => setShowCanvas(true)}/>
                    {animationComplete && <CameraControls setCameraPosition={setCameraPosition}/>}
                    <EffectComposer>
                        <DepthOfField focusDistance={0} focalLength={0.065} bokehScale={3} height={720} />
                        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
                        <Noise opacity={0.06} />
                        <Vignette eskil={false} offset={0.1} darkness={0.9} />
                        <SMAA />
                        <SSR />
                    </EffectComposer>
                </StyledCanvas> */}
            </>
            
            <VideoContainer style={{ opacity: Opacity }}>
                <video
                    width="100%"
                    height="100%"
                    style={{ 
                        position: 'fixed',
                        opacity: !animationComplete ? 1 : 0,
                        objectPosition: 'center',
                        objectFit: 'cover',
                        zIndex: 1,
                        transition: 'opacity 500ms ease-in-out'
                    }}
                    onEnded={() => {
                        setAnimationComplete(true)
                    }}
                    muted
                    autoPlay
                >
                    <source src="/transition/Enter.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {animationComplete ? <VideoTransition mute={mute} cameraPosition={cameraPosition} onChange={handleCameraPosition} /> : null}
            </VideoContainer>

            <InfoCard position='left' currentPosition={cameraPosition} isAnimationDone={animationComplete} showDetails={showDetails} onShow={handleShowDetails} />
            <InfoCard position='right' currentPosition={cameraPosition} isAnimationDone={animationComplete} showDetails={showDetails} onShow={handleShowDetails} />
            <InfoCard position='center' currentPosition={cameraPosition} isAnimationDone={animationComplete} showDetails={showDetails} onShow={handleShowDetails} />

            <Leva hidden={!isGuiVisible}/>
            <ButtonGroup $show={animationComplete}>
                <Button onClick={(): void => {
                    setIsGuiVisible(!isGuiVisible);
                    if (!mute) bleeps.click?.play();
                }}>
                    <FaGear color='white'/>
                </Button>
                <Button onClick={(): void => {
                    setMute(!mute);
                    bleeps.click?.play();
                }}>
                    {mute ? <FaVolumeXmark color='white'/> : <FaVolumeHigh color='white'/>}
                </Button>
            </ButtonGroup>
            <Tip $isAnimationDone={animationComplete}>Scroll or swipe to navigate</Tip>
        </Suspense>
    );
};

export default HomePage;
