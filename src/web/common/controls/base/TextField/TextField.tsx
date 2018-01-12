import * as React from 'react'
import styled, {StyledComponentClass} from 'styled-components';

import {PINK} from 'src/common/constants/palette';

export default class TextField extends React.PureComponent<any, any> {
    render() {
        const {
            name,
            errorMessage,
            placeholder,
            label,
            type,
            value,
            onChange,
            inputProps,
            disabled,
            autoComplete,
            inputStyle,
        } = this.props;

        const inputField = (
            <StyledInput
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                autoComplete={autoComplete}
                {...inputProps}
            />
        );

        return (
            <div style={inputStyle}>
                <Text>
                    {label && <Label>{label}</Label>}
                    {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
                </Text>
                {inputField}
            </div>
        )
    }
}

const StyledInput: StyledComponentClass<any, any, any> = styled.input`
    width: 100%;
    height: 40px;
    padding: 0 10px;
    border: 2px solid #dbdcde;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 18px;
    color: rgba(115, 120, 135, 1);
    font-family: 'Work Sans';
    
    ::-webkit-input-placeholder {
      color: rgba(210, 210, 220, 1);
    }
    ::-moz-placeholder {
      color: rgba(210, 210, 220, 1);
    }
    :-ms-input-placeholder {
      color: rgba(210, 210, 220, 1);
    }
    :-moz-placeholder {
      color: rgba(210, 210, 220, 1);
    }
`;

const Text = styled.div`
    margin-bottom: 5px;
    display: flex;
`;

const Label = styled.div`
    margin-right: 5px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(55, 65, 100, 1);
`;

const ErrorText = styled.div`
    font-size: 14px;
    color: ${PINK};
`;
