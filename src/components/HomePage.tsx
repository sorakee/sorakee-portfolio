import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import { FaGear, FaVolumeHigh, FaVolumeXmark } from 'react-icons/fa6';
import Spaceship from './Spaceship';
import InfoCard from './InfoCard';
import CameraControls from './CameraControls';
import CameraAnimation from './CameraAnimation';
import LoadingAnimation from './LoadingAnimation';
import { NoToneMapping } from 'three'
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette, SMAA } from '@react-three/postprocessing';
import { Leva, useControls } from 'leva';
import CameraPosition from './types/CameraPosition';
import { Environment } from '@react-three/drei';

const StyledCanvas = styled(Canvas)<{ $show: boolean }>`
    display: block;
    opacity: ${props => props.$show ? 1 : 0};
    z-index: -1;
    transition: opacity 3s;
`;

const ScifiBorder = styled.div`
    position: fixed;
    background-color: transparent;
    width: 95vw;
    height: 92.5vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    --aug-tr: 32px;
    --aug-tl: 32px;
    --aug-br: 72px;
    --aug-bl: 72px;
    --aug-l: 48px;
    --aug-r: 48px;
    --aug-border-top: 16px;
    --aug-border-bottom: 16px;
    --aug-border-left: 10px;
    --aug-border-right: 10px;
    --aug-tl-extend2: 160px;
    --aug-tr-extend1: 160px;
    transition: transform 500ms ease-in-out;
    border: 4px solid #1980ff;

    @media screen and (max-width: 440px) {
        --aug-tr: 24px;
        --aug-tl: 24px;
        --aug-br: 36px;
        --aug-bl: 36px;
        --aug-l: 16px;
        --aug-r: 16px;
        --aug-border-top: 8px;
        --aug-border-bottom: 8px;
        --aug-border-left: 8px;
        --aug-border-right: 8px;
        --aug-tl-extend2: 80px;
        --aug-tr-extend1: 80px;
        border: 2px solid #1980ff;
    }

    @media screen and (max-width: 836px) and (orientation: landscape) {
        --aug-tr: 24px;
        --aug-tl: 24px;
        --aug-br: 36px;
        --aug-bl: 36px;
        --aug-l: 16px;
        --aug-r: 16px;
        --aug-border-top: 8px;
        --aug-border-bottom: 8px;
        --aug-border-left: 8px;
        --aug-border-right: 8px;
        --aug-tl-extend2: 80px;
        --aug-tr-extend1: 80px;
        border: 2px solid #1980ff;
    }
`;

const CircleGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    width: 95vw;
    height: 87.5vh;
    gap: 24px;

    @media screen and (max-width: 440px) {
        height: 87.5vh;
    }

    @media screen and (max-width: 836px) and (orientation: landscape) {
        height: 88vh;
    }
`;

const Circle = styled.span<{ $highlight: boolean }>`
    height: 20px;
    width: 20px;
    background-color: ${props => props.$highlight ? '#1981ff' : '#ffffff'};
    border-radius: 50%;
    display: inline-block;
    transition: background-color 500ms ease-in-out;

    @media screen and (max-width: 440px) {
        height: 18px;
        width: 18px;
    }

    @media screen and (max-width: 836px) and (orientation: landscape) {
        height: 14px;
        width: 14px;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    height: 50px;
    width: 100px;
    right: 7%;
    bottom: 10%;
    position: fixed;

    @media screen and (max-width: 440px) {
        gap: 6px;
        right: 0%;
        bottom: 12.5%;
        flex-direction: column;
    }
`;

const Button = styled.button`
    border: none;
    background-color: transparent;
    border-radius: 50%;
`;

const HomePage: React.FC = () => {
    const [mute, setMute] = useState<boolean>(false);
    const [showCanvas, setShowCanvas] = useState<boolean>(false);
    const [isGuiVisible, setIsGuiVisible] = useState<boolean>(false);
    const [animationComplete, setAnimationComplete] = useState<boolean>(false);
    const [cameraPosition, setCameraPosition] = useState<CameraPosition>('center');
    const { Brightness } = useControls({ 
        Brightness: {
            value: 1, 
            min: 0, 
            max: 50, 
            step: 1
        } 
    });

    const pos: CameraPosition[] = ['left', 'right', 'center'];

    useEffect(() => {
        console.log(cameraPosition)
    }, [cameraPosition]);

    return (
        <Suspense fallback={
            <LoadingAnimation/>
        }>
            <ScifiBorder data-augmented-ui="l-clip-y r-clip-y tl-2-clip-x tr-2-clip-x br-clip bl-clip border">
                <CircleGroup>
                    <Circle $highlight={cameraPosition === 'left'}/>
                    <Circle $highlight={cameraPosition === 'center'}/>
                    <Circle $highlight={cameraPosition === 'right'}/>
                </CircleGroup>
            </ScifiBorder>
            <StyledCanvas
                $show={showCanvas}
                gl={{ 
                    antialias: true, 
                    toneMapping: NoToneMapping, 
                    preserveDrawingBuffer: false,
                }}
                linear
                shadows
            >
                <Environment files='/puresky_1k.hdr' background={true} backgroundIntensity={0.4} environmentIntensity={0}/>
                <CameraAnimation setAnimationComplete={() => setAnimationComplete(true)}/>
                <ambientLight intensity={Brightness} color='#65bcfc' />
                <Spaceship onLoad={() => setShowCanvas(true)}/>
                {animationComplete && <CameraControls setCameraPosition={setCameraPosition}/>}
                <EffectComposer>
                    <DepthOfField focusDistance={0} focalLength={0.065} bokehScale={3} height={720} />
                    <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
                    <Noise opacity={0.06} />
                    <Vignette eskil={false} offset={0.1} darkness={0.9} />
                    <SMAA />
                </EffectComposer>
            </StyledCanvas>
            {
                pos.map((item, idx) =>
                    <InfoCard 
                        key={idx}
                        position={item} 
                        currentPosition={cameraPosition} 
                        isAnimationDone={animationComplete}
                    />
                )
            }
            <Leva hidden={!isGuiVisible}/>
            <ButtonGroup>
                <Button onClick={(): void => setIsGuiVisible(!isGuiVisible)}>
                    <FaGear color='white' size={28}/>
                </Button>
                <Button onClick={(): void => setMute(!mute)}>
                    {mute ? <FaVolumeXmark color='white' size={28}/> : <FaVolumeHigh color='white' size={28}/>}
                </Button>
            </ButtonGroup>
        </Suspense>
    );
};

export default HomePage;
