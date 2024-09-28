import React, { useEffect, useRef } from "react";
import pfp from "/pfp-holov3.png";
import { keyframes, styled } from "styled-components";
import { Animator } from "@arwes/react-animator";
import { Text } from '@arwes/react-text'
import { BleepsOnAnimator } from "@arwes/react";
import styles from './styles/ProfileDetails.module.css'

const Title = styled.h1`
    top: -48px;
    position: fixed;
    color: white;
    font-size: 1.5rem;
    font-family: 'Orbitron', sans-serif;
    text-shadow: 0 0 64px #ffffff;

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
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.1);
    /* border-left: 1px solid white; */
    padding: 16px 0 0 16px;
    width: 60%;
    height: 82.5%;
    overflow: hidden;

    @media screen and (max-width: 440px) {
        /* background: blue; */
        padding: 6px 0 0 12px;
        width: 80%;
        height: 100%;
    }
`;

const PersonalInfoTitle = styled.div`
    @media screen and (max-width: 440px) {
        text-align: center;
    }
`;

const PersonalSocialMedia = styled.div`
    padding-top: 10px;
    display: flex;
    
    @media screen and (max-width: 440px) {
        justify-content: center;
        align-items: center;
    }
`;

const PersonalInfoContent = styled.div`
    padding-top: 10px;
    padding-right: 10px;
    overflow-y: scroll;
    display: flex;

    scrollbar-width: auto;

    &::-webkit-scrollbar {
        display: block;
        width: 4px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.5);
        border-radius: 128px;
        margin-top: 75px;
        margin-bottom: 75px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: white;
        border-radius: 64px;
    }

    @media screen and (max-width: 836px) and (orientation: landscape) {
        &::-webkit-scrollbar-track {
            margin-top: 0;
            margin-bottom: 0;
        }
    }
`;

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
    object-position: center;
    object-fit: contain;
`;

const ProfileDetails: React.FC = () => {
    const scrollableDivRef = useRef<HTMLDivElement>(null);

    // Disable scroll events on the parent when inside the scrollable div
    const stopPropagation = (event: Event) => {
        event.stopPropagation();
    };

    useEffect(() => {
        const scrollableDiv = scrollableDivRef.current;

        if (scrollableDiv) {
            // Prevent scroll on outer elements when inside scrollable div
            scrollableDiv.addEventListener('wheel', stopPropagation, { passive: true });
            scrollableDiv.addEventListener('touchmove', stopPropagation, { passive: true });
            
            return () => {
                // Clean up event listeners when the component unmounts
                scrollableDiv.removeEventListener('wheel', stopPropagation);
                scrollableDiv.removeEventListener('touchmove', stopPropagation);
            };
        }
    }, []);
    
    return (
        <>
            <Title>PERSONAL PROFILE</Title>
            <ContentContainer>
                <ImageContainer>
                    <HolographicImage src={pfp}/>
                    <HolographicBase />
                </ImageContainer>
                <PersonalInfo>
                    <Animator active={true} duration={{ enter: 0.3 }}>
                        <BleepsOnAnimator
                            transitions={{ entering: 'content' }}
                            continuous
                        />
                        <PersonalInfoTitle>
                            <Text 
                                as='div' 
                                className={styles.contentText}
                                manager='decipher'
                                easing='inSine'
                                fixed
                            >
                                <b>
                                    AKMAL RIZAL BIN ASNAN <br/>
                                    <span>Software Engineer & Music Producer</span>
                                </b>
                            </Text>
                        </PersonalInfoTitle>
                        <PersonalSocialMedia>
                            SOCIAL LINKS
                        </PersonalSocialMedia>
                        <PersonalInfoContent ref={scrollableDivRef}>
                            <Text 
                                as='div' 
                                className={styles.contentText}
                                manager='decipher'
                                easing='inSine'
                                fixed
                            >
                                <span>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam urna lorem, tincidunt ac dignissim sit amet, finibus id enim. Aenean pulvinar diam in libero placerat scelerisque a non neque. Quisque dictum quis mauris id interdum. Vestibulum non lorem quis mauris mattis laoreet ac euismod ante. Fusce eu sem placerat, sodales massa a, accumsan arcu. Nunc id ligula aliquam, vehicula massa vel, gravida eros. Maecenas interdum, eros eget venenatis rhoncus, ligula risus facilisis odio, ut sollicitudin ex libero et magna. In posuere nisl ante, eget posuere quam egestas ac. Nulla elementum interdum est, ac sollicitudin lorem consequat sed. Duis vitae blandit ipsum.
                                <br/><br/>
                                In consequat turpis sit amet orci dapibus sodales. Aenean nec enim ipsum. Nunc condimentum, velit vel placerat condimentum, magna neque scelerisque erat, ut scelerisque nisi arcu sit amet turpis. Sed condimentum, ante et dictum eleifend, nulla felis finibus ante, sed lobortis lorem orci a metus. In auctor sollicitudin quam quis tempor. Praesent quis arcu sapien. Curabitur vitae placerat tellus, non auctor ligula. Nam nunc ex, euismod nec turpis quis, accumsan elementum dui. Suspendisse non feugiat quam. Nulla vitae diam sagittis, luctus justo et, rutrum sapien.
                                </span>
                            </Text>
                        </PersonalInfoContent>
                    </Animator>
                </PersonalInfo>
            </ContentContainer>
        </>
    );
}

export default ProfileDetails;