import styled from 'styled-components';
import { styledComponentWithProps } from 'src/common/utils/types';
import { BLUE, LIGHT_GREEN, PALE_PINK } from 'src/common/constants/palette';

import DatePicker from 'src/web/components/PolicyDatePicker';

interface ICircleProps {
    backgroundColor?: string;
    src?: string;
}

interface IContentContainer {
    active: boolean;
}

export const ButtonStyles = {
    width: '170px',
    height: '40px',
    borderRadius: '100px',
    fontSize: '16px',
    marginBottom: '30px',
};

const conviction = styledComponentWithProps<IContentContainer, HTMLDivElement>(
    styled.div
);

const circleDiv = styledComponentWithProps<ICircleProps, HTMLDivElement>(
    styled.div
);

export const Text = styled.div`
    margin-left: 25px;
    color: ${BLUE};
    font-size: 24px;
`;

export const Circle = circleDiv`
    width: 60px;
    height: 60px;
    background-color: ${LIGHT_GREEN};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-position: 50%;
    background-size: cover;
    cursor: pointer;
`;

export const FieldTitle = styled.div`
    font-size: 20px;
    line-height: 22px;
    color: ${BLUE};
    margin-bottom: 10px;
    align-self: center;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    align-self: stretch;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
`;

export const ContentContainer = conviction`
    display: ${props => (props.active ? 'flex' : 'none')};
    flex-direction: column;
    align-self: stretch;
    padding: 30px;
    background-color: ${PALE_PINK};
`;

export const FieldContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    margin-bottom: 30px;
    & > ${DatePicker} {
        align-self: center;
    }
`;

export const Context = styled.div`
    display: flex;
    align-self: stretch;
    align-items: center;
    flex-direction: column;
`;
