import * as React from 'react';
import styled from 'styled-components';
import {DARK_GRAY} from '~/common/constants/palette';
import Step from './Step';

interface IHeaderProps {
    steps: number[];
    activeStep: number;
}

const Header = styled.div`
    height: 80px;
    background-color: ${DARK_GRAY};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StepContainer = styled.div`
    display: flex;
`;

export default (props: IHeaderProps) => {
    return (
        <Header>
            <StepContainer>
                {props.steps.map(s => <Step key={s} index={s} active={s === props.activeStep} />)}
            </StepContainer>
        </Header>
    )
}