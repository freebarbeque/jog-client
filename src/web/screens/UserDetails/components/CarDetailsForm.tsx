import * as React from 'react';
import styled from 'styled-components';
import {reduxForm, Field} from 'redux-form';
import Input from 'src/web/components/Forms/Input';
import {BLUE} from 'src/common/constants/palette';
import {onlyNumber} from 'src/common/utils/form';

interface ICardDetailsForm {
  className?: string;
}

const inputStyles = {
  border: '2px solid #dbdcde',
  borderRadius: 5,
  marginTop: 0,
  width: '100%',
  height: 40,
  boxSizing: 'border-box',
  padding: '0 10px',
  fontSize: '16px',
};

const inputStylesWithSign = Object.assign({}, inputStyles, {padding: '0 10px 0 45px'});

const signStyle = {
  fontSize: 20,
  top: '50%',
  transform: 'translateY(-50%)',
  width: 25,
};

const CarDetailsForm: React.StatelessComponent<ICardDetailsForm> = (props) => (
  <form className={props.className}>
    <FieldContainer>
      <FieldTitle>
        ABI Code
      </FieldTitle>
      <Field
        name="abi_code"
        component={Input}
        style={inputStyles}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Alarm
      </FieldTitle>
      <Field
        name="alarm"
        component={Input}
        style={inputStyles}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Number of seats
      </FieldTitle>
      <Field
        name="number_of_seats"
        component={Input}
        style={inputStyles}
        preCheck={onlyNumber}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Registered keeper
      </FieldTitle>
      <Field
        name="registered_keeper"
        component={Input}
        style={inputStyles}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Registration
      </FieldTitle>
      <Field
        name="registration"
        component={Input}
        style={inputStyles}
      />
    </FieldContainer>
    <FieldContainer>
      <FieldTitle>
        Vehicle cost
      </FieldTitle>
      <Field
        name="value_cents"
        component={Input}
        style={inputStylesWithSign}
        preCheck={onlyNumber}
        sign="\u00A3"
        signStyle={signStyle}
      />
    </FieldContainer>
  </form>
);

const StyledCarDetailsForm = styled(CarDetailsForm)`
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
`;

const FieldTitle = styled.div`
  font-size: 20px;
  line-height: 22px;
  color: ${BLUE};
  margin-bottom: 10px;
  align-self: center;
`;

export default reduxForm({form: 'carDetailsForm'})(StyledCarDetailsForm);