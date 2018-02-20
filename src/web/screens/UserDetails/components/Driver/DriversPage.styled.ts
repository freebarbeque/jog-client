import styled from 'styled-components';
import { styledComponentWithProps } from 'src/common/utils/types';
import {
    WHITE,
    BLUE,
    PINK,
    DARK_PINK,
    LIGHT_GREEN,
    SHADOW_COLOR,
    FIELD_LABEL_COLOR,
    FIELD_VALID_COLOR,
    FIELD_DEFAULT_COLOR,
} from 'src/common/constants/palette';
import { DownArrow } from 'src/web/images';

const divWithOnClick = styledComponentWithProps<
    { onClick?: any },
    HTMLDivElement
>(styled.div);
const ActiveDriver = styledComponentWithProps<
    { active: boolean },
    HTMLDivElement
>(styled.div);

export const ButtonModalWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    & > div:first-child {
        margin-right: 15px;
        background-color: transparent;
        border: 3px solid ${LIGHT_GREEN};
        height: 34px;
    }
`;

export const ButtonModal = divWithOnClick`
    height: 40px;
    background-color: ${LIGHT_GREEN};
    box-shadow: 0 4px 4px #ddd;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: ${BLUE};
    display: flex;
    flex: 1;
    cursor: pointer;
`;

export const TextModal = styled.div`
    color: ${BLUE};
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    height: 60%;
    font-size: 18px;
`;

export const ContentWrapper = styled.div`
    display: block;
    width: 100%;
`;

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const Name = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StyledDownArrow = styled(DownArrow)`
    transform: rotate(180deg);
    margin-top: 10px;
`;

export const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    border: 3px solid ${LIGHT_GREEN};
    padding: 10px;
    cursor: pointer;
`;

export const Text = styled.div`
    margin-left: 15px;
    color: ${BLUE};
    font-size: 24px;
`;

export const Circle = styled.div`
    width: 45px;
    height: 45px;
    background-color: ${LIGHT_GREEN};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-position: 50%;
    background-size: cover;
    cursor: pointer;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    align-self: stretch;
    justify-content: space-between;
    align-items: center;

    button {
        flex: 1 1 auto;
    }

    button + button {
        margin: 0 0 0 10px;
    }
`;

export const Title = styled.div`
    font-size: 20px;
    line-height: 22px;
    color: ${BLUE};
    margin-bottom: 25px;
    align-self: center;
`;

export const DriversContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-self: stretch;
`;

export const DriverListItem = styled.div`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    flex: 1;
`;

export const DriverWrapper = ActiveDriver`
    display: flex;
    flex: 1;
    height: 40px;
    margin-bottom: 8px;
    padding: 0 16px;
    background-color: ${(props: { active: boolean }) =>
        props.active ? `rgba(35, 50, 85, 0.7)` : FIELD_DEFAULT_COLOR};
    border-radius: 3px;
    box-shadow: 0 2px 4px 0 ${SHADOW_COLOR};
`;

export const Driver = ActiveDriver`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: ${(props: { active: boolean }) => (props.active ? WHITE : BLUE)};
    font-size: 18px;
    flex: 1;
`;

export const DriverActions = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1 0 auto;
    margin-left: auto;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    width: 100%;
    margin-bottom: 30px;
`;
export const ContainerBox = styled.div`
    display: block;
`;

export const FormSection = styled.div`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    padding: 0 50px;
    flex: 1;
`;
