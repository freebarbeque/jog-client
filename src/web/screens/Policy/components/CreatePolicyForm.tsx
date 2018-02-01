import * as React from 'react';
import * as moment from 'moment';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {CREATE_POLICY_FORM} from 'src/common/constants/policies';
import {LANDING_INPUT_BG_COLOR, SECTION_HEADER_BORDER_COLOR, BLUE} from '~/common/constants/palette';
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

import FormSelect from 'src/web/common/components/controls/FormSelect';
import FormDatePicker from 'src/web/common/components/controls/FormDatePicker';
import FormTextField from 'src/web/common/components/controls/FormTextField';
import FormRadioGroup from 'src/web/common/components/controls/FormRadioGroup';
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

const Content = styled.div`
    padding: 0;
    align-self: center;
    text-align: center;
    display: flex;
    flex-direction: column;
`;

const Container = styled.div`
    box-sizing: border-box;
    max-width: 980px;
    width: 100%;
    margin: 0 auto;
`;

const Wrapper = styled.div`
    display: block;
    max-width: 680px;
    width: 100%;
    margin: 0 auto;
`;

const ButtonStyles = {
    width: 300,
    alignSelf: 'center',
    height: 56,
    borderRadius: 28,
    fontSize: 21,
    marginTop: 25,
};

const CreatePolicyForm = (props: ICreatePolicyFormProps) => {
    return (
        <Container>
            <Wrapper>
                  <PolicySection title="Simply answer these questions to set up your basic policy">
                      <form  onSubmit={props.handleSubmit}>
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
                                  maxDate={moment().add(2, 'years')}
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
                                  style={ButtonStyles}
                              />
                          </Content>
                      </form>
                  </PolicySection>
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
    onSubmitFail: handleScrollToErrorField(),
    validate: validateForm,
})(connect(mapStateToProps, null)(CreatePolicyForm));

export default form;
