import * as React from 'react';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {CREATE_POLICY_FORM} from 'src/common/constants/policies';
import styled from 'styled-components';
import FormSelect from 'src/web/components/Forms/FormSelect';
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
import {getDataSource} from '~/common/selectors/dataSource';
import {IDataSource} from '~/common/interfaces/dataSource';
const validate = require('validate.js');

interface ICreatePolicyFormProps {
    year?: string;
    month?: string;
    handleSubmit: any;
    insurersDataSource: IDataSource;
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
                    name="insurance_company_id"
                    component={FormSelect}
                    dataSource={props.insurersDataSource}
                />
                <Title>What is your policy number?</Title>
                <Field
                    name="policy_number"
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
                    name="annual_cost_cents"
                    component={Input}
                    sign="\u00A3"
                    style={{
                        width: 520,
                        border: '2px solid #dbdcde',
                        borderRadius: 5,
                    }}
                    preCheck={onlyNumber}
                />
                <Title>What is your car number?</Title>
                <Field
                    name="vehicle-registration"
                    component={Input}
                    style={{
                        width: 560,
                        border: '2px solid #dbdcde',
                        borderRadius: 5,
                    }}
                />
                <Title>Level of cover</Title>
                <Field
                    name="level_of_cover"
                    component={RadioButton}
                    dataSource={[
                        {id: 'Comprehensive', name: 'Comprehensive'},
                        {id: '3rd Party', name: '3rd Party'},
                        {id: '3rd Party, Fire & Theft', name: '3rd Party, Fire & Theft'},
                    ]}
                    defaultSelected={0}
                />
                <Title>Years of no claims bonus</Title>
                <Field
                    name="no_claims_bonus"
                    component={Input}
                    style={{
                        width: 560,
                        border: '2px solid #dbdcde',
                        borderRadius: 5,
                    }}
                    preCheck={onlyNumber}
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
    insurance_company_id: {
        presence: {
            message: 'Please choose your insurer',
        },
    },
    policy_number: {
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
    annual_cost_cents: {
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
    insurersDataSource: getDataSource(state, 'insuranceCompanies'),
})

const form = reduxForm({
    form: CREATE_POLICY_FORM,
    initialValues: {
        level_of_cover: '3rd Party, Fire & Theft',
    },
    validate: validateForm,
})(connect(mapStateToProps, null)(CreatePolicyForm));

export default form;