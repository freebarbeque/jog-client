import * as React from 'react';

import * as s from './assets/TextField.styled';

export default class TextField extends React.PureComponent<any, any> {
    static defaultProps = {
        placeholder: '',
        type: 'text',
        label: '',
    };

    render() {
        const { type, input, meta, label, placeholder } = this.props;
        const { name, value, onChange } = input;

        return (
            <s.Field>
                {label && <s.Label>{label}</s.Label>}
                <s.Input
                    autoComplete="off"
                    type={type}
                    name={name}
                    value={value || ''}
                    onChange={onChange}
                    disabled={meta.submitting}
                    placeholder={placeholder}
                />
                {meta.touched && meta.error && <s.Error>{meta.error}</s.Error>}
            </s.Field>
        );
    }
}
