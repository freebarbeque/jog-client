import * as React from 'react';
import {reduxForm} from 'redux-form';
import {CREATE_POLICY_FORM} from 'src/common/constants/policies';
import styled from 'styled-components';

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
    </form>
);

const form = reduxForm({
    form: CREATE_POLICY_FORM,
})(CreatePolicyForm);

export default form;