import * as React from 'react';
import styled from 'styled-components';
import {Field, reduxForm} from 'redux-form';
const validate = require('validate.js');
import Input from '../Input';
import {LANDING_INPUT_BG_COLOR, FOOTER_BACKGROUND_COLOR} from 'src/common/constants/palette';
import {WhiteSubmitArrow} from 'src/web/images';

const SignUpForm = (props) => (
  <form className={props.className} onSubmit={props.handleSubmit}>
    <Field
      name="name"
      component={Input}
      placeholder="Full name"
      width={180}
    />
    <Field
      name="email"
      component={Input}
      placeholder="Email Address"
      width={235}
    />
    <Field
      name="password"
      component={Input}
      placeholder="Create Password"
      type="password"
      width={235}
    />
    <SubmitButton
      type="submit"
    >
      <ButtonContent>
        <ButtonTitle>
          LETS START
        </ButtonTitle>
        <WhiteSubmitArrow width={13} height={20} />
      </ButtonContent>
    </SubmitButton>
  </form>
);

const StyledSignUpForm = styled(SignUpForm)`
  display: flex;
  align-items: center;
  align-self: stretch;
  & > div {
    margin-right: 5px;
  };
  margin-bottom: 20px;
`;

const SubmitButton = styled.button`
  min-width: 160px;
  flex: 1;
  background-color: ${LANDING_INPUT_BG_COLOR};
  color: ${FOOTER_BACKGROUND_COLOR};
  height: 56px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 400;
  padding: 0;
  border-radius: 0;
  border-top-right-radius: 31px;
  border-bottom-right-radius: 31px;
  cursor: pointer;
  &:hover {
    background-color: #D3D3D5;
  }
`;

const ButtonContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 0 16px;
`;

const ButtonTitle = styled.div`
`;

const validationSchema = {
  fullName: {
    presence: {
      message: 'Please enter your name',
    },
  },
  email: {
    presence: {
      message: 'Please enter a valid email address',
    },
    email: {
      message: 'Please enter a valid email address',
    },
  },
  password: {
    presence: {
      message: 'Must be at least 8 characters long',
    },
    length: {
      minimum: 8,
      tooShort: 'Must be at least 8 characters long',
    },
  }
};

const validateForm = (values: any) => {
  const errors = validate(values, validationSchema, {fullMessages: false});

  return errors;
};

export default reduxForm({validate: validateForm})(StyledSignUpForm);
