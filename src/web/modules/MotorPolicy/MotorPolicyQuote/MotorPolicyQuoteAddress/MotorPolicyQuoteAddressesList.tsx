import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import { removeAddressRequest } from 'src/common/actions/quoteAddresses';
import {
    getQuoteAddresses,
    getLoadingState,
} from 'src/common/selectors/quoteAddresses';
import { QuoteAddress } from 'src/web/images';
import PureLayout from 'src/web/common/layouts/PureLayout';
import BoxContainer from 'src/web/common/components/BoxContainer';
import RoundedButton from 'src/web/common/components/controls/RoundedButton';
import EditIcon from 'src/web/common/components/EditIcon';
import CloseIcon from 'src/web/common/components/CloseIcon';

class MotorPolicyQuoteAddressesList extends React.PureComponent<any, any> {
    layoutDescription = {
        title: 'Address',
        icon: QuoteAddress,
        backTitle: 'Back to overview',
        backUrl: `/app/dashboard/motor/${
            this.props.match.params.policyId
        }/quote`,
    };

    handleRemoveAddress = (id, event) => {
        event.stopPropagation();
        this.props.removeAddressRequest(id);
    };

    handleEditAddress = id => {
        this.props.push(`${this.props.match.url}/${id}/edit`);
    };

    handleAddNewAddress = () => {
        this.props.push(`${this.props.match.url}/add`);
    };

    renderAddress = address => {
        const addressTitle = [
            address.line1,
            address.line2,
            address.city,
            address.county,
        ]
            .filter(a => a !== undefined)
            .join(', ');

        return (
            <Item key={address.id}>
                {addressTitle}
                <ItemAside>
                    <EditIcon
                        onClick={() => this.handleEditAddress(address.id)}
                    />
                    <CloseIcon
                        onClick={event =>
                            this.handleRemoveAddress(address.id, event)
                        }
                    />
                </ItemAside>
            </Item>
        );
    };

    render() {
        const { addresses } = this.props;

        return (
            <PureLayout description={this.layoutDescription}>
                <BoxContainer
                    title={'At what address will the vehicle be stored?'}
                >
                    {addresses.map(this.renderAddress)}
                    <RoundedButton
                        label="Add a new address"
                        type="button"
                        onClick={this.handleAddNewAddress}
                    />
                </BoxContainer>
            </PureLayout>
        );
    }
}

const Item = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ecedef;
    border-radius: 3px;
    font-size: 16px;
    color: rgba(102, 105, 125, 1);
    font-family: 'Work Sans';
    font-weight: 300;

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

const mapDispatchToProps = (dispatch: any): any =>
    bindActionCreators(
        {
            push,
            removeAddressRequest,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(
    MotorPolicyQuoteAddressesList
) as any;
