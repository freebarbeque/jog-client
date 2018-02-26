import * as React from 'react';
import { Field } from 'redux-form';
import RadioButton from 'src/web/components/Forms/RadioButton/Buttons';

import {
    FieldTitle,
    ContentContainer,
    FieldContainer,
    Context,
} from './styled';

const YES_NO_OPTIONS = [{ id: true, name: 'Yes' }, { id: false, name: 'No' }];

const Conviction = ({ fields }) => (
    <ContentContainer active={true}>
        {fields.map((conviction, index) => (
            <Context key={index}>
                <FieldContainer>
                    <FieldTitle>
                        Do you have any non driving convictions?
                    </FieldTitle>
                    <Field
                        name={`${conviction}.non_driving`}
                        component={RadioButton}
                        dataSource={YES_NO_OPTIONS}
                    />
                </FieldContainer>

                <FieldContainer>
                    <FieldTitle>
                        Has anyone on the policy ever had an insurance policy declined, cancelled, voided or had special terms imposed?
                    </FieldTitle>
                    <Field
                        name={`${conviction}.declined_cancelled`}
                        component={RadioButton}
                        dataSource={YES_NO_OPTIONS}
                    />
                </FieldContainer>
            </Context>
        ))}
    </ContentContainer>
);

export default Conviction;
