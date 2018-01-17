import styled, {StyledComponentClass} from 'styled-components';

import { getValidationColor } from 'src/web/common/utils/validationColor';
import {
    FIELD_DEFAULT_COLOR,
    FIELD_ERROR_COLOR,
    FIELD_LABEL_COLOR,
    FIELD_PLACEHOLDER_COLOR,
    FIELD_TEXT_COLOR
} from 'src/common/constants/palette';

export const DefaultInput: StyledComponentClass<any, any, any> = styled.input`
    width: 100%;
    height: 40px;
    padding: 0 10px;
    border: 1px solid ${FIELD_DEFAULT_COLOR};
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 18px;
    color: ${FIELD_TEXT_COLOR};
    font-family: 'Work Sans';
    
    ::-webkit-input-placeholder {
      color: ${FIELD_PLACEHOLDER_COLOR};
    }
    ::-moz-placeholder {
      color: ${FIELD_PLACEHOLDER_COLOR};
    }
    :-ms-input-placeholder {
      color: ${FIELD_PLACEHOLDER_COLOR};
    }
    :-moz-placeholder {
      color: ${FIELD_PLACEHOLDER_COLOR};
    }
`;

export const ErrorText = styled.div`
    font-size: 14px;
    color: ${FIELD_ERROR_COLOR};
`;

export const Icon = styled.div`
    margin-right: 15px;
    color: ${FIELD_PLACEHOLDER_COLOR};
    font-size: 20px;
`;

export const Container: StyledComponentClass<any, any, any> = styled.div`
    display: flex;
    align-items: center;
    border-style: solid;
    border-width: 0 0 1px 0;
    border-color: ${(props: any) => getValidationColor(props.valid, props.invalid)};
    
    ${Icon} {
        color: ${(props: any) => getValidationColor(props.valid, props.invalid)};
    }
`;

export const ModernInput: StyledComponentClass<any, any, any> = styled.input`
    flex-grow: 1;
    padding: 8px 0;
    border: none;
    background-color: transparent;
    box-sizing: border-box;
    font-size: 20px;
    color: ${FIELD_TEXT_COLOR};
    font-family: 'Work Sans';
    font-weight: 300;
    
    ::-webkit-input-placeholder {
      color: ${FIELD_PLACEHOLDER_COLOR};
    }
    ::-moz-placeholder {
      color: ${FIELD_PLACEHOLDER_COLOR};
    }
    :-ms-input-placeholder {
      color: ${FIELD_PLACEHOLDER_COLOR};
    }
    :-moz-placeholder {
      color: ${FIELD_PLACEHOLDER_COLOR};
    }
`;
