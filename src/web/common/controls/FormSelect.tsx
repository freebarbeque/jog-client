import * as React from 'react';

import { ModernSelect, DefaultSelect } from './base/Select';
import FormField from './FormField';

class FormSelect extends React.PureComponent<any, any> {
    static Modern = ModernSelect;
    static Default = DefaultSelect;

    static defaultProps = {
        design: FormSelect.Default,
    };

    render() {
        const {
            design: DesignedComponent,
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
                <DesignedComponent
                    name={name}
                    value={value}
                    onChange={onChange}
                    inputProps={restInput}
                    disabled={disabled || meta.submitting}
                    valid={meta.touched && meta.valid}
                    invalid={meta.touched && meta.invalid}
                    {...rest}
                />
            </FormField>
        )
    }
}

export default FormSelect;
