import * as React from 'react';
import styled from 'styled-components';
const validate = require('validate.js');
import {reduxForm, Field, FieldArray, getFormValues} from 'redux-form';
import StyledInput from '../StyledInput';
import {BLUE} from 'src/common/constants/palette';
import {onlyNumber} from 'src/common/utils/form';
import RadioButton from 'src/web/components/Forms/RadioButton/Buttons';
import DatePicker from 'src/web/components/PolicyDatePicker';
import FormSelect from 'src/web/components/Forms/FormSelect';
import {mapObjectToDataSource} from 'src/common/utils/dataSources';
import {MotoringOrganisationTypes} from 'src/common/interfaces/drivers';
import Divider from 'src/web/screens/Landing/components/Divider';
import RoundedButton from 'src/web/components/RoundedButton';
import {connect} from 'react-redux';
import {IReduxState} from '~/common/interfaces/store';
import {getIsLoading} from '~/common/selectors/userDetils';
import Incident from './components/Incident';
import Conviction from './components/Conviction';
const moment = require('moment');

import {
    formSelectStyle,
    formSelectLabelStyle,
    formSelectIconStyle,
} from 'src/common/constants/userDetails';

interface IDriverDetailsForm {
    className?: string;
    handleSubmit?: any;
    motorId: number;
    isLoading: boolean;
    formValues: any;
    active: boolean;
    form: string;
    initialValues: any;
    buttonText: string;
    cancelVisible: boolean;
    closeClick: any;
}

const monitoringOrganisations = mapObjectToDataSource(MotoringOrganisationTypes);

const ButtonStyles = {
    width: '250px',
    height: '60px',
    borderRadius: '100px',
    fontSize: '18px',
    marginTop: '5px',
};

const renderDatePicker = (props: any) => (
    <DatePicker
        {...props}
        onChange={props.input.onChange}
        value={props.input.value}
        error={props.meta.error}
        touched={props.meta.touched}
        maxDate={moment()}
        minDate={moment().subtract(100, 'years')}
    />
);

class DriverDetailsForm extends React.Component<IDriverDetailsForm, {}> {
    render() {
        return (
            <form className={this.props.className} onSubmit={this.props.handleSubmit}>
                <FormSection>
                    <FieldContainer>
                        <FieldTitle>
                            What is your title?
                        </FieldTitle>
                        <Field
                            name="title"
                            component={RadioButton}
                            dataSource={[
                                {id: 'mr', name: 'Mr'},
                                {id: 'mrs', name: 'Mrs'},
                                {id: 'miss', name: 'Miss'},
                                {id: 'ms', name: 'Ms'},
                                {id: 'dr', name: 'Dr'},
                            ]}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>
                            What's your first name?
                        </FieldTitle>
                        <Field
                            name="first_name"
                            component={StyledInput}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>
                            What's your last name?
                        </FieldTitle>
                        <Field
                            name="last_name"
                            component={StyledInput}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>
                            What's your Date of birth?
                        </FieldTitle>
                        <Field
                            name="date_of_birth"
                            component={renderDatePicker}
                            placeholder="Select your date of birth"
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>
                            What's your gender?
                        </FieldTitle>
                        <Field
                            name="gender"
                            component={RadioButton}
                            dataSource={[
                                {id: 'male', name: 'Male'},
                                {id: 'female', name: 'Female'},
                            ]}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>
                            Were you born in UK?
                        </FieldTitle>
                        <Field
                            name="born_in_uk"
                            component={RadioButton}
                            dataSource={[
                                {id: true, name: 'Yes'},
                                {id: false, name: 'No'},
                            ]}
                        />
                    </FieldContainer>
                    {this.props.formValues && !this.props.formValues.born_in_uk ?
                        <FieldContainer>
                            <FieldTitle>
                                When did you start living in the UK?
                            </FieldTitle>
                            <Field
                                name="uk_resident_since"
                                component={renderDatePicker}
                                placeholder="Select date of becoming a resident"
                            />
                        </FieldContainer> : null
                    }
                    <FieldContainer>
                        <FieldTitle>
                            Have you ever had insurance refused?
                        </FieldTitle>
                        <Field
                            name="insurance_refused"
                            component={RadioButton}
                            dataSource={[
                                {id: true, name: 'Yes'},
                                {id: false, name: 'No'},
                            ]}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>
                            For how many years have you held your licence?
                        </FieldTitle>
                        <Field
                            name="licence_years_held"
                            component={StyledInput}
                            preCheck={onlyNumber}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>
                            What kind of license do you hold?
                        </FieldTitle>
                        <Field
                            name="licence_state"
                            component={RadioButton}
                            dataSource={[
                                {id: 'full', name: 'Full'},
                                {id: 'provisional', name: 'Provisional'},
                                {id: 'international', name: 'International'},
                                {id: 'automatic', name: 'Automatic'},
                                {id: 'other', name: 'Other'},
                            ]}
                        />
                    </FieldContainer>
                    {this.props.formValues && this.props.formValues.license_state === 'provisional' ?
                        <FieldContainer>
                            <FieldTitle>
                                How many tests have you taken?
                            </FieldTitle>
                            <Field
                                name="tests_taken"
                                component={StyledInput}
                                preCheck={onlyNumber}
                            />
                        </FieldContainer> : null
                    }
                    <FieldContainer>
                        <FieldTitle>
                            What is your driving license number?
                        </FieldTitle>
                        <Field
                            name="licence_number"
                            component={StyledInput}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>
                            Are you smoker?
                        </FieldTitle>
                        <Field
                            name="smoker"
                            component={RadioButton}
                            dataSource={[
                                {id: true, name: 'Yes'},
                                {id: false, name: 'No'},
                            ]}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>
                            What is your relationship status?
                        </FieldTitle>
                        <Field
                            name="relationship_status"
                            component={RadioButton}
                            dataSource={[
                                {id: 'single', name: 'Single'},
                                {id: 'married', name: 'Married'},
                                {id: 'civil-partnership', name: 'Civil-partnership'},
                                {id: 'divorced', name: 'Divorced'},
                                {id: 'windowed', name: 'Windowed'},
                            ]}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>
                            What job do you do?
                        </FieldTitle>
                        <Field
                            name="vocation"
                            component={StyledInput}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>
                            What industry do you work in?
                        </FieldTitle>
                        <Field
                            name="industry"
                            component={StyledInput}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>
                            How many years no claims discount do you have?
                        </FieldTitle>
                        <Field
                            name="no_claims_discount"
                            component={StyledInput}
                            preCheck={onlyNumber}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>
                            Do you belong to a motoring organisation?
                        </FieldTitle>
                        <Field
                            name="monitoring_organisation"
                            component={FormSelect}
                            dataSource={monitoringOrganisations}
                            defaultText="Monitoring organisations"
                            maxHeight={300}
                            labelStyle={formSelectLabelStyle}
                            iconStyle={formSelectIconStyle}
                            style={formSelectStyle}
                        />
                    </FieldContainer>
                    <FieldContainer>
                        <FieldTitle>
                            Do you have any motoring convictions?
                        </FieldTitle>
                        <Field
                            name="motoring_convictions"
                            component={RadioButton}
                            dataSource={[
                                {id: true, name: 'Yes'},
                                {id: false, name: 'No'},
                            ]}
                        />
                    </FieldContainer>
                    <FieldArray name="conviction" component={Conviction} active={this.props.formValues && this.props.formValues.motoring_convictions} form={this.props.form}/>
                    <FieldContainer>
                        <FieldTitle>
                            Have you had any motoring incidents/claims in the last 5 years?
                        </FieldTitle>
                        <Field
                            name="incidents_claims"
                            component={RadioButton}
                            dataSource={[
                                {id: true, name: 'Yes'},
                                {id: false, name: 'No'},
                            ]}
                        />
                    </FieldContainer>
                    <FieldArray name="incident" component={Incident} active={this.props.formValues && this.props.formValues.incidents_claims} form={this.props.form}/>
                    <ButtonWrapper>
                        {this.props.cancelVisible ?
                            <div style={{marginRight: '15px'}}>
                                <RoundedButton
                                    label="Cancel"
                                    style={ButtonStyles}
                                    type="button"
                                    disabled={this.props.isLoading}
                                    onClick={this.props.closeClick}
                                />
                            </div> : null
                        }
                        <RoundedButton
                            label={this.props.buttonText}
                            style={ButtonStyles}
                            type="submit"
                            disabled={this.props.isLoading}
                        />
                    </ButtonWrapper>
                </FormSection>
            </form>
        )
    }
}

