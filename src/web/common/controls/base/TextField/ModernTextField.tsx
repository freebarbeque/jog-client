import * as React from 'react'

import { ModernInput, Icon, Container } from './styled';

class ModernTextField extends React.PureComponent<any, any> {
    static defaultProps = {
        type: 'text',
        name: null,
        value: '',
        leftIcon: null,
        placeholder: null,
        inputProps: {},
        disabled: false,
        valid: false,
        invalid: false,
        autoComplete: 'off',
    };

    render() {
        const {
            type,
            placeholder,
            name,
            value,
            onChange,
            disabled,
            valid,
            invalid,
            autoComplete,
            inputProps,
            leftIcon,
        } = this.props;

        return (
            <Container
                valid={valid}
                invalid={invalid}
            >
                {leftIcon && <Icon>{leftIcon}</Icon>}
                <ModernInput
                    type={type}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    autoComplete={autoComplete}
                    {...inputProps}
                />
            </Container>
        )
    }
}

export default ModernTextField;
