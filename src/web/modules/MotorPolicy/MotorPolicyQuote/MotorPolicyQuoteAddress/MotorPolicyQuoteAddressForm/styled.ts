import styled from 'styled-components';

export const Overlay = styled.div`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: fixed;
`;

export const ButtonsGroup = styled.div`
    display: flex;
`;

export const DropDownWrapper = styled.div`
    margin-bottom: 15px;
    position: relative;
`;

export const DropDown = styled.div`
    width: 100%;
    max-height: 160px;
    margin-top: -2px;
    position: absolute;
    overflow: auto;
    box-sizing: border-box;
    background-color: #FFF;
    border: 2px solid #dbdcde;
    border-radius: 0 0 4px 4px;
`;

export const PossibleAddress = styled.div`
    padding: 10px;
    color: rgba(115,120,135,1);
    cursor: pointer;

    &:not(:last-child) {
        border-bottom: 1px solid #dbdcde;
    }
    
    &:hover {
        background-color: rgba(250, 250, 250, 1);
    }
`;
