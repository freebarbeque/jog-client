import * as React from 'react';
import {reduxForm, Field} from 'redux-form';

import {MOTOR_POLICY_QUOTE_ADDRESS_DETAILS_FORM} from 'src/common/constants/quoteAddress';
import {ButtonsGroup, DropDownWrapper, DropDown, PossibleAddress, Overlay} from './styled';
import {validateForm, isPostCode} from './validate';
import RoundedButton from 'src/web/common/components/controls/RoundedButton';
import FormTextField from 'src/web/common/components/controls/FormTextField';
import BoxContainer from 'src/web/common/components/BoxContainer';
import { handleScrollToErrorField } from 'src/web/common/utils/form/scrollingToErrorField';

class MotorPolicyQuoteAddressDetails extends React.PureComponent<any, any> {
    state = {
        isPostcodeFocused: false,
        currentPostcode: '',
    };

    togglePostcodeDropDown = (isShown: boolean) => {
      this.setState({ isPostcodeFocused: isShown });
    };

    handlePostcodeInFocus = (event) => {
        this.handleLookupPostcode(event);
        this.togglePostcodeDropDown(true);
    };

    handleLookupPostcode = event => {
        if (this.props.lookupPostcode && isPostCode(event.target.value)) {
            this.setState({ currentPostcode: event.target.value });
            this.props.lookupPostcode(event.target.value);
        }
    };

    renderAddress = (address, index) => {
        const addressTitle = [
            address.line1,
            address.line2,
            address.city,
            address.county,
        ].filter(a => a).join(', ');

        return (
            <PossibleAddress
                key={index}
                onClick={() => {
                    this.props.onAddressSelect(address);
                    this.togglePostcodeDropDown(false)
                }}
            >
                {addressTitle}
            </PossibleAddress>
        );
    };

    renderAddressesListForPostcode = () => {
        const { addressesByPostcode } = this.props;
        const { currentPostcode } = this.state;

        if (!addressesByPostcode || !currentPostcode || !addressesByPostcode[currentPostcode]) {
            return null;
        }

        const content = addressesByPostcode[currentPostcode].map(this.renderAddress);

        return <DropDown>{content}</DropDown>;
    };

    render() {
        const { title, invalid, submitting } = this.props;
        const { isPostcodeFocused } = this.state;

        return (
            <BoxContainer title={title} containerStyles={{ paddingTop: '40px' }}>
                <form onSubmit={this.props.handleSubmit}>
                    <DropDownWrapper>
                        <Field
                            errorInsideLabel
                            label="Postcode"
                            placeholder="00000"
                            name="postcode"
                            component={FormTextField}
                            onFocus={this.handlePostcodeInFocus}
                            onChange={this.handleLookupPostcode}
                        />
                        {isPostcodeFocused && <Overlay onClick={() => this.togglePostcodeDropDown(false)} />}
                        {isPostcodeFocused && this.renderAddressesListForPostcode()}
                    </DropDownWrapper>
                    <Field
                        errorInsideLabel
                        label="Nick Name or House Number"
                        placeholder="Nick Name or House Number"
                        name="nickname"
                        component={FormTextField}
                        style={{ marginBottom: '15px' }}
                    />
                    <Field
                        errorInsideLabel
                        label="First Line"
                        placeholder="First Line"
                        name="line1"
                        component={FormTextField}
                        style={{ marginBottom: '15px' }}
                    />
                    <Field
                        errorInsideLabel
                        label="Second Line"
                        placeholder="Second Line"
                        name="line2"
                        component={FormTextField}
                        style={{ marginBottom: '15px' }}
                    />
                    <Field
                        errorInsideLabel
                        label="City"
                        placeholder="City Name"
                        name="city"
                        component={FormTextField}
                        style={{ marginBottom: '15px' }}
                    />
                    <Field
                        errorInsideLabel
                        label="Province / County"
                        placeholder="Province / County"
                        name="county"
                        component={FormTextField}
                        style={{ marginBottom: '35px' }}
                    />
                    <ButtonsGroup>
                        <RoundedButton
                            label="Save and continue"
                            type="submit"
                            dirty={invalid || submitting}
                            buttonStyle={{ marginRight: '10px' }}
                        />
                        <RoundedButton
                            label="Cancel"
                            onClick={this.props.onCancel}
                            buttonStyle={{ marginLeft: '10px' }}
                        />
                    </ButtonsGroup>
                </form>
            </BoxContainer>
        )
    }
}

export default reduxForm({
    form: MOTOR_POLICY_QUOTE_ADDRESS_DETAILS_FORM,
    validate: validateForm,
    onSubmitFail: handleScrollToErrorField(),
})(MotorPolicyQuoteAddressDetails);
