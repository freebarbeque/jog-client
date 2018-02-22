import styled, { StyledComponentClass } from 'styled-components';

export const Root = styled.div`
    width: 100%;
    min-height: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;    
    background: #131733;
    box-sizing: border-box;
`;

export const Header = styled.div`
    padding-right: 60px;
    padding-left: 60px;
    flex: 0 1 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Content = styled.div`
    padding: 30px 50px 100px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Work Sans';
    overflow: auto;
`;

export const Container: StyledComponentClass<any, any, any> = styled.div`
    padding: 30px 50px 200px;
    max-width: ${(props: any) => props.fluid ? '100%' : '400px'};
    flex: ${(props: any) => props.fluid ? '0 0 100%' : '0 0 30%'};
    display: flex;
    align-items: center;
    flex-direction: column;
    box-sizing: border-box;
`;

export const Title = styled.div`
    margin-bottom: 20px;
    font-size: 29px;
    text-align: center;
`;

export const Form = styled.div``;
