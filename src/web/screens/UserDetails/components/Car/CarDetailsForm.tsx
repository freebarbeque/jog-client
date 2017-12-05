import * as React from 'react';
import styled from 'styled-components';
import {reduxForm, Field} from 'redux-form';
import FieldTitle from '../FieldTitle';
import styledForm from '../styledForm';
import StyledInput from '../StyledInput';
import RoundedButton from 'src/web/components/RoundedButton';
import {connect} from 'react-redux';
import {IReduxState} from '~/common/interfaces/store';
import {getIsLoading} from '~/common/selectors/userDetils';
const validate = require('validate.js');

interface ICardDetailsForm {
    className?: string;
    isLoading: boolean;
    error: string;
    handleSubmit: any;
}

const ButtonStyles = {
    width: '250px',
    height: '60px',
    borderRadius: '100px',
    fontSize: '18px',
    marginTop: '5px',
};

class CarDetailsForm extends React.Component<ICardDetailsForm, {}> {
    render() {
        return (
            <form className={this.props.className} onSubmit={this.props.handleSubmit}>
                <FieldContainer>
                    <FieldTitle>
                        What is the car's registration?
                    </FieldTitle>
                    <Field
                        name="vrm"
                        component={StyledInput}
                    />
                </FieldContainer>
                <ButtonWrapper>
                    <RoundedButton
                        label="Next Step"
                        style={ButtonStyles}
                        type="submit"
                        disabled={this.props.isLoading}
                    />
                </ButtonWrapper>
            </form>
        );
    }
}

const validationSchema = {
    vrm: {
        presence: {
            message: 'Please enter your registration number',
            allowEmpty: false,
        },
    },
};

const validateForm = (values: any) => {
    const errors = validate(values, validationSchema, {fullMessages: false});
    return errors;
};

const StyledCarDetailsForm = styledForm(CarDetailsForm as any);

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  margin-bottom: 30px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    align-self: stretch;
    align-items: center;
    justify-content: center;
`;

const mapStateToProps = (state: IReduxState) => ({
    isLoading: getIsLoading(state),
});

const form = reduxForm({
    form: 'carDetailsForm',
    validate: validateForm,
})(StyledCarDetailsForm);

export default connect(mapStateToProps, null)(form) as any;