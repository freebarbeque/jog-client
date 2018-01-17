import { Link } from 'react-router-dom';
import styled, {StyledComponentClass} from 'styled-components';

import { BLUE } from 'src/common/constants/palette';

export const StyledLink: StyledComponentClass<any, any, any> = styled(Link)`
    text-decoration: none;

    &:hover {
        text-decoration: none !important;
    }
`;

export const HeadSection = styled.div`
    padding: 0 45px;
    display: flex;
    align-items: center;
    background-color: ${BLUE};
`;

export const Widget = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const WidgetImage = styled.div`
    margin-right: 20px;
`;

export const WidgetArrow = styled.div`
    margin-right: 10px;
`;

export const WidgetContent = styled.div`
    font-family: 'Work Sans';
`;

export const WidgetPrimaryTitle = styled.div`
    margin-bottom: 5px;
    font-size: 32px;
`;

export const WidgetSecondaryTitle = styled.div`
    font-size: 24px;
    font-weight: 300;
`;

export const PlusIcon = styled.div`
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background-color: #FFF;
    color: #999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 64px;
    font-weight: 200;
`;