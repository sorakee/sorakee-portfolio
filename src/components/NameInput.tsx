import React, { useState, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { TypeAnimation } from 'react-type-animation';

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputWrapper = styled.div<{ show: boolean }>`
  width: 100%;
  opacity: ${props => props.show ? 1 : 0};
  transform: translateY(${props => props.show ? '0' : '20px'});
  transition: opacity 1s ease-in-out, transform 0.5s ease-in-out;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 1.5rem;
    font-family: 'Orbitron', sans-serif;
    color: ${props => props.theme.colors.text};
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    background-color: transparent;
    text-shadow: 0 0 10px #00ff007f;
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
`;

interface NameInputProps {
    onSubmit: (name: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ onSubmit }) => {
    const [inputName, setInputName] = useState('');
    const [showInput, setShowInput] = useState(false);

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
            <TypeAnimation
                sequence={[
                    'Please entr ur n',
                    100,
                    'Please enter your name :',
                    () => setShowInput(true)
                ]}
                wrapper='span'
                cursor={false}
                repeat={0}
                style={{ 
                    fontSize: '2rem', 
                    height: '50px', 
                    textShadow: '0 0 10px #00ff007f'
                }}
                speed={50}
            />
            <InputWrapper show={showInput}>
                <Input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type here..."
                    maxLength={15}
                    autoFocus
                />
            </InputWrapper>
        </InputContainer>
    );
};

export default NameInput;