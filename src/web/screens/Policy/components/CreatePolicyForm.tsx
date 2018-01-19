import * as React from 'react';
import * as moment from 'moment';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {CREATE_POLICY_FORM} from 'src/common/constants/policies';
import styled from 'styled-components';
import Input from 'src/web/components/Forms/Input';
import {getMonthDays, getMonths, getYears} from '~/common/utils/dataSources';
import {IReduxState} from '~/common/interfaces/store';
import {connect} from 'react-redux';
import RadioButton from 'src/web/components/Forms/RadioButton';
import RoundedButton from 'src/web/components/RoundedButton';
// import {onlyNumber, onlyDecimal} from '~/common/utils/form';
import {ICreatePolicyFormValues} from '~/common/interfaces/policies';
import {getDataSource} from '~/common/selectors/dataSource';
import {IDataSource} from '~/common/interfaces/dataSource';
const validate = require('validate.js');
import ErrorText from 'src/web/components/Forms/ErrorText';
import PolicySection from '../../Dashboard/components/PolicySection';
import OffersPlaceholder from '../../Dashboard/components/OffersPlaceholder';
import {getIsLoading} from 'src/common/selectors/policies';

import FormSelect from 'src/web/common/controls/FormSelect';
import FormDatePicker from 'src/web/common/controls/FormDatePicker';
import FormTextField from 'src/web/common/controls/FormTextField';
import FormRadioGroup from 'src/web/common/controls/FormRadioGroup';
import { onlyNumber, onlyDecimal } from 'src/web/common/utils/form/valueNormalize';
import { handleScrollToErrorField } from 'src/web/common/utils/form/scrollingToErrorField';

interface ICreatePolicyFormProps {
    year?: string;
    month?: string;
    day?: string;
    handleSubmit: any;
    insurersDataSource: any;
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
    padding: 50px 80px;
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
`;

const Container = styled.div`
    display: flex;
    align-self: stretch;
    max-width: 60%;
    margin: 0px auto;
    flex: 1 0 auto;
    box-sizing: border-box;
`;

const Wrapper = styled.div`
  display: flex;
  align-self: stretch;
  justify-content: center;
  flex: 1 0;
`;

const LeftSectionsContainer = styled.div`
  display: flex;
  flex: 0 1 calc(70% - 20px);
  flex-direction: column;
  align-self: stretch;
  margin-right: 20px;
  & > ${PolicySection}:first-child {
    margin-bottom: 35px;
  }
`;

const RightSectionsContainer = styled.div`
  display: flex;
  flex-basis: 30%;
  min-width: 300px;
  flex-direction: column;
  align-self: baseline;
`;

const CreatePolicyForm = (props: ICreatePolicyFormProps) => {
    console.log('Log => CreatePolicyForm re-render: ', props);

    return (
        <Container>
            <Wrapper>
                <LeftSectionsContainer>
                    <PolicySection title="Simply answer these questions to set up your basic policy">
                        <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={props.handleSubmit}>
                            <Content>
                                <Field
                                    errorAboveField
                                    label="Who is your insurer?"
                                    name="insurance_company_id"
                                    component={FormSelect}
                                    design={FormSelect.Modern}
                                    options={props.insurersDataSource}
                                    style={{ marginBottom: 40 }}
                                />
                                <Field
                                    errorAboveField
                                    label="What is your policy number?"
                                    placeholder="12345"
                                    name="policy_number"
                                    component={FormTextField}
                                    style={{ marginBottom: 40 }}
                                />
                                <Field
                                    errorAboveField
                                    name="expiry"
                                    label="When does your policy expire?"
                                    component={FormDatePicker}
                                    style={{ marginBottom: 40 }}
                                    minDate={moment()}
                                />
                                <Field
                                    errorAboveField
                                    label="How much does your policy cost per year?"
                                    name="annual_cost_cents"
                                    component={FormTextField}
                                    leftIcon="\u00A3"
                                    normalize={onlyDecimal}
                                    style={{ marginBottom: 40 }}
                                />
                                <Field
                                    errorAboveField
                                    label="Enter the registration of your car"
                                    name="vehicle_registration"
                                    component={FormTextField}
                                    style={{ marginBottom: 40 }}
                                />
                                <Field
                                    errorAboveField
                                    label="Level of cover"
                                    name="level_of_cover"
                                    component={FormRadioGroup}
                                    options={[
                                        {id: 'Comprehensive', name: 'Comprehensive'},
                                        {id: 'Third party', name: '3rd Party'},
                                        {id: 'Third party, fire and theft', name: '3rd Party, Fire & Theft'},
                                    ]}
                                    style={{ marginBottom: 40 }}
                                />
                                <Field
                                    errorAboveField
                                    label="Years of no claims bonus"
                                    name="no_claims_bonus"
                                    component={FormTextField}
                                    normalize={onlyNumber}
                                />
                                {props.error ?
                                    <ErrorText>
                                        {props.error}
                                    </ErrorText>
                                    : null
                                }
                                <RoundedButton
                                    type="submit"
                                    label="Set Up My Account"
                                    disabled={props.isLoading}
                                    style={{
                                        width: 250,
                                        alignSelf: 'center',
                                        height: 56,
                                        borderRadius: 28,
                                        fontSize: 20,
                                        marginTop: 25,
                                    }}
                                />
                            </Content>
                        </form>
                    </PolicySection>
                </LeftSectionsContainer>
                <RightSectionsContainer>
                    <PolicySection title="Offers">
                        <OffersPlaceholder />
                    </PolicySection>
                </RightSectionsContainer>
            </Wrapper>
        </Container>
    );
};

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
    expiry: {
        presence: {
            message: 'Please choose the expiry date',
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
    insurersDataSource: getDataSource(state, 'insuranceCompanies'),
    isLoading: getIsLoading(state),
})

const form = reduxForm({
    form: CREATE_POLICY_FORM,
    initialValues: {
        level_of_cover: 'Comprehensive',
        no_claims_bonus : 0,
    },
    onSubmitFail: errors => {
        console.log('Log => onSubmitFail errors: ', errors);
        handleScrollToErrorField()(errors);
    },
    validate: validateForm,
})(connect(mapStateToProps, null)(CreatePolicyForm));

export default form;