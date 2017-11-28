import * as React from 'react';
import styled from 'styled-components';
import {DARK_GRAY} from '~/common/constants/palette';
import Step from './Step';
import {LeftArrow} from 'src/web/images';

interface IHeaderProps {
    steps: number[];
    activeStep: number;
    onBack: () => void;
}

const Header = styled.div`
    height: 80px;
    background-color: ${DARK_GRAY};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
`;

const StepContainer = styled.div`
    display: flex;
`;

const BackButton = styled.div`
    &:hover{
        cursor: pointer;
    }
`

export default (props: IHeaderProps) => {
    return (
        <Header>
            <BackButton onClick={props.onBack}>
                <LeftArrow/>
            </BackButton>
            <StepContainer>
                {props.steps.map(s => <Step key={s} index={s} active={s === props.activeStep} />)}
            </StepContainer>
        </Header>
    )
}