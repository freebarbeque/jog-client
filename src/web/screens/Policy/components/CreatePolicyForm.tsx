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

interface ICreatePolicyFormValues {
    insurer: string;
    number: string;
    day: string;
    month: string;
    year: string;
    cost: string;
    vehicle: 'owned' | 'leased' | 'financed';
    multi: boolean;
}

interface ICreatePolicyFormProps {
    year?: string;
    month?: string;
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
        <form style={{display: 'flex', flexDirection: 'column'}}>
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
                />
                <Title>Is this a multi car policy</Title>
                <Field
                    name="vehicle"
                    component={RadioButtons}
                    dataSource={[
                        {id: 0, name: 'Yes'},
                        {id: 1, name: 'No'},
                    ]}
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

const getValue = formValueSelector(CREATE_POLICY_FORM);

const mapStateToProps = (state: IReduxState) => ({
    year: getValue(state, 'year'),
    month: getValue(state, 'month'),
})

const form = reduxForm({
    form: CREATE_POLICY_FORM,
})(connect(mapStateToProps, null)(CreatePolicyForm));

export default form;