import * as React from 'react';

import { Label, LabelContainer, ErrorText } from './styled';

interface IFormField {
    name?: string,
    compactLabel?: boolean,
    errorInsideLabel?: boolean,
    errorBelowField?: boolean,
    errorAboveField?: boolean,
    errorMessage?: string,
    label?: string,
    style?: object,
}

class FormField extends React.PureComponent<IFormField, any> {
    static defaultProps = {
        name: '',
        errorAboveField: false,
        errorBelowField: false,
        errorInsideLabel: false,
        compactLabel: false,
        errorMessage: null,
        label: null,
    };

    renderLabel = () => {
        const { compactLabel, errorInsideLabel, errorMessage, label } = this.props;

        return (
            <LabelContainer compactLabel={compactLabel}>
                <Label>{label}</Label>
                {errorInsideLabel && errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            </LabelContainer>
        );
    };

    render() {
        const {
            name,
            style,
            label,
            errorAboveField,
            errorBelowField,
            errorMessage,
        } = this.props;

        return (
            <div style={style} name={name}>
                {errorAboveField && <ErrorText>{errorMessage}</ErrorText>}
                {label && this.renderLabel()}
                {this.props.children}
                {errorBelowField && <ErrorText>{errorMessage}</ErrorText>}
            </div>
        )
    }
}

export default FormField;
