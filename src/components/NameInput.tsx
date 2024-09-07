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
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 18px;
    font-family: 'Orbitron', sans-serif;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    transition: all 0.3s ease;
    caret-color: transparent;

    &:focus {
        outline: none;
    }
`;

const Instruction = styled.span`
    height: 50px; // Set a fixed height to prevent layout shift
    display: flex;
    align-items: center;
    justify-content: center;
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
            <Instruction>
                <TypeAnimation
                    sequence={[
                        'Please enter your name',
                        () => setShowInput(true)
                    ]}
                    wrapper='span'
                    cursor={true}
                    repeat={1}
                    style={{ fontSize: '1em', display: 'inline-block' }}
                />
            </Instruction>
            <InputWrapper show={showInput}>
                <Input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type here..."
                    autoFocus
                />
            </InputWrapper>
        </InputContainer>
    );
};

export default NameInput;