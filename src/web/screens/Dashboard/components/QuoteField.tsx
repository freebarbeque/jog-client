import * as React from 'react';
import styled from 'styled-components';
import {
    BLUE,
    DASHBOARD_INACTIVE_LINK_COLOR,
    LIGHT_GREEN,
    BLACK,
} from 'src/common/constants/palette';
import { BlackArrow, WhiteTick, MoreCircles } from 'src/web/images';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import { IMotorPolicyWithDaysLeft } from 'src/common/interfaces/policies';
import { getDatePickerInitialValues } from '~/common/selectors/userDetils';
import { IReduxState } from '~/common/interfaces/store';
import DatePicker from 'src/web/common/components/controls/base/DatePicker';
const moment = require('moment');

interface IQuoteFieldProps {
    className?: string;
    width?: number;
    icon?: any;
    disabled?: boolean;
    title?: string;
    primaryTitle?: string;
    completed?: boolean;
    onClick?: any;
    withDatePicker?: boolean;
    motorPolicy?: IMotorPolicyWithDaysLeft;
    motorId: string;
    initialValues: any;
    onDatePickerChange: any;
}

class QuoteField extends React.Component<IQuoteFieldProps, {}> {
    render() {
        return (
            <form className={this.props.className} onClick={this.props.onClick}>
                <IconBox>{this.props.icon}</IconBox>
                <ContentBox>
                    <TitleContent>
                        {!this.props.primaryTitle && (
                            <PrimaryTitle>{this.props.title}</PrimaryTitle>
                        )}
                        {this.props.primaryTitle && (
                            <SecondaryTitle>{this.props.title}</SecondaryTitle>
                        )}
                        {this.props.primaryTitle && (
                            <PrimaryTitle>
                                {this.props.primaryTitle}
                            </PrimaryTitle>
                        )}
                    </TitleContent>

                    {this.props.withDatePicker ? (
                        <DatePicker
                            initialDate={
                                this.props.initialValues &&
                                this.props.initialValues.date
                            }
                            minDate={moment()}
                            maxDate={moment().add(1, 'years')}
                            onChange={this.props.onDatePickerChange}
                            selectProps={{
                                autoWidth: true,
                            }}
                        />
                    ) : (
                        <StatusContainer>
                            {!this.props.completed && (
                                <StatusText>Click to review</StatusText>
                            )}
                            <StatusIcon>
                                {this.props.completed ? (
                                    <WhiteTick />
                                ) : (
                                    <MoreCircles />
                                )}
                            </StatusIcon>
                            <BlackArrow />
                        </StatusContainer>
                    )}
                </ContentBox>
            </form>
        );
    }
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
    flex-grow: 1;
    justify-content: space-between;
    align-items: center;
    padding: 0 28px 0 37px;
`;

const TitleContent = styled.div`
    margin-right: 10px;
    flex-grow: 1;
    display: 'flex';
    flex-direction: 'column';
`;

const PrimaryTitle = styled.div`
    color: ${BLUE};
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    flex: 0 0 45%;
`;

const SecondaryTitle = styled.div`
    color: ${BLACK};
    color: #000000;
    font-size: 14px;
    line-height: 24px;
`;

const StatusContainer = styled.div`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const StatusText = styled.div`
    margin-right: 20px;
    color: ${DASHBOARD_INACTIVE_LINK_COLOR};
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
`;

const StatusIcon = styled.div`
    margin-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(51, 51, 51, 0.2);
`;

const StyledQuoteField = styled(QuoteField)`
    display: flex;
    height: 90px;
    width: ${props => props.width || '721'}px;
    box-shadow: 0 2px 4px rgba(51, 51, 51, 0.2);
    cursor: ${props => (props.withDatePicker ? 'default' : 'pointer')};
    pointer-events: ${props => (props.disabled ? 'none' : 'auto')};

    & {
        ${IconBox} {
            background-color: ${props =>
                props.disabled ? '#F0F0F0' : '#ECEDEF'};
        }

        ${ContentBox} {
            background-color: ${props => (props.disabled ? '#F0F0F0' : '#FFF')};
        }

        ${StatusIcon} {
            background-color: ${props =>
                props.completed ? LIGHT_GREEN : DASHBOARD_INACTIVE_LINK_COLOR};
        }
    }

    &:hover {
        ${IconBox} {
            background-color: ${props =>
                props.withDatePicker ? '#ECEDEF' : '#D4D5D7'};
        }
        ${ContentBox} {
            background-color: ${props =>
                props.withDatePicker ? '#FFF' : '#E6E6E6'};
        }
    }

    &:active {
        ${IconBox} {
            background-color: ${props =>
                props.withDatePicker ? '#ECEDEF' : '#C8C9CB'};
        }

        ${ContentBox} {
            background-color: ${props =>
                props.withDatePicker ? '#FFF' : '#C8C9CB'};
        }
    }
`;

const mapStateToProps = (state: IReduxState, props: IQuoteFieldProps) => ({
    motorPolicy: state.policies,
    initialValues: getDatePickerInitialValues(state, props),
});

export default reduxForm({ form: 'datePicker' })(StyledQuoteField) as any;
