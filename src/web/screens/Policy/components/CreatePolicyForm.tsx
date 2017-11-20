import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
import {CREATE_POLICY_FORM} from 'src/common/constants/policies';
import styled from 'styled-components';
import Select from 'src/web/components/Forms/Select';

interface ICreatePolicyFormProps {

}

const Header = styled.div`
    width: 100%;
    height: 42px;
    background-color: #ECEDEF;
    display: flex;
    align-items: center;
    padding: 0 10px;
`;

const CreatePolicyForm = (props: ICreatePolicyFormProps) => (
    <form>
        <Header>Six quick questions to add your policy</Header>
        <Field
            name="insurer"
            component={Select}
        />
    </form>
);

const form = reduxForm({
    form: CREATE_POLICY_FORM,
})(CreatePolicyForm);

export default form;