import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
import FieldTitle from '../FieldTitle';
import styledForm from '../styledForm';
import StyledInput from '../StyledInput';
import {isPostCode} from '~/common/utils/userDetails';
import {IAddressFormValues} from '~/common/interfaces/userDetails';
const validate = require('validate.js');
import RoundedButton from 'src/web/components/RoundedButton';
import {MARGIN} from 'src/common/constants/style';
import {POSTCODE_FORM} from 'src/common/constants/userDetails';
import ErrorText from 'src/web/components/Forms/ErrorText';
import {IReduxState} from '~/common/interfaces/store';
import {getIsLoading, getPostCode} from '~/common/selectors/userDetils';
import {connect} from 'react-redux';

interface IPostCodeFormProps {
    className: string;
    handleSubmit: any;
    error: string;
    isLoading: boolean;
    initialValues: any;
}

const PostCodeForm = (props: IPostCodeFormProps) => {
    return (
        <form className={props.className} onSubmit={props.handleSubmit}>
            <FieldTitle>Post Code</FieldTitle>
            <Field
                name="postcode"
                component={StyledInput}
            />
            {props.error ?
                <ErrorText>
                    {props.error}
                </ErrorText>
                : null
            }
            <RoundedButton
                type="submit"
                label="Next"
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: MARGIN.extraLarge,
                }}
                disabled={props.isLoading}
            />
        </form>
    )
};

validate.validators.isPostCode = isPostCode;

const validationSchema = {
    postcode: {
        isPostCode,
    },
}

const mapStateToProps = (state: IReduxState) => ({
    isLoading: getIsLoading(state),
    initialValues: {postcode: getPostCode(state)},
});

const validateForm = (values: IAddressFormValues) => {
    const errors = validate(values, validationSchema, {fullMessages: false})
    return errors;
}

const formOptions = {
    form: POSTCODE_FORM,
    validate: validateForm,
};

export default (connect(mapStateToProps, null)(reduxForm(formOptions)(styledForm(PostCodeForm)))) as any;