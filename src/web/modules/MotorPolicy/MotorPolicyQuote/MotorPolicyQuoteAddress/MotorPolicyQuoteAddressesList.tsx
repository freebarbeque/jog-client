import * as React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {push} from 'react-router-redux';

import {removeAddressRequest} from 'src/common/actions/quoteAddresses';
import {getQuoteAddresses, getLoadingState} from 'src/common/selectors/quoteAddresses';
import {QuoteAddress} from 'src/web/images';
import PureLayout from 'src/web/common/layouts/PureLayout';
import BoxContainer from 'src/web/common/components/BoxContainer';

class MotorPolicyQuoteAddressesList extends React.PureComponent<any, any> {
    layoutDescription = {
        title: 'Address',
        icon: QuoteAddress,
        backTitle: 'Back to overview',
        backUrl: `/app/dashboard/motor/${this.props.match.params.policyId}/quote`,
    };

    renderAddress = address => {
        const addressTitle = [
            address.line1,
            address.line2,
            address.city,
            address.county,
        ].filter(a => a !== undefined).join(', ');

        return (
            <Item key={address.id} onClick={() => this.props.push(`${this.props.match.url}/${address.id}/edit`)}>
                {addressTitle}
                <ItemAside onClick={event => { event.stopPropagation(); this.props.removeAddressRequest(address.id) }}>Remove</ItemAside>
            </Item>
        );
    };

    render() {
        const { addresses } = this.props;

        return (
            <PureLayout description={this.layoutDescription}>
                <BoxContainer title={'At what address will the vehicle be stored?'}>
                    {addresses.map(this.renderAddress)}
                    <Item key="add" onClick={() => this.props.push(`${this.props.match.url}/add`)}>{'Add a new address'}</Item>
                </BoxContainer>
            </PureLayout>
        )
    }
}

const Item = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ECEDEF;
    border-radius: 3px;
    font-size: 16px;
    color: rgba(102, 105, 125, 1);
    font-family: 'Work Sans';
    font-weight: 300;
    cursor: pointer;
    
    &:not(:last-child) {
        margin-bottom: 10px;
    }
`;

const ItemAside = styled.div`
    margin-left: 20px;
`;

const mapStateToProps = (state: any): any => ({
    addresses: getQuoteAddresses(state),
    isLoading: getLoadingState(state),
});

const mapDispatchToProps = (dispatch: any): any => bindActionCreators({
    push,
    removeAddressRequest,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MotorPolicyQuoteAddressesList) as any;
