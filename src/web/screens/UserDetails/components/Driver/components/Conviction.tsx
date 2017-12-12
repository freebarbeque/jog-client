import * as React from 'react';
import styled from 'styled-components';
import {BLUE} from 'src/common/constants/palette';
import {reduxForm, Field} from 'redux-form';
import {
    signStyle,
} from 'src/common/constants/userDetails';
import DatePicker from 'src/web/components/PolicyDatePicker';
import StyledInput from 'src/web/screens/UserDetails/components/StyledInput';
import {onlyNumber} from 'src/common/utils/form';
import Divider from 'src/web/screens/Landing/components/Divider';
import {styledComponentWithProps} from 'src/common/utils/types';
import {Add} from 'src/web/images';
import RoundedButton from 'src/web/components/RoundedButton';
const moment = require('moment');

const renderDatePicker = (props: any) => (
    <DatePicker
        {...props}
        onChange={props.input.onChange}
        value={props.input.value}
        error={props.meta.error}
        touched={props.meta.touched}
        maxDate={moment()}
        minDate={moment().subtract(100, 'years')}
    />
);

const ButtonStyles = {
    width: '170px',
    height: '40px',
    borderRadius: '100px',
    fontSize: '16px',
    marginBottom: '30px',
};

interface ICircleProps {
    backgroundColor?: string;
    src?: string;
}

interface IContentContainer {
    active: boolean;
}

const Conviction = ({fields, active}) => (
    <ContentContainer active={active}>
        {fields.map((conviction, index) => (
            <Context key={index}>
                <Divider/>
                <FieldContainer>
                    <FieldTitle>
                        For how many month were you disqualified?
                    </FieldTitle>
                    <Field
                        name={`${conviction}.months_banned`}
                        component={StyledInput}
                        preCheck={onlyNumber}
                    />
                </FieldContainer>
                {/*// remove after fix back*/}
                {/*<FieldContainer>*/}
                    {/*<FieldTitle>*/}
                        {/*Code*/}
                    {/*</FieldTitle>*/}
                    {/*<Field*/}
                        {/*name={`${conviction}.code`}*/}
                        {/*component={StyledInput}*/}
                        {/*preCheck={onlyNumber}*/}
                    {/*/>*/}
                {/*</FieldContainer>*/}
                <FieldContainer>
                    <FieldTitle>
                        When were you convicted?
                    </FieldTitle>
                    <Field
                        name={`${conviction}.date`}
                        component={renderDatePicker}
                        placeholder="Select conviction date"
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        How much were you fined?
                    </FieldTitle>
                    <Field
                        name={`${conviction}.fine_cents`}
                        component={StyledInput}
                        style={{padding: '0 10px 0 45px'}}
                        preCheck={onlyNumber}
                        sign="\u00A3"
                        signStyle={signStyle}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        How many points did you accrue?
                    </FieldTitle>
                    <Field
                        name={`${conviction}.penalty_points`}
                        component={StyledInput}
                        style={{padding: '0 10px 0 45px'}}
                        preCheck={onlyNumber}
                        sign="\u00A3"
                        signStyle={signStyle}
                    />
                </FieldContainer>
                {fields.length > 1 ?
                    <RoundedButton
                        label="Remove Conviction"
                        style={ButtonStyles}
                        onClick={() => fields.remove(index)}
                    /> : null
                }
                <Divider/>
            </Context>
        ))}
        <ButtonWrapper>
            <Circle title="conviction" onClick={() => fields.push({})}>
                <Add/>
            </Circle>
            <Text>Add one more conviction</Text>
        </ButtonWrapper>
    </ContentContainer>
)

const conviction = styledComponentWithProps<IContentContainer, HTMLDivElement>(styled.div);

const div = styledComponentWithProps<ICircleProps, HTMLDivElement>(styled.div);

const Text = styled.div`
    margin-left: 25px;
    color: #131733;
    font-size: 24px;
`;

const Circle = div`
  width: 60px;
  height: 60px;
  background-color: #50e3c2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-position: 50%;
  background-size: cover;
  cursor: pointer;
`;

const FieldTitle = styled.div`
  font-size: 20px;
  line-height: 22px;
  color: ${BLUE};
  margin-bottom: 10px;
  align-self: center;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-self: stretch;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
`;

const ContentContainer = conviction`
    display: ${props => props.active ? 'flex' : 'none'};
    flex-direction: column;
    align-self: stretch;
    margin-bottom: 30px;
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

const Context = styled.div`
    display: flex;
    align-self: stretch;
    align-items: center;
    flex-direction: column;
`;

export default reduxForm()(Conviction) as any;
