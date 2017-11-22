import * as React from 'react';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {CREATE_POLICY_FORM} from 'src/common/constants/policies';
import styled from 'styled-components';
import FormSelect from 'src/web/components/Forms/Select';
import {insurers} from 'src/common/mocks/policy';
import Input from 'src/web/components/Forms/Input';
import {getMonthDays, getMonths, getYears} from '~/common/utils/dataSources';
import {IReduxState} from '~/common/interfaces/store';
import {connect} from 'react-redux';
import RadioButton from 'src/web/components/Forms/RadioButton';
import RadioButtons from 'src/web/components/Forms/RadioButton/Buttons';
import RoundedButton from 'src/web/components/RoundedButton';
import {onlyNumber} from '~/common/utils/form';
import {ICreatePolicyFormValues} from '~/common/interfaces/policies';
const validate = require('validate.js');

interface ICreatePolicyFormProps {
    year?: string;
    month?: string;
    handleSubmit: any;
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
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    font-size: 24px;
    margin: 25px 0 10px;
`;

const DateContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const CreatePolicyForm = (props: ICreatePolicyFormProps) => {
    return (
        <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={props.handleSubmit}>
            <Header>Six quick questions to add your policy</Header>
            <Content>
                <Title>Who is your insurer?</Title>
                <Field
                    name="insurer"
                    component={FormSelect}
                    dataSource={insurers}
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
                <DateContainer>
                    <Field
                        name="day"
                        component={FormSelect}
                        style={{width: 180}}
                        menuStyle={{width: 180}}
                        dataSource={getMonthDays(props.month, props.year)}
                        defaultText="Day"
                    />
                    <Field
                        name="month"
                        component={FormSelect}
                        style={{width: 180}}
                        menuStyle={{width: 180}}
                        dataSource={getMonths(props.year)}
                        defaultText="Month"
                    />
                    <Field
                        name="year"
                        component={FormSelect}
                        style={{width: 180}}
                        menuStyle={{width: 180}}
                        dataSource={getYears()}
                        defaultText="Year"
                    />
                </DateContainer>
                <Title>How much does your policy cost per year?</Title>
                <Field
                    name="cost"
                    component={Input}
                    style={{
                        width: 560,
                        border: '2px solid #dbdcde',
                        borderRadius: 5,
                    }}
                    preCheck={onlyNumber}
                />
                <Title>Is your vehicle:</Title>
                <Field
                    name="vehicle"
                    component={RadioButton}
                    dataSource={[
                        {id: 0, name: 'Owned'},
                        {id: 1, name: 'Leased'},
                        {id: 2, name: 'Financed'},
                    ]}
                    defaultSelected={0}
                />
                <Title>Is this a multi car policy</Title>
                <Field
                    name="multi"
                    component={RadioButtons}
                    dataSource={[
                        {id: 1, name: 'Yes'},
                        {id: 0, name: 'No'},
                    ]}
                    defaultSelected={0}
                />
                <RoundedButton
                    type="submit"
                    label="Set up my account"
                    disabled={false}
                    style={{
                        width: 200,
                        alignSelf: 'center',
                        height: 56,
                        borderRadius: 28,
                        fontSize: 20,
                        marginTop: 25,
                    }}
                />
            </Content>
        </form>
    );
}

const validationSchema = {
    insurer: {
        presence: {
            message: 'Please choose your insurer',
        },
    },
    number: {
        presence: {
            message: 'Please enter your policy number',
        },
    },
    day: {
        presence: {
            message: 'Please choose the expiry date',
        },
    },
    month: {
        presence: {
            message: 'Please choose the expiry month',
        },
    },
    year: {
        presence: {
            message: 'Please choose the expiry year',
        },
    },
    cost: {
        presence: {
            message: 'Please enter your policy cost',
        },
    },
}

const validateForm = (values: ICreatePolicyFormValues) => {
    const errors = validate(values, validationSchema, {fullMessages: false});

    return errors;
}

const getValue = formValueSelector(CREATE_POLICY_FORM);

const mapStateToProps = (state: IReduxState) => ({
    year: getValue(state, 'year'),
    month: getValue(state, 'month'),
})

const form = reduxForm({
    form: CREATE_POLICY_FORM,
    initialValues: {
        vehicle: 0,
        multi: 0,
    },
    validate: validateForm,
})(connect(mapStateToProps, null)(CreatePolicyForm));

export default form;