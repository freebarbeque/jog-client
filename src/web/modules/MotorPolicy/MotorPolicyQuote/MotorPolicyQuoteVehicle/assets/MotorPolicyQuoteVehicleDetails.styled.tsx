import styled, { keyframes, StyledComponentClass } from 'styled-components';

const rotating = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const FormGroup  = styled.div`
    display: flex;
    
    > div {
        flex-grow: 1;

        &:not(:last-child) {
            margin-right: 20px;
        }
    }
`;

export const RefreshButton = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    border: 1px solid #DBDDE0;
    border-radius: 4px;
    cursor: pointer;
`;

export const RefreshButtonContent: StyledComponentClass<any, any, any> = styled.div`
    width: 20px;
    height: 20px;
    animation: ${(props: any) => props.loading ? `${rotating} 1.5s infinite` : ''};
`;

export const SubmitButton = styled.button`
    width: 100%;
    height: 55px;
    border-radius: 100px;
    background-color: #FF4856;
    font-size: 18px;
    color: #FFF;
    text-align: center;
    font-family: 'Work Sans';
    cursor: pointer;
    border: none;
    outline: none;
`;