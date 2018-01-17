import * as React from 'react';

import FormField from './FormField';
import RadioGroup from './base/RadioGroup';

class FormRadioGroup extends React.PureComponent<any, any> {
    render() {
        const {
            compactLabel,
            errorInsideLabel,
            errorBelowField,
            errorAboveField,
            style,
            label,
            input,
            meta,
            ...rest,
        } = this.props;

        const { name, value, onChange, ...restInput } = input;

        const formFieldProps = {
            compactLabel,
            errorInsideLabel,
            errorBelowField,
            errorAboveField,
            label,
            style,
            errorMessage: (meta.touched && meta.error) || null,
        };

        return (
            <FormField {...formFieldProps}>
                <RadioGroup
                    name={name}
                    value={value}
                    onChange={onChange}
                    inputProps={restInput}
                    {...rest}
                />
            </FormField>
        )
    }
}

export default FormRadioGroup;
