import * as React from 'react';
import { ModernTextField, DefaultTextField } from './base/TextField';
import FormField from './FormField';

class FormTextField extends React.PureComponent<any, any> {
    static Modern = ModernTextField;
    static Default = DefaultTextField;

    static defaultProps = {
        design: FormTextField.Default,
    };

    render() {
        const { design: DesignedComponent, input, meta, disabled, ...rest } = this.props;
        const { name, value, onChange, ...restInput } = input;

        const formFieldProps = {
            compactLabel: this.props.compactLabel,
            errorInsideLabel: this.props.errorInsideLabel,
            errorBelowField: this.props.errorBelowField,
            errorAboveField: this.props.errorAboveField,
            errorMessage: (meta.touched && meta.error) || null,
            label: this.props.label,
            style: this.props.style,
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

export default FormTextField;
