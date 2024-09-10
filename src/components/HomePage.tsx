import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import { FaVolumeHigh } from 'react-icons/fa6';
import { FaVolumeMute } from 'react-icons/fa';
import Spaceship from './Spaceship';
import InfoCard from './InfoCard';
import CameraControls from './CameraControls';

type CameraPosition = 'center' | 'left' | 'right';

const VolumeButton = styled.button`
    right: 2%;
    bottom: 2%;
    position: absolute;
    border: none;
    background-color: transparent;

    &:hover {

    }
`;

const HomePage: React.FC = () => {
    const [mute, setMute] = useState<boolean>(false);
    const [cameraPosition, setCameraPosition] = useState<CameraPosition>('center');

    useEffect(() => {
        console.log(cameraPosition)
    }, [cameraPosition])

    return (
        <>
            <Canvas
                camera={{
                    position: [20.15, 0, -11]
                }}
                style={{
                    position: 'absolute',
                    opacity: 0.75,
                    zIndex: -1
                }}
            >
                <ambientLight intensity={1} />
                <spotLight castShadow/>
                <Spaceship />
                <CameraControls setCameraPosition={setCameraPosition}/>
            </Canvas>

            {/* Display the info card, controlling its visibility based on camera position */}
            <InfoCard position='left' currentPosition={cameraPosition}/>
            <InfoCard position='right' currentPosition={cameraPosition}/>
            <InfoCard position='center' currentPosition={cameraPosition}/>

            <VolumeButton
                onClick={() => setMute(!mute)}
            >
                {mute ? <FaVolumeMute color='white' size={28}/> : <FaVolumeHigh color='white' size={28}/>}
            </VolumeButton>
        </>
    );
}

export default HomePage;
