import * as React from 'react';
import styled from 'styled-components';
const validate = require('validate.js');
import {reduxForm, Field} from 'redux-form';
import StyledInput from '../StyledInput';
import {BLUE} from 'src/common/constants/palette';
import {onlyNumber} from 'src/common/utils/form';
import RadioButton from 'src/web/components/Forms/RadioButton/Buttons';
import DatePicker from 'src/web/components/PolicyDatePicker';
import FormSelect from 'src/web/components/Forms/FormSelect';
import {formSelectStyle, formSelectLabelStyle, formSelectIconStyle, signStyle} from 'src/common/constants/userDetails';
import {mapObjectToDataSource} from 'src/common/utils/dataSources';
import {MotoringOrganisationTypes, MotoringIncidentTypes, MotoringConvictionType} from 'src/common/interfaces/drivers';
import Divider from 'src/web/screens/Landing/components/Divider';
import RoundedButton from 'src/web/components/RoundedButton';

interface IDriverDetailsForm {
  className?: string;
  handleSubmit?: any;
}

const motoringOrganisations = mapObjectToDataSource(MotoringOrganisationTypes);
const motoringIncidents = mapObjectToDataSource(MotoringIncidentTypes);
const motoringConvictions = mapObjectToDataSource(MotoringConvictionType);

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
  />
);

