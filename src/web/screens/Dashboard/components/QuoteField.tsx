import * as React from 'react';
import styled from 'styled-components';
import {BLUE, DASHBOARD_INACTIVE_LINK_COLOR, LIGHT_GREEN} from 'src/common/constants/palette';
import {BlackArrow, WhiteTick, MoreCircles} from 'src/web/images';
import {Field, reduxForm, getFormValues} from 'redux-form';
import DatePicker from 'src/web/components/PolicyDatePicker';
import {connect} from 'react-redux';
import {IMotorPolicyWithDaysLeft} from 'src/common/interfaces/policies';
import {getDatePickerInitialValues} from '~/common/selectors/userDetils';
import {IReduxState} from '~/common/interfaces/store';
const moment = require('moment');

interface IQuoteFieldProps {
  className?: string;
  width?: number;
  icon?: any;
  disabled?: boolean;
  title?: string;
  completed?: boolean;
  onClick?: any;
  withDatePicker?: boolean;
  motorPolicy?: IMotorPolicyWithDaysLeft;
  motorId: string;
    initialValues: any;
}

const renderDatePicker = (props: any) => (
    <DatePicker
        {...props}
        onChange={props.input.onChange}
        value={props.input.value}
        error={props.meta.error}
        touched={props.meta.touched}
        maxDate={moment().add(25, 'years')}
        minDate={moment().subtract(100, 'years')}
    />
);

const QuoteField: React.StatelessComponent<IQuoteFieldProps> = (props) => {
    return (
        <form className={props.className} onClick={props.onClick}>
            <IconBox>
                {props.icon}
            </IconBox>
            <ContentBox>
                <Title>
                    {props.title}
                </Title>
                {props.withDatePicker ? (
                    <Field
                        name="date"
                        component={renderDatePicker}
                        props={{placeholder: 'Select policy start date'}}
                    />
                ) : (
                    <StatusContainer>
                        <StatusText>
                            {props.completed ? 'Review complete' : 'Click to review'}
                        </StatusText>
                        <StatusIcon>
                            {props.completed ? (<WhiteTick />) : (<MoreCircles />)}
                        </StatusIcon>
                        <BlackArrow />
                    </StatusContainer>
                )}
            </ContentBox>
        </form>
    );
}

const IconBox = styled.div`
  display: flex;
  flex: 0 0 110px;
  align-self: stretch;
  justify-content: center;
  align-items: center;
`;

const ContentBox = styled.div`
  display: flex;
  flex: 1 0 auto;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px 0 37px;
`;

const Title = styled.div`
  color: ${BLUE};
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  flex: 0 0 45%;
`;

const StatusContainer = styled.div`
  display: flex;
  flex: 0 0 55%;
  align-items: center;
  justify-content: space-between;
`;

const StatusText = styled.div`
  color: ${DASHBOARD_INACTIVE_LINK_COLOR};
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  flex: 0 0 45%;
`;

const StatusIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(51,51,51, 0.2);
`;

const StyledQuoteField = styled(QuoteField)`
  display: flex;
  height: 90px;
  width: ${props => props.width || '721'}px;
  box-shadow: 0 2px 4px rgba(51,51,51, 0.2);
  cursor: ${props => props.withDatePicker ? 'default' : 'pointer'};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
  
  & {
    ${IconBox} {
      background-color: ${props => props.disabled ? '#F0F0F0' : '#ECEDEF'};
    }
    
    ${ContentBox} {
      background-color: ${props => props.disabled ? '#F0F0F0' : '#FFF'};
    }
    
    ${StatusIcon} {
      background-color: ${props => props.completed ? LIGHT_GREEN : DASHBOARD_INACTIVE_LINK_COLOR};
    }
  }
  
  &:hover {
    ${IconBox} {
      background-color: ${props => props.withDatePicker ? '#ECEDEF' : '#D4D5D7'};
    }
    ${ContentBox} {
      background-color: ${props => props.withDatePicker ? '#FFF' : '#E6E6E6'}; 
    }
  }
  
  &:active {
    ${IconBox} {
      background-color: ${props => props.withDatePicker ? '#ECEDEF' : '#C8C9CB'};
    }
    
    ${ContentBox} {
       background-color: ${props => props.withDatePicker ? '#FFF' : '#C8C9CB'};
    }
  }
`;

const mapStateToProps = (state: IReduxState, props: IQuoteFieldProps) => ({
    motorPolicy: state.policies,
    initialValues: getDatePickerInitialValues(state, props),
});

export default connect(mapStateToProps, null)(reduxForm({form: 'datePicker'}) (StyledQuoteField)) as any;