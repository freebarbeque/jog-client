import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../FormFields/Input';
import {Link} from 'react-router-dom';
import RoundedButton from 'src/web/components/RoundedButton';
import {MARGIN} from 'src/common/constants/style';
import {ReactNode} from "react";

interface IField {
    name: string;
    label: string;
}

interface IAuthFormFieldsProps {
    fields: (IField|string)[];
    Accessories: any;
    buttonLabel: string;
}

class AuthFormFields extends React.Component<IAuthFormFieldsProps, {}> {
    public render() {
        const {
            fields,
            Accessories,
        } = this.props;

        return (
            <div>
                {fields.map((f: IField | string, i: number) => (
                    <Field
                        name={typeof f === 'string' ? f : f.name}
                        component={Input}
                        label={typeof f === 'string' ? f : f.label}
                        key={i}
                    />
                ))}
                <Accessories/>
                <RoundedButton
                    type="submit"
                    label={this.props.buttonLabel}
                    style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: MARGIN.extraLarge,
                    }}
                />
            </div>
        )
    }
}

export default AuthFormFields;