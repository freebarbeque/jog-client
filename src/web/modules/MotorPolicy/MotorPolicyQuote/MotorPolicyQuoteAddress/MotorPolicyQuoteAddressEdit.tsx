import * as React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {SubmissionError} from 'redux-form';

import {getAddressById, getPossibleAddresses} from 'src/common/selectors/quoteAddresses';
import {lookupPostCode, updateAddressRequest, selectAddressRequest} from 'src/common/actions/quoteAddresses';
import {QuoteAddress} from 'src/web/images';
import PureLayout from 'src/web/common/layouts/PureLayout';

import MotorPolicyQuoteAddressDetails from './MotorPolicyQuoteAddressForm';

class MotorPolicyQuoteAddressEdit extends React.PureComponent<any, any> {
    layoutDescription = {
        title: 'Address',
        icon: QuoteAddress,
        backTitle: 'Back to addresses',
        backUrl: `/app/motor/${this.props.match.params.policyId}/quote/address`,
    };

    handleSubmit = (values) => {
        this.props.updateAddressRequest(this.props.match.params.addressId, values);
    };

    handleCancel = () => {
        this.props.push(`/app/motor/${this.props.match.params.policyId}/quote/address`)
    };

    lookupPostcode = postcode => {
        this.props.lookupPostCode(postcode);
    };

    handleSelectPossibleAddress = address => {
        this.props.selectAddressRequest(address);
    };

    render() {
        const { address, possibleAddresses } = this.props;

        return (
            <PureLayout description={this.layoutDescription}>
                <MotorPolicyQuoteAddressDetails
                    title={'Edit Address'}
                    possibleAddresses={possibleAddresses}
                    onSelectPossibleAddress={this.handleSelectPossibleAddress}
                    onSubmit={this.handleSubmit}
                    onCancel={this.handleCancel}
                    lookupPostcode={this.lookupPostcode}
                    initialValues={...address}
                />
            </PureLayout>
        )
    }
}

const mapStateToProps = (state: any, props: any): any => ({
    address: getAddressById(state, Number(props.match.params.addressId)),
    possibleAddresses: getPossibleAddresses(state),
});

const mapDispatchToProps = (dispatch: any): any => bindActionCreators({
    lookupPostCode,
    updateAddressRequest,
    selectAddressRequest,
    push,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MotorPolicyQuoteAddressEdit) as any;
