import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import { FaGear, FaVolumeHigh, FaVolumeXmark } from 'react-icons/fa6';
import SpaceshipV2 from './SpaceshipV2';
import InfoCard from './InfoCard';
import CameraControls from './CameraControls';
import CameraAnimation from './CameraAnimation';
import { waveform } from 'ldrs';
import { NoToneMapping } from 'three'
import { Bloom, DepthOfField, EffectComposer, Noise, Vignette, SMAA } from '@react-three/postprocessing';
import { Leva, useControls } from 'leva';

waveform.register()

type CameraPosition = 'center' | 'left' | 'right';

const LoadingContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const StyledCanvas = styled(Canvas)<{ $show: boolean }>`
    position: absolute;
    opacity: ${props => props.$show ? 1 : 0};
    z-index: -1;
    transition: opacity 3s;
`

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    height: 50px;
    width: 100px;
    right: 2%;
    bottom: 2%;
    position: fixed;
`

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
            value: 7.5, 
            min: 0, 
            max: 50, 
            step: 1
        } 
    })

    useEffect(() => {
        console.log(cameraPosition)
    }, [cameraPosition])

    return (
        <Suspense fallback={
            <LoadingContainer>
                <l-waveform
                    size="35"
                    stroke="3.5"
                    speed="1" 
                    color="white" 
                />
                <p style={{ fontFamily: 'Orbitron, sans-serif' }}>
                    Loading...
                </p>
            </LoadingContainer>
        }>
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
                <CameraAnimation setAnimationComplete={() => setAnimationComplete(true)}/>
                <ambientLight intensity={Brightness} />
                <SpaceshipV2 onLoad={() => setShowCanvas(true)}/>
                {animationComplete && <CameraControls setCameraPosition={setCameraPosition}/>}
                <EffectComposer>
                    <DepthOfField focusDistance={0} focalLength={0.065} bokehScale={3} height={720} />
                    <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} />
                    <Noise opacity={0.02} />
                    <Vignette eskil={false} offset={0.1} darkness={0.75} />
                    <SMAA />
                </EffectComposer>
            </StyledCanvas>

            <InfoCard position='left' currentPosition={cameraPosition} isAnimationDone={animationComplete}/>
            <InfoCard position='right' currentPosition={cameraPosition} isAnimationDone={animationComplete}/>
            <InfoCard position='center' currentPosition={cameraPosition} isAnimationDone={animationComplete}/>
            <Leva hidden={!isGuiVisible}/>

            <ButtonGroup>
                <Button
                    onClick={() => setIsGuiVisible(!isGuiVisible)}
                >
                    <FaGear color='white' size={28}/>
                </Button>
                <Button
                    onClick={() => setMute(!mute)}
                >
                    {mute ? <FaVolumeXmark color='white' size={28}/> : <FaVolumeHigh color='white' size={28}/>}
                </Button>
            </ButtonGroup>
        </Suspense>
    );
}

export default HomePage;
