import * as React from 'react';
import { reduxForm, Field } from 'redux-form';
const moment = require('moment');

import {
    formSelectStyle,
    formSelectLabelStyle,
    formSelectIconStyle,
    signStyle,
} from 'src/common/constants/userDetails';
import { onlyNumber } from 'src/common/utils/form';
import { mapObjectToDataSource } from 'src/common/utils/dataSources';
import { MotoringIncidentTypes } from 'src/common/interfaces/drivers';

import { Add } from 'src/web/images';
import StyledInput from 'src/web/screens/UserDetails/components/StyledInput';
import RoundedButton from 'src/web/components/RoundedButton';
import RadioButton from 'src/web/components/Forms/RadioButton/Buttons';
import FormSelect from 'src/web/components/Forms/FormSelect';
import { renderDatePicker } from './datePickerUtils';
import {
    ButtonStyles,
    Text,
    Circle,
    FieldTitle,
    ButtonWrapper,
    ContentContainer,
    FieldContainer,
    Context,
} from './styled';

const motoringIncidents = mapObjectToDataSource(MotoringIncidentTypes);

const Incident = ({ fields, active }) => (
    <ContentContainer active={true}>
        {fields.map((incident, index) => (
            <Context key={incident.id}>
                <FieldContainer>
                    <FieldTitle>What's happened?</FieldTitle>
                    <Field
                        name={`${incident}.code`}
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
                        style={{ padding: '0 10px 0 45px' }}
                        sign="\u00A3"
                        signStyle={signStyle}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>When did the incident occur?</FieldTitle>
                    <Field
                        name={`${incident}.date`}
                        component={renderDatePicker}
                        placeholder="Select incident date"
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>Where you at fault?</FieldTitle>
                    <Field
                        name={`${incident}.fault`}
                        component={RadioButton}
                        dataSource={[
                            { id: true, name: 'Yes' },
                            { id: false, name: 'No' },
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
                            { id: true, name: 'Yes' },
                            { id: false, name: 'No' },
                        ]}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>
                        How much did the incident cost the third party and their
                        insurer?
                    </FieldTitle>
                    <Field
                        name={`${incident}.third_party_cost_cents`}
                        component={StyledInput}
                        style={{ padding: '0 10px 0 45px' }}
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
                            { id: true, name: 'Yes' },
                            { id: false, name: 'No' },
                        ]}
                    />
                </FieldContainer>
                {fields.length > 1 ? (
                    <RoundedButton
                        label="Remove Incident"
                        style={ButtonStyles}
                        onClick={() => fields.remove(index)}
                    />
                ) : null}
            </Context>
        ))}
        <ButtonWrapper>
            <Circle
                title="incident"
                onClick={() =>
                    fields.push({
                        fault: false,
                        personal_injury: false,
                        current_policy: false,
                    })
                }
            >
                <Add />
            </Circle>
            <Text>Add one more incident</Text>
        </ButtonWrapper>
    </ContentContainer>
);

export default reduxForm()(Incident);
