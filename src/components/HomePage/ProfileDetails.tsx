import React from "react";
import pfp from "/pfp-holov3.png";
import { keyframes, styled } from "styled-components";
import { Animator } from "@arwes/react-animator";
import { Text } from '@arwes/react-text'
import styles from './styles/ProfileDetails.module.css'

const Title = styled.h1`
    /* background-color: red; */
    top: -48px;
    position: fixed;
    color: white;
    font-size: 1.5rem;
    font-family: 'Orbitron', sans-serif;
    text-shadow: 0 0 32px #ffffff;

    @media screen and (max-width: 440px) {
        font-size: 1.3rem;
    }

    @media screen and (max-width: 836px) and (orientation: landscape) {
        top: -32px;
        font-size: 1.25rem;
    }
`

const ContentContainer = styled.div`
    width: 100%;
    height: 100%;
    /* background: red; */
    color: white;
    font-family: 'Orbitron', sans-serif;
    display: flex;
    align-items: center;
    gap: 8px;

    @media screen and (max-width: 440px) {
        flex-direction: column;
    }
`;

const PersonalInfo = styled.div`
    /* background: blue; */
    border-left: 1px solid white;
    padding: 0 0 0 16px;
    width: 60%;
    height: 85%;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: inline;
    }

    @media screen and (max-width: 440px) {
        /* background: blue; */
        padding: 6px 0 0 16px;
        width: 80%;
        height: 100%;
    }
`

const hologramGlow = keyframes`
    0% {
        box-shadow: 0 0 10px rgba(78, 158, 255, 0.5), 0 0 20px rgba(78, 158, 255, 0.5),
                    inset 0 0 10px rgba(78, 158, 255, 0.7);
    }
    50% {
        box-shadow: 0 0 20px rgba(78, 158, 255, 0.9), 0 0 40px rgba(78, 158, 255, 0.9),
                    inset 0 0 20px rgba(78, 158, 255, 0.9);
    }
    100% {
        box-shadow: 0 0 10px rgba(78, 158, 255, 0.5), 0 0 20px rgba(78, 158, 255, 0.5),
                    inset 0 0 10px rgba(78, 158, 255, 0.7);
    }
`;

const shiftGradient = keyframes`
    0% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 50% 50%;
    }
`;

const HolographicBase = styled.div`
    position: absolute;
    /* background: red; */
    top: 50%;
    left: 50%;
    width: 80%;
    height: 100px;
    border-radius: 50%;
    transform: translate(-50%, 250%) rotateX(65deg);
    animation: ${hologramGlow} 3s infinite ease-in-out, ${shiftGradient} 400ms infinite linear alternate;
    
    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 50%;
        background: linear-gradient(120deg, rgba(78, 158, 255, 0.3), rgba(78, 158, 255, 0.2), rgba(0, 0, 255, 0.4));
        opacity: 0.7;
        animation: ${shiftGradient} 15ms infinite;
    }

    @media screen and (max-width: 960px) {
        height: 85px;
    }

    @media screen and (max-width: 836px) {
        width: 225px;
        height: 75px;
    }

    @media screen and (max-width: 440px) {
        width: 200px;
        height: 35px;
    }

    @media screen and (max-height: 768px) {
        height: 70px;
    }

    @media screen and (max-height: 440px) {
        height: 40px;
    }
`;

const ImageContainer = styled.div`
    /* background: white; */
    overflow: visible;
    position: relative;
    display: inline-block;
    width: 40%;
    height: 100%;

    @media screen and (max-width: 440px) {
        width: 80%;
        height: 40%;
    }
`;

const HolographicImage = styled.img`
    width: 100%;
    height: 100%;
    /* transform: translate(-50%, -50%); */
    object-position: center;
    object-fit: contain;
`;

const ProfileDetails: React.FC = () => {
    return (
        <>
            <Title>Personal Profile</Title>
            <ContentContainer>
                <ImageContainer>
                    <HolographicImage src={pfp}/>
                    <HolographicBase />
                </ImageContainer>
                <PersonalInfo>
                    <Animator active={true} duration={{ enter: 1.25 }}>
                        <Text 
                            as='div' 
                            className={styles.contentText}
                            manager='decipher'
                            easing='outSine'
                            fixed
                        >
                            <b> Name : </b> Akmal Rizal Bin Asnan <br/>
                            <b> Education : </b> 
                            BSc (Hons) Software Engineering,
                            The University of Manchester (Sept 2021 - June 2024) <br/>
                            <b> Hobbies : </b> 
                            Music Production, Manga & Gaming <br/>
                            <br/>
                            I'm an aspiring software engineer with a keen interest in AI/ML, 
                            full-stack development, and audio plugin development. 
                            Although I am early in my career, I have been actively building my skills through personal projects, 
                            courses, and hands-on experience in these areas.
                        </Text>
                    </Animator>
                </PersonalInfo>
            </ContentContainer>
        </>
    );
}

export default ProfileDetails;