import * as React from 'react';
import styled from 'styled-components';
import {reduxForm, Field, formValueSelector} from 'redux-form';
const validate = require('validate.js');
import {connect} from 'react-redux';
import DaysLeft from './DaysLeft';
import RoundedButton from 'src/web/components/RoundedButton';
import Input from 'src/web/components/Forms/Input';
import {getMonthDays, getMonths, getYears} from 'src/common/utils/dataSources';
import {EDIT_POLICY_OVERVIEW_FORM} from 'src/common/constants/policies';
import {IReduxState} from 'src/common/interfaces/store';
import {FOOTER_BACKGROUND_COLOR} from 'src/common/constants/palette';
import {getEditOverviewFormInitialValues, getEditOverviewDaysLeft} from 'src/common/selectors/policies';
// import {onlyNumber, onlyDecimal} from 'src/common/utils/form';
import {getDataSource} from 'src/common/selectors/dataSource';
import {IDataSource} from 'src/common/interfaces/dataSource';
import {IPatchPolicyFormValues} from 'src/common/interfaces/policies';

import FormSelect from 'src/web/common/components/controls/FormSelect';
import FormDatePicker from 'src/web/common/components/controls/FormDatePicker';
import FormTextField from 'src/web/common/components/controls/FormTextField';
import { onlyNumber, onlyDecimal } from 'src/web/common/utils/form/valueNormalize';

interface IEditOverviewFormProps {
  className?: string;
  onSubmit?: any;
  year?: string;
  month?: string;
  motorId: string;
  insurersDataSource?: IDataSource;
  daysLeft?: number;
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

const EditOverviewForm: React.StatelessComponent<IEditOverviewFormProps> = (props) => (
  <form className={props.className} onSubmit={props.handleSubmit}>
    <Container>
      <DaysLeft days={props.daysLeft} />
      <FieldWrapper>
        <FieldTitle>
          Expires
        </FieldTitle>
        <FieldContainer>
          <Field
            name="expiry"
            component={FormDatePicker}
          />
        </FieldContainer>
      </FieldWrapper>
      <FieldWrapper>
        <FieldTitle>
          Vehicle
        </FieldTitle>
        <FieldContainer>
          <Field
              name="vehicle_brand"
              component={FormSelect}
              design={FormSelect.Modern}
              options={[]}
              placeholder="Brand"
          />
          <Field
              name="vehicle_model"
              component={FormSelect}
              design={FormSelect.Modern}
              options={[]}
              placeholder="Model"
          />
        </FieldContainer>
      </FieldWrapper>
      <FieldWrapper>
        <FieldTitle>
          Policy No.
        </FieldTitle>
        <Field
          name="policy_number"
          component={FormTextField}
          placeholder="000000000"
          normalize={onlyNumber}
        />
      </FieldWrapper>
      <FieldWrapper>
        <FieldTitle>
          Insurance Co.
        </FieldTitle>
        <Field
            name="insurance_company_id"
            component={FormSelect}
            design={FormSelect.Modern}
            options={props.insurersDataSource}
            placeholder="Insurance Company"
        />
      </FieldWrapper>
      <FieldWrapper>
        <FieldTitle>
          Annual Cost
        </FieldTitle>
        <Field
          name="annual_cost_cents"
          component={FormTextField}
          placeholder="000000000"
          normalize={onlyDecimal}
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

const StyledEditOverviewForm = styled(EditOverviewForm)`
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
  policy_number: {
    presence: {
      message: 'Please enter your policy number',
      allowEmpty: false,
    },
  },
  annual_cost_cents: {
    presence: {
      message: 'Please enter your policy cost',
      allowEmpty: false,
    },
  },
};

const getValue = formValueSelector(EDIT_POLICY_OVERVIEW_FORM);

const validateForm = (values: any) => {
  const errors = validate(values, validationSchema, {fullMessages: false});
  return errors;
};

const form = reduxForm({form: EDIT_POLICY_OVERVIEW_FORM, validate: validateForm})(StyledEditOverviewForm);

const mapStateToProps = (state: IReduxState, props: IEditOverviewFormProps): any => ({
  insurersDataSource: getDataSource(state, 'insuranceCompanies'),
  daysLeft: getEditOverviewDaysLeft(state),
});

export default connect(mapStateToProps, null)(form);
