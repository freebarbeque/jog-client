import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from '../Input/Input';
import {Link} from 'react-router-dom';
import RoundedButton from 'src/web/components/RoundedButton';
import {MARGIN} from 'src/common/constants/style';
import ErrorText from 'src/web/components/Forms/ErrorText';
import {connect} from 'react-redux';
import {IReduxState} from '~/common/interfaces/store';
import {getFormError} from '~/common/selectors/form';

interface IField {
    name: string;
    label?: string;
    type?: string;
}

interface IAuthFormFieldsProps {
    fields: (IField|string)[];
    Accessories: any;
    buttonLabel: string;
    error?: string;
    form: string;
    isLoading: boolean;
}

class AuthFormFields extends React.Component<IAuthFormFieldsProps, {}> {
    public render() {
        const {
            fields,
            Accessories,
            isLoading,
        } = this.props;

        return (
            <div>
                {fields.map((f: IField | string, i: number) => (
                    <Field
                        name={typeof f === 'string' ? f : f.name}
                        component={Input}
                        label={typeof f === 'string' ? f : f.label || f.name}
                        key={i}
                        type={typeof f === 'string' ? 'text' : f.type}
                    />
                ))}
                <Accessories/>
                {this.props.error ?
                    <ErrorText>
                        {this.props.error}
                    </ErrorText>
                    : null
                }
                <RoundedButton
                    type="submit"
                    label={this.props.buttonLabel}
                    style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: MARGIN.extraLarge,
                    }}
                    disabled={isLoading}
                />
            </div>
        )
    }
}

const mapStateToProps = (state: IReduxState, props: IAuthFormFieldsProps): Partial<IAuthFormFieldsProps> => ({
    error: getFormError(state, props),
});

export default connect(mapStateToProps, null)(AuthFormFields);