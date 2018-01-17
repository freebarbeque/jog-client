import styled, {StyledComponentClass} from 'styled-components';

import {
    FIELD_DEFAULT_COLOR,
    FIELD_ERROR_COLOR,
    FIELD_LABEL_COLOR,
    FIELD_PLACEHOLDER_COLOR,
    FIELD_TEXT_COLOR
} from 'src/common/constants/palette';

export const Label = styled.div`
    margin-right: 5px;
    color: ${FIELD_LABEL_COLOR};
`;

export const ErrorText = styled.div`
    font-size: 14px;
    color: ${FIELD_ERROR_COLOR};
`;

export const LabelContainer: StyledComponentClass<any, any, any> = styled.div`
    margin-bottom: ${(props: any) => props.compactLabel ? '5px' : '8px'};
    display: flex;
    font-family: 'Work Sans';
    font-size: ${(props: any) => props.compactLabel ? '14px' : '20px'};
    
    ${Label} {
        font-weight: ${(props: any) => props.compactLabel ? '500' : 'normal'}
    }
`;
