import * as React from 'react';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {CREATE_POLICY_FORM} from 'src/common/constants/policies';
import styled from 'styled-components';
import FormSelect from 'src/web/components/Forms/FormSelect';
import Input from 'src/web/components/Forms/Input';
import {getMonthDays, getMonths, getYears} from '~/common/utils/dataSources';
import {IReduxState} from '~/common/interfaces/store';
import {connect} from 'react-redux';
import RadioButton from 'src/web/components/Forms/RadioButton';
import RoundedButton from 'src/web/components/RoundedButton';
import {onlyNumber} from '~/common/utils/form';
import {ICreatePolicyFormValues} from '~/common/interfaces/policies';
import {getDataSource} from '~/common/selectors/dataSource';
import {IDataSource} from '~/common/interfaces/dataSource';
const validate = require('validate.js');
import ErrorText from 'src/web/components/Forms/ErrorText';
import {getIsLoading} from 'src/common/selectors/policies';

interface ICreatePolicyFormProps {
    year?: string;
    month?: string;
    day?: string;
    handleSubmit: any;
    insurersDataSource: IDataSource;
    error: string;
    isLoading: boolean;
}

const Header = styled.div`
    height: 42px;
    background-color: #ECEDEF;
    display: flex;
    align-items: center;
    padding: 0 10px;
`;

const Content = styled.div`
    width: 70%;
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
    > div {
        width: 100%;
    }
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
                        width: 'calc(100% - 40px)',
                        border: '2px solid #dbdcde',
                        borderRadius: 5,
                    }}
                />
                <Title>When does your policy expire?</Title>
                <DateContainer>
                    <Field
                        name="day"
                        component={FormSelect}
                        dataSource={getMonthDays(props.month, props.year)}
                        defaultText="Day"
                    />
                    <Field
                        name="month"
                        component={FormSelect}
                        style={{margin: '0 10px'}}
                        dataSource={getMonths(props.day, props.year)}
                        defaultText="Month"
                    />
                    <Field
                        name="year"
                        component={FormSelect}
                        dataSource={getYears(props.month)}
                        defaultText="Year"
                    />
                </DateContainer>
                <Title>How much does your policy cost per year?</Title>
                <Field
                    name="annual_cost_cents"
                    component={Input}
                    sign="\u00A3"
                    style={{
                        width: 'calc(100% - 80px)',
                        border: '2px solid #dbdcde',
                        borderRadius: 5,
                    }}
                    preCheck={onlyNumber}
                />
                <Title>What is your car number?</Title>
                <Field
                    name="vehicle_registration"
                    component={Input}
                    style={{
                        width: 'calc(100% - 40px)',
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
                        {id: 'Third party', name: '3rd Party'},
                        {id: 'Third party, fire and theft', name: '3rd Party, Fire & Theft'},
                    ]}
                    defaultSelected={0}
                />
                <Title>Years of no claims bonus</Title>
                <Field
                    name="no_claims_bonus"
                    component={Input}
                    style={{
                        width: 'calc(100% - 40px)',
                        border: '2px solid #dbdcde',
                        borderRadius: 5,
                    }}
                    preCheck={onlyNumber}
                />
                {props.error ?
                    <ErrorText>
                        {props.error}
                    </ErrorText>
                    : null
                }
                <RoundedButton
                    type="submit"
                    label="Set up my account"
                    disabled={props.isLoading}
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
    vehicle_registration: {
        presence: {
            message: 'Please enter your car number',
        },
    }
}

const validateForm = (values: ICreatePolicyFormValues) => {
    const errors = validate(values, validationSchema, {fullMessages: false});

    return errors;
}

const getValue = formValueSelector(CREATE_POLICY_FORM);

const mapStateToProps = (state: IReduxState) => ({
    year: getValue(state, 'year'),
    month: getValue(state, 'month'),
    day: getValue(state, 'day'),
    insurersDataSource: getDataSource(state, 'insuranceCompanies'),
    isLoading: getIsLoading(state),
})

const form = reduxForm({
    form: CREATE_POLICY_FORM,
    initialValues: {
        level_of_cover: 'Comprehensive',
        no_claims_bonus : 0,
    },
    validate: validateForm,
})(connect(mapStateToProps, null)(CreatePolicyForm));

export default form;