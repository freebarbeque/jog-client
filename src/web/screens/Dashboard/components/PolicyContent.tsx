import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Action, ActionCreator, bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import PolicyButton from './PolicyButton';
import {
    PolicyCar,
    PolicyHome,
    PolicyTravel,
    PolicyWarranties,
} from 'src/web/images';

interface IPolicyContent {
    className?: string;
    push: ActionCreator<Action>;
    match: any;
}

const PolicyContent = (props: IPolicyContent) => (
    <div className={props.className}>
        <PolicyButton
            icon={<PolicyCar />}
            title="Motor"
            onClick={() => props.push(`${props.match.url}/motor`)}
        />
        <PolicyButton
            icon={<PolicyHome />}
            disabled
            title="Home & Contents"
            subTitle="Coming soon..."
        />
        <PolicyButton
            icon={<PolicyTravel />}
            disabled
            title="Travel"
            subTitle="Coming soon..."
        />
        <PolicyButton
            icon={<PolicyWarranties />}
            disabled
            title="Warranties"
            subTitle="Coming soon..."
        />
    </div>
);

const StyledPolicyContent = styled(PolicyContent)`
    display: flex;
    flex-wrap: wrap;
    align-self: stretch;
    align-content: flex-start;
    flex: 1 0 auto;
    width: 70%;
    min-width: 720px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 60px 0 140px 20px;
    & ${PolicyButton} {
        margin-right: 20px;
        margin-bottom: 10px;
    }
`;

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            push,
        },
        dispatch
    );

export default connect(null, mapDispatchToProps)(StyledPolicyContent);
