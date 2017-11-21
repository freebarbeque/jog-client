import * as React from 'react';
import {reduxForm, Field} from 'redux-form';
import {CREATE_POLICY_FORM} from 'src/common/constants/policies';
import styled from 'styled-components';
import FormSelect from 'src/web/components/Forms/Select';
import {insurers} from 'src/common/mocks/policy';
import Input from 'src/web/components/Forms/Input';

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
    width: 600px;
    padding: 10px;
    align-self: center;
    text-align: center;
`;

const Title = styled.div`
    font-size: 24px;
    margin: 25px 0 10px;
`;

const DateContainer = styled.div`
    
`

const CreatePolicyForm = (props: ICreatePolicyFormProps) => (
    <form style={{display: 'flex', flexDirection: 'column'}}>
        <Header>Six quick questions to add your policy</Header>
        <Content>
            <Title>Who is your insurer?</Title>
            <Field
                name="insurer"
                component={FormSelect}
                options={insurers}
            />
            <Title>What is your policy number?</Title>
            <Field
                name="number"
                component={Input}
                style={{
                    width: 560,
                    border: '2px solid #dbdcde',
                    borderRadius: 5,
                }}
            />
            <Title>When does your policy expire?</Title>

        </Content>
    </form>
);

const form = reduxForm({
    form: CREATE_POLICY_FORM,
})(CreatePolicyForm);

export default form;