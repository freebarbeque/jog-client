import * as React from 'react';
import styled from 'styled-components';
import {reduxForm, Field, formValueSelector} from 'redux-form';
import {connect} from 'react-redux';
import DaysLeft from './DaysLeft';
import Input from 'src/web/components/Forms/Input';
import {getMonthDays, getMonths, getYears} from 'src/common/utils/dataSources';
import FormSelect from 'src/web/components/Forms/FormSelect';
import {EDIT_POLICY_OVERVIEW_FORM} from 'src/common/constants/policies';
import {IReduxState} from 'src/common/interfaces/store';
import {FOOTER_BACKGROUND_COLOR} from 'src/common/constants/palette';

interface IEditOverviewFormProps {
  className?: string;
  onSubmit?: any;
  year?: string;
  month?: string;
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

const EditOverviewForm: React.StatelessComponent<IEditOverviewFormProps> = (props) => (
  <form className={props.className}>
    <DaysLeft days="0" />
    <FieldWrapper>
      <FieldTitle>
        Expires
      </FieldTitle>
      <FieldContainer>
        <Field
          name="day"
          component={FormSelect}
          dataSource={getMonthDays(props.month, props.year)}
          defaultText="Day"
          maxHeight={300}
          labelStyle={{height: 40, lineHeight: 40}}
          iconStyle={{width: 40, height: 40, padding: 8}}
          style={{height: 40}}
        />
        <Field
          name="month"
          component={FormSelect}
          dataSource={getMonths(props.year)}
          defaultText="Month"
          maxHeight={300}
          labelStyle={{height: 40, lineHeight: 40}}
          iconStyle={{width: 40, height: 40, padding: 8}}
          style={{height: 40}}
        />
        <Field
          name="year"
          component={FormSelect}
          dataSource={getYears()}
          defaultText="Year"
          maxHeight={300}
          labelStyle={{height: 40, lineHeight: 40}}
          iconStyle={{width: 40, height: 40, padding: 8}}
          style={{height: 40}}
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
          dataSource={[]}
          defaultText="Brand"
          maxHeight={300}
          labelStyle={{height: 40, lineHeight: 40}}
          iconStyle={{width: 40, height: 40, padding: 8}}
          style={{height: 40}}
        />
        <Field
          name="vehicle_model"
          component={FormSelect}
          dataSource={[]}
          defaultText="Model"
          maxHeight={300}
          labelStyle={{height: 40, lineHeight: 40}}
          iconStyle={{width: 40, height: 40, padding: 8}}
          style={{height: 40}}
        />
      </FieldContainer>
    </FieldWrapper>
    <FieldWrapper>
      <FieldTitle>
        Policy No.
      </FieldTitle>
      <Field
        name="policy_number"
        component={Input}
        style={inputStyles}
        placeholder="000000000"
      />
    </FieldWrapper>
    <FieldWrapper>
      <FieldTitle>
        Insurance Co.
      </FieldTitle>
      <Field
        name="insurance_company_id"
        component={FormSelect}
        dataSource={[]}
        defaultText="Insurance Company"
        maxHeight={300}
        labelStyle={{height: 40, lineHeight: 40}}
        iconStyle={{width: 40, height: 40, padding: 8}}
        style={{height: 40}}
      />
    </FieldWrapper>
    <FieldWrapper>
      <FieldTitle>
        Cost per month
      </FieldTitle>
      <Field
        name="annual_cost_cents"
        component={Input}
        style={inputStyles}
        placeholder="000000000"
      />
    </FieldWrapper>
  </form>
);

const StyledEditOverviewForm = styled(EditOverviewForm)`
  display: flex;
  flex-wrap: wrap;
  padding: 25px 0 20px 20px;
  
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

const getValue = formValueSelector(EDIT_POLICY_OVERVIEW_FORM);

const mapStateToProps = (state: IReduxState) => ({
  year: getValue(state, 'year'),
  month: getValue(state, 'month'),
  // insurersDataSource: getDataSource(state, 'insuranceCompanies'),
});

export default reduxForm({form: EDIT_POLICY_OVERVIEW_FORM})(connect(mapStateToProps, null)(StyledEditOverviewForm));