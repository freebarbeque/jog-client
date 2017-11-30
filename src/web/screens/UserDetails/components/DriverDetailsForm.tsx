import * as React from 'react';
import styled from 'styled-components';
import {reduxForm, Field} from 'redux-form';
import Input from 'src/web/components/Forms/Input';
import {BLUE} from 'src/common/constants/palette';
import {onlyNumber} from 'src/common/utils/form';
import RadioButton from 'src/web/components/Forms/RadioButton/Buttons';
import DatePicker from 'src/web/components/PolicyDatePicker';
import FormSelect from 'src/web/components/Forms/FormSelect';
import {inputStyles, formSelectStyle, formSelectLabelStyle, formSelectIconStyle} from 'src/common/constants/userDetails';

interface IDriverDetailsForm {
  className?: string;
  handleSubmit?: any;
}

const renderDatePicker = (props: any) => (
  <DatePicker
    {...props}
    onChange={props.input.onChange}
    value={props.input.value}
  />
);

const DriverDetailsForm: React.StatelessComponent<IDriverDetailsForm> = (props) => (
  <form className={props.className}>
    <FieldContainer>
      <FieldTitle>
        Who is the policy holder ?
      </FieldTitle>
      <Field
        name="driver_selected"
        component={FormSelect}
        dataSource={[{id: 1, name: 'Driver 1'}, {id: 2, name: 'Driver 2'}]}
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
        component={Input}
        style={inputStyles}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Last name
      </FieldTitle>
      <Field
        name="last_name"
        component={Input}
        style={inputStyles}
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
        component={Input}
        style={inputStyles}
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
        component={Input}
        style={inputStyles}
        preCheck={onlyNumber}
      />
    </FieldContainer>
  </form>
);

const StyledDriverDetailsForm = styled(DriverDetailsForm)`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-self: stretch;
  background-color: #FFF;
  padding: 40px 50px 35px;
  box-shadow: 0 2px 4px rgba(51, 51, 51, 0.2);
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  margin-bottom: 30px;
  & > ${DatePicker} {
    align-self: center;
  }
`;

const FieldTitle = styled.div`
  font-size: 20px;
  line-height: 22px;
  color: ${BLUE};
  margin-bottom: 10px;
  align-self: center;
`;

export default reduxForm({form: 'driverDetailsForm', initialValues: {driver_selected: null, title: 'mr', gender: 'male', insurance_refused: false, license_state: 'full'}})(StyledDriverDetailsForm);