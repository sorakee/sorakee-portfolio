import React, { useState, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { TypeAnimation } from 'react-type-animation';

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputWrapper = styled.div<{ $show: boolean }>`
    text-align: center;
    width: 100%;
    opacity: ${props => props.$show ? 1 : 0};
    transform: translateY(${props => props.$show ? '0' : '20px'});
    transition: opacity 1s ease-in-out, transform 0.5s ease-in-out;
`;

const TypeWrapper = styled.div`
    font-size: 2rem;
    font-weight: 500;
    height: 35px;
    text-shadow: 0 0 5px #00ff007f;

    @media screen and (max-width: 440px) 
    {
        height: 30px;
        font-size: 1.35rem;
        text-align: center;
    }

    @media screen and (max-width: 290px) 
    {
        height: 50px;
    }
`

const Input = styled.input`
    padding: 10px;
    font-size: 1.5rem;
    font-family: 'Orbitron', sans-serif;
    color: ${props => props.theme.colors.text};
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    background-color: transparent;
    border: none;

    &:focus {
        outline: none;
    }

    &:hover {
        cursor: pointer;
    }

    &::placeholder {
        text-shadow: none;
    }

    @media screen and (max-width: 440px) 
    {
        font-size: 1rem;
    }
`;

const Note = styled.span`
    color: #d3d3d361;
    font-size: 0.75rem;

    @media screen and (max-width: 440px) 
    {
        font-size: 0.5rem;
    }
`;

interface NameInputProps {
    onSubmit: (name: string) => void;
    children?: React.ReactNode;
};

const NameInput: React.FC<NameInputProps> = ({ onSubmit, children }) => {
    const [inputName, setInputName] = useState<string>('');
    const [showInput, setShowInput] = useState<boolean>(false);

    const handleSubmit = () => {
        if (inputName.trim()){
            onSubmit(inputName.trim());
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <InputContainer>
            <TypeWrapper>
                <TypeAnimation
                    sequence={[
                        'Please entr ur n',
                        100,
                        'Please enter your name',
                        () => setShowInput(true)
                    ]}
                    wrapper='span'
                    cursor={false}
                    repeat={0}
                    speed={50}
                />
            </TypeWrapper>
            <InputWrapper $show={showInput}>
                <Input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type here..."
                    maxLength={15}
                    autoFocus
                />
                <Note>*Your information will not be stored</Note>
            </InputWrapper>
            {children}
        </InputContainer>
    );
};

export default NameInput;