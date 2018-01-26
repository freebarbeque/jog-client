import * as React from 'react'

import { DefaultInput, Icon, DefaultContainer } from './styled';

export default class DefaultTextField extends React.PureComponent<any, any> {
    static defaultProps = {
        type: 'text',
        name: null,
        value: '',
        leftIcon: null,
        placeholder: null,
        inputProps: {},
        disabled: false,
        autoComplete: 'off',
    };

    render() {
        const {
            name,
            placeholder,
            type,
            value,
            onChange,
            inputProps,
            disabled,
            valid,
            invalid,
            autoComplete,
            leftIcon,
        } = this.props;

        return (
            <DefaultContainer
                valid={valid}
                invalid={invalid}
            >
                {leftIcon && <Icon>{leftIcon}</Icon>}
                <DefaultInput
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    {...inputProps}
                />
            </DefaultContainer>
        );
    }
}
