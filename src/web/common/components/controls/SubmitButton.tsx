import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';

const SubmitButton = ({ label, type, disabled, onClick }: any) => {
    return <Button type={type} disabled={disabled} onClick={onClick}>{label}</Button>;
};

const bgColor = '#FF4856';

const Button: StyledComponentClass<any, any, any> = styled.button`
    width: 100%;
    height: 40px;
    border-radius: 100px;
    background-color: ${bgColor};
    font-size: 16px;
    color: #FFF;
    text-align: center;
    font-family: 'Work Sans';
    font-weight: 500;
    cursor: pointer;
    border: none;
    outline: none;
`;

export default SubmitButton;
