import * as React from 'react';
import styled from 'styled-components';
import {reduxForm, Field} from 'redux-form';
import {onlyNumber} from 'src/common/utils/form';
import RadioButton from 'src/web/components/Forms/RadioButton/Buttons';
import DatePicker from 'src/web/components/PolicyDatePicker';
import {signStyle} from 'src/common/constants/userDetails';
import FieldTitle from '../FieldTitle';
import styledForm from '../styledForm';
import StyledInput from '../StyledInput';
import RoundedButton from 'src/web/components/RoundedButton';

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

const ButtonStyles = {
    width: '250px',
    height: '60px',
    borderRadius: '100px',
    fontSize: '18px',
    marginTop: '5px',
};

const CarDetailsForm: React.StatelessComponent<ICardDetailsForm> = (props) => (
  <form className={props.className}>
      <FieldsContainer>
          <Container>
              <FieldTitle>
                  Vehicle Brand
              </FieldTitle>
              <Field
                  name="registration"
                  component={StyledInput}
              />
          </Container>
          <Container>
              <FieldTitle>
                  Vehicle Model
              </FieldTitle>
              <Field
                  name="registration"
                  component={StyledInput}
              />
          </Container>
      </FieldsContainer>
    <FieldContainer>
      <FieldTitle>
        What is the car's registration?
      </FieldTitle>
      <Field
        name="registration"
        component={StyledInput}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        What is the car's ABI code?
      </FieldTitle>
      <Field
        name="abi_code"
        component={StyledInput}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Does the car have ABS ?
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
        What type of alarm does the car have?
      </FieldTitle>
      <Field
        name="alarm"
        component={StyledInput}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        When was the car manufactured?
      </FieldTitle>
      <Field
        name="date_of_manufacture"
        component={renderDatePicker}
        placeholder="Select date of manufacture"
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
          When was the car registered?
      </FieldTitle>
      <Field
        name="date_of_registration"
        component={renderDatePicker}
        placeholder="Select date of registration"
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Is the car left or right hand drive?
      </FieldTitle>
      <Field
        name="drive"
        component={StyledInput}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Is the car an import?
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
        How many seats does the car have?
      </FieldTitle>
      <Field
        name="number_of_seats"
        component={StyledInput}
        preCheck={onlyNumber}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Who is the registered keeper of the car?
      </FieldTitle>
      <Field
        name="registered_keeper"
        component={StyledInput}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
       Has the car been modified ?
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
        When did you purchase the vehicle?
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
        Does it have a tracking device ?
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
    <ButtonWpapper>
        <RoundedButton
            label="Next Step"
            style={ButtonStyles}
            type="submit"
        />
    </ButtonWpapper>
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

const FieldsContainer = styled.div`
  display: flex;
  align-self: stretch;
  margin-bottom: 30px;
  justify-content: space-between;
  & > div:first-child {
    margin-right: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  flex: 1;
`;

const ButtonWpapper = styled.div`
    display: flex;
    align-self: stretch;
    align-items: center;
    justify-content: center;
`;

export default reduxForm({form: 'carDetailsForm', initialValues: {abs: true, imported: true, modified: true, tracking_device: true}})(StyledCarDetailsForm);