const ButtonWrapper = styled.div`
    display: flex;
    align-self: stretch;
    align-items: center;
    justify-content: center;
`;

const StyledDriverDetailsForm = styled(DriverDetailsForm)`
  display: ${props => props.active ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  flex: 1;
  align-self: stretch;
  background-color: #FFF;
  padding: 40px 0 35px;
  box-shadow: 0 2px 4px rgba(51, 51, 51, 0.2);
  width: 70%;
  margin: 0px auto;
  margin-bottom: 25px;
  
  & ${Divider} {
    margin-bottom: 30px;
  }
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  margin-bottom: 30px;
  & > ${DatePicker} {
    align-self: center;
  }
  
  & > div:last-child {
    margin-bottom: 0;
  }
`;

const FieldTitle = styled.div`
  font-size: 20px;
  line-height: 22px;
  color: ${BLUE};
  margin-bottom: 10px;
  align-self: center;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  padding: 0 50px;
  flex: 1;
`;

const validationSchema = {
    title: {
        presence: {
            message: 'Please select your title',
            allowEmpty: false,
        },
    },
    first_name: {
        presence: {
            message: 'Please enter your first name',
            allowEmpty: false,
        },
    },
    last_name: {
        presence: {
            message: 'Please enter your last name',
            allowEmpty: false,
        },
    },
    gender: {
        presence: {
            message: 'Please select your gender',
            allowEmpty: false,
        },
    },
    date_of_birth: {
        presence: {
            message: 'Please select your date of birth',
            allowEmpty: false,
        },
    },
};

const validateForm = (values: any) => {
    const errors = validate(values, validationSchema, {fullMessages: false});
    return errors;
};

const initialValues = {
    title: 'mr',
    gender: 'male',
    insurance_refused: false,
    licence_state: 'full',
    smoker: false,
    relationship_status: 'single',
    born_in_uk: true,
    conviction: [{}],
    incident: [{fault: false, personal_injury: false, current_policy: false}],
    incidents_claims: false,
    motoring_convictions: false,
};

const mapStateToProps = (state: IReduxState, props: IDriverDetailsForm) => ({
    isLoading: getIsLoading(state),
    formValues: getFormValues(props.form)(state),
    initialValues: props.initialValues,
});

export default reduxForm({
    initialValues,
    validate: validateForm,
})(connect(mapStateToProps, null)(StyledDriverDetailsForm));