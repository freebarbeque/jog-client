import * as React from 'react';
import styled from 'styled-components';
import {reduxForm, Field} from 'redux-form';
import {onlyNumber} from 'src/common/utils/form';
import RadioButton from 'src/web/components/Forms/RadioButton/Buttons';
import DatePicker from 'src/web/components/PolicyDatePicker';
import {inputStyles, inputStylesWithSign, signStyle} from 'src/common/constants/userDetails';
import FieldTitle from './FieldTitle';
import styledForm from './styledForm';
import StyledInput from './StyledInput';

interface ICardDetailsForm {
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

const CarDetailsForm: React.StatelessComponent<ICardDetailsForm> = (props) => (
  <form className={props.className}>
    <FieldContainer>
      <FieldTitle>
        Registration
      </FieldTitle>
      <Field
        name="registration"
        component={StyledInput}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        ABI Code
      </FieldTitle>
      <Field
        name="abi_code"
        component={StyledInput}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Does the vehicle have an ABS ?
      </FieldTitle>
      <Field
        name="abs"
        component={RadioButton}
        dataSource={[
          {id: true, name: 'Yes'},
          {id: false, name: 'No'},
        ]}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Alarm
      </FieldTitle>
      <Field
        name="alarm"
        component={StyledInput}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Date of manufacture
      </FieldTitle>
      <Field
        name="date_of_manufacture"
        component={renderDatePicker}
        placeholder="Select date of manufacture"
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Date of registration
      </FieldTitle>
      <Field
        name="date_of_registration"
        component={renderDatePicker}
        placeholder="Select date of registration"
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Drive
      </FieldTitle>
      <Field
        name="drive"
        component={StyledInput}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Whether the machine was imported ?
      </FieldTitle>
      <Field
        name="imported"
        component={RadioButton}
        dataSource={[
          {id: true, name: 'Yes'},
          {id: false, name: 'No'},
        ]}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Number of seats
      </FieldTitle>
      <Field
        name="number_of_seats"
        component={StyledInput}
        preCheck={onlyNumber}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Registered keeper
      </FieldTitle>
      <Field
        name="registered_keeper"
        component={StyledInput}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Whether the vehicle has been modified ?
      </FieldTitle>
      <Field
        name="modified"
        component={RadioButton}
        dataSource={[
          {id: true, name: 'Yes'},
          {id: false, name: 'No'},
        ]}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Date of purchase
      </FieldTitle>
      <Field
        name="date_of_purchase"
        component={renderDatePicker}
        placeholder="Select date of purchase"
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Vehicle cost
      </FieldTitle>
      <Field
        name="value_cents"
        component={StyledInput}
        style={{padding: '0 10px 0 45px'}}
        preCheck={onlyNumber}
        sign="\u00A3"
        signStyle={signStyle}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Does the vehicle have a tracking device ?
      </FieldTitle>
      <Field
        name="tracking_device"
        component={RadioButton}
        dataSource={[
          {id: true, name: 'Yes'},
          {id: false, name: 'No'},
        ]}
      />
    </FieldContainer>
  </form>
);

const StyledCarDetailsForm = styledForm(CarDetailsForm);

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  margin-bottom: 30px;
  & > ${DatePicker} {
    align-self: center;
  }
`;

export default reduxForm({form: 'carDetailsForm', initialValues: {abs: true, imported: true, modified: true, tracking_device: true}})(StyledCarDetailsForm);