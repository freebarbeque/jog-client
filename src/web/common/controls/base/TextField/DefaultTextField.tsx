import * as React from 'react'

import { DefaultInput } from './styled';

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
            autoComplete,
        } = this.props;

        return (
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
        );
    }
}
