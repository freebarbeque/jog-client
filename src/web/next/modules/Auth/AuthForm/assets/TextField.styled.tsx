import styled from 'styled-components';

export const Field = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.div`
    margin-bottom: 8px;
    font-size: 16px;
`;

export const Error = styled.div`
    padding-top: 2px;
    padding-bottom: 2px;
    font-size: 12px;
    color: #ff4d62;
`;

export const Input = styled.input`
    width: 100%;
    height: 40px;
    padding: 5px 20px;
    line-height: 40px;
    box-sizing: border-box;
    border-radius: 4px;
    border: none;
    font-size: 18px;
    
    &::placeholder {
        font-size: 16px;
    }
`;