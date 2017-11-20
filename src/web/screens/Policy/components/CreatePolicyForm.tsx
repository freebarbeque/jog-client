import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
import {CREATE_POLICY_FORM} from 'src/common/constants/policies';
import styled from 'styled-components';
import Select from 'src/web/components/Forms/Select';

interface ICreatePolicyFormProps {

}

const Header = styled.div`
    height: 42px;
    background-color: #ECEDEF;
    display: flex;
    align-items: center;
    padding: 0 10px;
`;

const Content = styled.div`
    width: 80%;
    padding: 10px;
`;

const CreatePolicyForm = (props: ICreatePolicyFormProps) => (
    <form style={{display: 'flex', flexDirection: 'column'}}>
        <Header>Six quick questions to add your policy</Header>
        <Content>
            <Field
                name="insurer"
                component={Select}
            />
        </Content>
    </form>
);

const form = reduxForm({
    form: CREATE_POLICY_FORM,
})(CreatePolicyForm);

export default form;