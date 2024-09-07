import React, { useState } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 18px;
    font-family: 'Orbitron', sans-serif;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
`
const Button = styled.button`
    padding: 10px 20px;
    font-size: 18px;
    background-color: #4caf50;
    color: white;
    border: none;
    cursor: pointer;
`;

interface NameInputProps {
    onSubmit: (name: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ onSubmit }) => {
    const [inputName, setInputName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputName.trim()){
            onSubmit(inputName.trim());
        }
    };

    return (
        <InputContainer>
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="Enter your name"
                />
                <Button type="submit">Submit</Button>
            </form>
        </InputContainer>
    );
};

export default NameInput;