import styled, {StyledComponentClass} from 'styled-components';

import { getValidationColor } from 'src/web/common/utils/form/validationColor';
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
    box-sizing: border-box;
    border: none;
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
    padding: 0 10px;
    color: ${FIELD_PLACEHOLDER_COLOR};
    font-size: 24px;
`;

export const DefaultContainer: StyledComponentClass<any, any, any> = styled.div`
    display: flex;
    align-items: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 4px;
    border-color: ${(props: any) => getValidationColor(props.valid, props.invalid)};
    overflow: hidden;
    
    ${Icon} {
        border-right: ${(props: any) => `1px solid ${getValidationColor(props.valid, props.invalid)}`};
        color: ${(props: any) => getValidationColor(props.valid, props.invalid)};
    }
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
