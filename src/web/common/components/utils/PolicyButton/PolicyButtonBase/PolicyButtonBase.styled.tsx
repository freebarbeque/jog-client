import { Link } from 'react-router-dom';
import styled, { StyledComponentClass } from 'styled-components';

export const Image: StyledComponentClass<any, any, any> = styled.div`
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${(props: any) => props.bgColor || 'rgba(255, 255, 255, 1)'};
    border-radius: ${(props: any) => props.rounded ? '50%' : 'none'};
    overflow: hidden;
`;

export const Aside = styled.div`
    padding: 10px 20px;
    flex: 0 0 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    background-color: rgba(235, 235, 235, 1);
`;

export const Content = styled.div`
    padding: 10px 20px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    background-color: rgba(255, 255, 255, 1);
    color: rgba(100, 105, 125, 1);
    overflow: hidden;
`;

export const Title = styled.div`
    margin-right: 10px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-width: 0;
`;

export const PrimaryTitle = styled.div`
    font-size: 18px;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const SecondaryTitle = styled.div`
    font-size: 12px;
    margin-bottom: 5px;
`;

export const StatusText = styled.div`
    flex: 0 0 auto;
    font-size: 12px;
    color: rgba(160, 165, 175, 1);
`;

export const Arrow = styled.div`
    display: flex;
`;

export const PolicyLink: StyledComponentClass<any, any, any> = styled(Link)`
    display: flex;
    box-shadow: 0 2px 4px rgba(170, 170, 170, 0.5);
    text-decoration: none;

    &:hover {
        text-decoration: none !important;

        ${Aside} {
            background-color: rgba(200, 200, 200, 1);
        }

        ${Content} {
            background-color: rgba(230, 230, 230, 1);
        }
    }
`;
