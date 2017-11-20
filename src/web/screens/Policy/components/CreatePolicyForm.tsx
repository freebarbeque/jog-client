import * as React from 'react';
import {reduxForm} from 'redux-form';
import {CREATE_POLICY_FORM} from 'src/common/constants/policies';

interface ICreatePolicyFormProps {

}

const CreatePolicyForm = (props: ICreatePolicyFormProps) => (
    <form>
        Form
    </form>
);

const form = reduxForm({
    form: CREATE_POLICY_FORM,
})(CreatePolicyForm);

export default form;