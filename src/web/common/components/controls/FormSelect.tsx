import * as React from 'react';

import Select from './base/Select';
import FormField from './FormField';

class FormSelect extends React.PureComponent<any, any> {
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
            disabled,
            ...rest,
        } = this.props;

        const { name, value, onChange, ...restInput } = input;

        const formFieldProps = {
            name,
            compactLabel,
            errorInsideLabel,
            errorBelowField,
            errorAboveField,
            label,
            style,
            errorMessage: (meta.submitFailed && meta.error) || null,
        };

        return (
            <FormField {...formFieldProps}>
                <Select
                    value={value}
                    onChange={onChange}
                    disabled={disabled || meta.submitting}
                    valid={meta.submitFailed && meta.valid}
                    invalid={meta.submitFailed && meta.invalid}
                    {...rest}
                />
            </FormField>
        )
    }
}

export default FormSelect;