const DriverDetailsForm: React.StatelessComponent<IDriverDetailsForm> = (props) => (
  <form className={props.className} onSubmit={props.handleSubmit}>
    <FormSection>
      <FieldContainer>
        <FieldTitle>
          Who is the policy holder ?
        </FieldTitle>
        <Field
          name="driver_selected"
          component={FormSelect}
          dataSource={[{id: null, name: 'New driver'}, {id: 1, name: 'Driver 1'}, {id: 2, name: 'Driver 2'}]}
          defaultText="New Driver"
          maxHeight={300}
          labelStyle={formSelectLabelStyle}
          iconStyle={formSelectIconStyle}
          style={formSelectStyle}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          What is your title ?
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
          First name
        </FieldTitle>
        <Field
          name="first_name"
          component={StyledInput}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          Last name
        </FieldTitle>
        <Field
          name="last_name"
          component={StyledInput}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          What is your Date of birth ?
        </FieldTitle>
        <Field
          name="date_of_birth"
          component={renderDatePicker}
          placeholder="Select your date of birth"
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          What is your gender ?
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
          Were you born in UK ?
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
      <FieldContainer>
        <FieldTitle>
          When you became a resident of the UK ?
        </FieldTitle>
        <Field
          name="uk_resident_since"
          component={renderDatePicker}
          placeholder="Select date of becoming a resident"
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          Is insurance refused ?
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
          License years held
        </FieldTitle>
        <Field
          name="license_years_held"
          component={StyledInput}
          preCheck={onlyNumber}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          What is your license type ?
        </FieldTitle>
        <Field
          name="license_state"
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
      <FieldContainer>
        <FieldTitle>
          What is your license number ?
        </FieldTitle>
        <Field
          name="license_number"
          component={StyledInput}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          Are you smoker ?
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
          What is your relationship status ?
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
          What is your vocation ?
        </FieldTitle>
        <Field
          name="vocation"
          component={StyledInput}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          What is your industry ?
        </FieldTitle>
        <Field
          name="industry"
          component={StyledInput}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          Years of no claims bonus
        </FieldTitle>
        <Field
          name="no_claims_discount"
          component={StyledInput}
          preCheck={onlyNumber}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          What is your motoring organisation ?
        </FieldTitle>
        <Field
          name="motoring_organisation"
          component={FormSelect}
          dataSource={motoringOrganisations}
          defaultText="Motoring organisations"
          maxHeight={300}
          labelStyle={formSelectLabelStyle}
          iconStyle={formSelectIconStyle}
          style={formSelectStyle}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          Tests taken
        </FieldTitle>
        <Field
          name="tests_taken"
          component={StyledInput}
          preCheck={onlyNumber}
        />
      </FieldContainer>
    </FormSection>
    <Divider />
    <FormSection>
      <FieldContainer>
        <FieldTitle>
          What is your motoring incident code ?
        </FieldTitle>
        <Field
          name="incident_code"
          component={FormSelect}
          dataSource={motoringIncidents}
          defaultText="Incident Code"
          maxHeight={300}
          labelStyle={formSelectLabelStyle}
          iconStyle={formSelectIconStyle}
          style={formSelectStyle}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          Incident cost
        </FieldTitle>
        <Field
          name="cost_cents"
          component={StyledInput}
          style={{padding: '0 10px 0 45px'}}
          sign="\u00A3"
          signStyle={signStyle}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          When did the incident occur?
        </FieldTitle>
        <Field
          name="incident_date"
          component={renderDatePicker}
          placeholder="Select incident date"
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          Is it your fault ?
        </FieldTitle>
        <Field
          name="fault"
          component={RadioButton}
          dataSource={[
            {id: true, name: 'Yes'},
            {id: false, name: 'No'},
          ]}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          Did you get personal injuries ?
        </FieldTitle>
        <Field
          name="personal_injury"
          component={RadioButton}
          dataSource={[
            {id: true, name: 'Yes'},
            {id: false, name: 'No'},
          ]}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          Third party cost
        </FieldTitle>
        <Field
          name="third_party_cost_cents"
          component={StyledInput}
          style={{padding: '0 10px 0 45px'}}
          preCheck={onlyNumber}
          sign="\u00A3"
          signStyle={signStyle}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          Do you have a current policy ?
        </FieldTitle>
        <Field
          name="current_policy"
          component={RadioButton}
          dataSource={[
            {id: true, name: 'Yes'},
            {id: false, name: 'No'},
          ]}
        />
      </FieldContainer>
    </FormSection>
    <Divider />
    <FormSection>
      <FieldContainer>
        <FieldTitle>
          Months banned
        </FieldTitle>
        <Field
          name="months_banned"
          component={StyledInput}
          preCheck={onlyNumber}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          What is your motoring conviction code ?
        </FieldTitle>
        <Field
          name="conviction_code"
          component={FormSelect}
          dataSource={motoringConvictions}
          defaultText="Conviction Code"
          maxHeight={300}
          labelStyle={formSelectLabelStyle}
          iconStyle={formSelectIconStyle}
          style={formSelectStyle}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          When did the conviction occur?
        </FieldTitle>
        <Field
          name="conviction_date"
          component={renderDatePicker}
          placeholder="Select conviction date"
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          Fine cost
        </FieldTitle>
        <Field
          name="fine_cents"
          component={StyledInput}
          style={{padding: '0 10px 0 45px'}}
          preCheck={onlyNumber}
          sign="\u00A3"
          signStyle={signStyle}
        />
      </FieldContainer>
      <FieldContainer>
        <FieldTitle>
          Penalty points
        </FieldTitle>
        <Field
          name="penalty_points"
          component={StyledInput}
          style={{padding: '0 10px 0 45px'}}
          preCheck={onlyNumber}
          sign="\u00A3"
          signStyle={signStyle}
        />
      </FieldContainer>
    </FormSection>
    <RoundedButton
      label="Create driver"
      style={ButtonStyles}
      type="submit"
    />
  </form>
);

const StyledDriverDetailsForm = styled(DriverDetailsForm)`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  align-self: stretch;
  background-color: #FFF;
  padding: 40px 0 35px;
  box-shadow: 0 2px 4px rgba(51, 51, 51, 0.2);
  
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
  margin-bottom: 30px;
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
  driver_selected: null,
  title: 'mr',
  gender: 'male',
  insurance_refused: false,
  license_state: 'full',
  smoker: false,
  relationship_status: 'single',
  born_in_uk: true,
  incident_code: null,
  fault: false,
  personal_injury: false,
  current_policy: true,
  conviction_code: null,
};

export default reduxForm({form: 'driverDetailsForm', initialValues, validate: validateForm})(StyledDriverDetailsForm);