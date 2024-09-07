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
    return (
        <LandingPageContainer>
            test
        </LandingPageContainer>
    );
};

export default LandingPage;