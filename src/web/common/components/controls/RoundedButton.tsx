import * as React from 'react';
import styled, { StyledComponentClass } from 'styled-components';

export default function RoundedButton(props: any) {
    const { label, buttonStyle, dirty, onClick, type } = props;

    return (
        <StyledButton
            type={type || 'button'}
            dirty={dirty}
            onClick={onClick}
            style={buttonStyle}
        >
            {label}
        </StyledButton>
    );
}

const StyledButton: StyledComponentClass<any, any, any> = styled.button`
    width: 100%;
    height: 55px;
    border-radius: 100px;
    background-color: ${(props: any) => (props.dirty ? '#ECEDEF' : '#ff4d62')};
    font-size: 18px;
    color: ${(props: any) => (props.dirty ? '#c8cdd2' : '#FFF')};
    text-align: center;
    font-family: 'Work Sans';
    cursor: pointer;
    border: none;
    outline: none;
`;
