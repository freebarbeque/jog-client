import * as React from 'react';
import styled from 'styled-components';

interface IStepProps {
    active: boolean;
    index: number;
}

interface IContainerProps {
    active: boolean;
}

const Container = styled.div`
    border-radius: 50%;
    border: ${(props: IContainerProps) => props.active ? '2px solid #50E3C2' : '2px solid transparent'};
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default (props: IStepProps) => {
    return (
        <Container active={props.active}>
            {props.index}
        </Container>
    )
}