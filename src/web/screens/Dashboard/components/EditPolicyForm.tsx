import * as React from 'react';
import styled from 'styled-components';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';

import {FOOTER_BACKGROUND_COLOR} from 'src/common/constants/palette';
import {EDIT_POLICY_OVERVIEW_FORM, EDIT_POLICY_POLICY_FORM} from 'src/common/constants/policies';
import {IReduxState} from 'src/common/interfaces/store';
import {IDataSource} from 'src/common/interfaces/dataSource';
import {IPatchPolicyFormValues} from 'src/common/interfaces/policies';

const validate = require('validate.js');
import {getDataSource} from 'src/common/selectors/dataSource';
import {
  getEditOverviewFormInitialValues,
  getEditOverviewDaysLeft
} from 'src/common/selectors/policies';
import {getMonthDays, getMonths, getYears} from 'src/common/utils/dataSources';
import { onlyNumber, onlyDecimal } from 'src/web/common/utils/form/valueNormalize';
// import {onlyNumber, onlyDecimal} from 'src/common/utils/form';

import FormDatePicker from 'src/web/common/components/controls/FormDatePicker';
import FormTextField from 'src/web/common/components/controls/FormTextField';
import FormSelect from 'src/web/common/components/controls/FormSelect';
import RoundedButton from 'src/web/components/RoundedButton';
import Input from 'src/web/components/Forms/Input';

interface IEditPolicyFormProps {
  className?: string;
  onSubmit?: any;
  motorId: string;
  handleSubmit?: any;
  initialValues?: IPatchPolicyFormValues;
  dirty?: boolean;
  submitDisabled?: boolean;
}

const ButtonStyles = {
  width: '190px',
  height: '60px',
  borderRadius: '100px',
  fontSize: '18px',
  marginTop: '5px',
};

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

const LEVEL_OF_COVER = [
    {id: 'Comprehensive', name: 'Comprehensive'},
    {id: 'Third party', name: '3rd Party'},
    {id: 'Third party, fire and theft', name: '3rd Party, Fire & Theft'},
];

const EditPolicyForm: React.StatelessComponent<IEditPolicyFormProps> = (props) => (
  <form className={props.className} onSubmit={props.handleSubmit}>
    <Container>

    <FieldWrapper>
      <Field
        errorAboveField
        label="Level of cover"
        name="level_of_cover"
        component={FormSelect}
        design={FormSelect.Modern}
        options={LEVEL_OF_COVER}
        style={{ marginBottom: 10 }}
      />
    </FieldWrapper>

    <FieldWrapper>
      <Field
          errorAboveField
          label="Excess"
          name="excess_amount_cents"
          component={FormTextField}
          leftIcon="\u00A3"
          normalize={onlyDecimal}
          style={{ marginBottom: 40 }}
      />
    </FieldWrapper>

    <FieldWrapper>
      <FieldTitle>
        Driver(s) name(s)
      </FieldTitle>
      <Field
        name="driver_name"
        component={FormTextField}
        placeholder="Driver(s) name(s)"
      />
    </FieldWrapper>

    <FieldWrapper>
      <FieldTitle>
        No Claims Bonus
      </FieldTitle>
      <Field
        name="no_claims_bonus"
        component={FormTextField}
        placeholder="0"
        normalize={onlyNumber}
      />
    </FieldWrapper>

    </Container>
    <RoundedButton
      disabled={props.submitDisabled}
      label="Submit"
      style={ButtonStyles}
      type="submit"
    />
  </form>
);

const StyledEditPolicyForm = styled(EditPolicyForm)`
  display: flex;
  flex-direction: column;
  padding: 25px 0 20px 20px;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex: 1 0 auto;
  align-self: stretch;
  flex-wrap: wrap;
  & > * {
    flex: 0 0 calc(50% - 20px);
    margin: 0 20px 20px 0;
  }

  & input::-webkit-input-placeholder {
    color: rgba(102, 107, 128, 0.3);
  }
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > div:last-child {
    margin-bottom: 0;
  }
`;

const FieldContainer = styled.div`
  display: flex;
  align-self: stretch;
  align-items: center;
  & > div {
    margin-right: 10px;
    flex: 1;
  }

  & > div:last-child {
    margin-right: 0;
  }
`;

const FieldTitle = styled.div`
  font-size: 14px;
  color: ${FOOTER_BACKGROUND_COLOR};
  line-height: 16px;
  margin-bottom: 10px;
`;

const validationSchema = {
  driver_name: {
    presence: {
      message: 'Please enter a driver name',
      allowEmpty: false,
    },
  },
  no_claims_bonus: {
    presence: {
      message: 'Please enter a no claim bonus',
      allowEmpty: false,
    },
  },
}

const getValue = formValueSelector(EDIT_POLICY_POLICY_FORM);

const validateForm = (values: any) => {
  const errors = validate(values, validationSchema, {fullMessages: false});
  return errors;
};

const form = reduxForm({form: EDIT_POLICY_POLICY_FORM, validate: validateForm})(StyledEditPolicyForm);

export default form;
