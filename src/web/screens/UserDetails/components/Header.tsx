import * as React from 'react';
import styled from 'styled-components';
import {FOOTER_BACKGROUND_COLOR, WHITE} from '~/common/constants/palette';
import Step from './Step';
import {LeftArrow} from 'src/web/images';

interface IHeaderProps {
    steps: number[];
    activeStep: number;
    onBack: () => void;
    title: string;
}

const Header = styled.div`
    height: 80px;
    background-color: ${FOOTER_BACKGROUND_COLOR};
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

const Title = styled.div`
    font-size: 24px;
    color; ${WHITE};
`

export default (props: IHeaderProps) => {
    return (
        <Header>
            <BackButton onClick={props.onBack}>
                <LeftArrow/>
            </BackButton>
            <Title>{props.title}</Title>
            <StepContainer>
                {props.steps.map(s => <Step key={s} index={s} active={s === props.activeStep} />)}
            </StepContainer>
        </Header>
    )
}