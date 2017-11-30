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

interface IAddressFormProps {
    className: string;
    handleSubmit: any;
}

const AddressForm = (props: IAddressFormProps) => {
    return (
        <form className={props.className} onSubmit={props.handleSubmit}>
            <FieldTitle>Post Code</FieldTitle>
            <Field
                name="postcode"
                component={StyledInput}
            />
            <RoundedButton
                type="submit"
                label="Next"
                style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: MARGIN.extraLarge,
                }}
                disabled={false}
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

const validateForm = (values: IAddressFormValues) => {
    const errors = validate(values, validationSchema, {fullMessages: false})
    return errors;
}

const formOptions = {
    form: 'addressDetailsForm',
    validate: validateForm,
};

export default reduxForm(formOptions)(styledForm(AddressForm));