import * as React from 'react';
import styled from 'styled-components';
import {BLUE} from 'src/common/constants/palette';
import {reduxForm, Field} from 'redux-form';
import FormSelect from 'src/web/components/Forms/FormSelect';
import {
    formSelectStyle,
    formSelectLabelStyle,
    formSelectIconStyle,
    DRIVER_DETAILS_FORM,
    signStyle,
} from 'src/common/constants/userDetails';
import {mapObjectToDataSource} from 'src/common/utils/dataSources';
import {MotoringIncidentTypes} from 'src/common/interfaces/drivers';
import DatePicker from 'src/web/components/PolicyDatePicker';
import RadioButton from 'src/web/components/Forms/RadioButton/Buttons';
import StyledInput from 'src/web/screens/UserDetails/components/StyledInput';
import {onlyNumber} from 'src/common/utils/form';
import Divider from 'src/web/screens/Landing/components/Divider';
import {styledComponentWithProps} from 'src/common/utils/types';
import {Add} from 'src/web/images';
import RoundedButton from 'src/web/components/RoundedButton';

const motoringIncidents = mapObjectToDataSource(MotoringIncidentTypes);

const renderDatePicker = (props: any) => (
    <DatePicker
        {...props}
        onChange={props.input.onChange}
        value={props.input.value}
        error={props.meta.error}
        touched={props.meta.touched}
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

const renderIncident = ({fields}) => (
    <ContentContainer>
        {fields.map((incident, index) => (
            <Context key={index}>
                <Divider/>
                <FieldContainer>
                    <FieldTitle>
                        What's happened?
                    </FieldTitle>
                    <Field
                        name={`${incident}.incident_code`}
                        component={FormSelect}
                        dataSource={motoringIncidents}
                        defaultText="Incident Code"
                        maxHeight={300}
                        labelStyle={formSelectLabelStyle}
                        iconStyle={formSelectIconStyle}
                        style={formSelectStyle}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        How much did the incident cost you and your insurer?
                    </FieldTitle>
                    <Field
                        name={`${incident}.cost_cents`}
                        component={StyledInput}
                        style={{padding: '0 10px 0 45px'}}
                        sign="\u00A3"
                        signStyle={signStyle}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        When did the incident occur?
                    </FieldTitle>
                    <Field
                        name={`${incident}.incident_date`}
                        component={renderDatePicker}
                        placeholder="Select incident date"
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        Where you at fault?
                    </FieldTitle>
                    <Field
                        name={`${incident}.fault`}
                        component={RadioButton}
                        dataSource={[
                            {id: true, name: 'Yes'},
                            {id: false, name: 'No'},
                        ]}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        Was anybody injured during the incident?
                    </FieldTitle>
                    <Field
                        name={`${incident}.personal_injury`}
                        component={RadioButton}
                        dataSource={[
                            {id: true, name: 'Yes'},
                            {id: false, name: 'No'},
                        ]}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        How much did the incident cost the third party and their insurer?
                    </FieldTitle>
                    <Field
                        name={`${incident}.third_party_cost_cents`}
                        component={StyledInput}
                        style={{padding: '0 10px 0 45px'}}
                        preCheck={onlyNumber}
                        sign="\u00A3"
                        signStyle={signStyle}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        Did the incidence occur during this policy?
                    </FieldTitle>
                    <Field
                        name={`${incident}.current_policy`}
                        component={RadioButton}
                        dataSource={[
                            {id: true, name: 'Yes'},
                            {id: false, name: 'No'},
                        ]}
                    />
                </FieldContainer>
                <RoundedButton
                    label="Remove incident"
                    style={ButtonStyles}
                    onClick={() => fields.remove(index)}
                />
                <Divider/>
            </Context>
        ))}
        <ButtonWrapper>
            <Circle title="incident" onClick={() => fields.push({fault: false, personal_injury: false, current_policy: false})}>
                <Add/>
            </Circle>
            <Text>Add incident</Text>
        </ButtonWrapper>
    </ContentContainer>
);

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

const ContentContainer = styled.div`
    display: flex;
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

export default reduxForm({form: DRIVER_DETAILS_FORM})(renderIncident);