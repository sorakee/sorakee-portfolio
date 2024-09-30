import React from "react";
import { waveform } from 'ldrs';
import styled from "styled-components";

waveform.register();

const LoadingContainer = styled.div`
    position: absolute;
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
`;

const LoadingAnimation: React.FC = () => {
    return (
        <LoadingContainer>
            <l-waveform
                size="35"
                stroke="3.5"
                speed="1" 
                color="white" 
            />
            <p style={{ fontFamily: 'Orbitron, sans-serif', color: 'white' }}>
                Initializing...
            </p>
        </LoadingContainer>
    );
};

export default LoadingAnimation;

    