import * as React from 'react';
import { reduxForm, Field } from 'redux-form';
const moment = require('moment');

import { signStyle } from 'src/common/constants/userDetails';
import { onlyNumber } from 'src/common/utils/form';

import { Add } from 'src/web/images';
import StyledInput from 'src/web/screens/UserDetails/components/StyledInput';
import RoundedButton from 'src/web/components/RoundedButton';
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

const Conviction = ({ fields }) => (
    <ContentContainer active={true}>
        {fields.map((conviction, index) => (
            <Context key={conviction.id}>
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
                <FieldContainer>
                    <FieldTitle>Code</FieldTitle>
                    <Field
                        name={`${conviction}.code`}
                        component={StyledInput}
                        preCheck={onlyNumber}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>When were you convicted?</FieldTitle>
                    <Field
                        name={`${conviction}.date`}
                        component={renderDatePicker}
                        placeholder="Select conviction date"
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>How much were you fined?</FieldTitle>
                    <Field
                        name={`${conviction}.fine_cents`}
                        component={StyledInput}
                        style={{ padding: '0 10px 0 45px' }}
                        preCheck={onlyNumber}
                        sign="\u00A3"
                        signStyle={signStyle}
                    />
                </FieldContainer>
                <FieldContainer>
                    <FieldTitle>How many points did you accrue?</FieldTitle>
                    <Field
                        name={`${conviction}.penalty_points`}
                        component={StyledInput}
                        style={{ padding: '0 10px 0 45px' }}
                        preCheck={onlyNumber}
                        signStyle={signStyle}
                    />
                </FieldContainer>
                {fields.length > 1 ? (
                    <RoundedButton
                        label="Remove Conviction"
                        style={ButtonStyles}
                        onClick={() => fields.remove(index)}
                    />
                ) : null}
            </Context>
        ))}
        <ButtonWrapper>
            <Circle title="conviction" onClick={() => fields.push({})}>
                <Add />
            </Circle>
            <Text>Add one more conviction</Text>
        </ButtonWrapper>
    </ContentContainer>
);

export default reduxForm()(Conviction) as any;
