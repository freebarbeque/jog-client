import styled, {StyledComponentClass} from 'styled-components';

export const Container: StyledComponentClass<any, any> = styled.div`
    display: flex;
    border-radius: 3.5px;
    overflow: hidden;
    button {
        top: 0!important;
        right: 0!important;
    }
    > div {
        width: 100%;
    }
`;

export const Wrapper = styled.div`
    flex:1;
`;
