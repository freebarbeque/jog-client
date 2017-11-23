import * as React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import PolicyButtonWithDescription from './PolicyButtonWithDescription';
import {PINK} from 'src/common/constants/palette';
import {Add} from 'src/web/images';
import {IMotorPolicy, IPolicy} from 'src/common/interfaces/policies';
import {getPolicies} from '~/common/selectors/policies';
import {MOTOR_POLICY} from '~/common/constants/policies';
import {IReduxState} from '~/common/interfaces/store';

interface IMotorPoliciesContent {
    className?: string;
    policies: IMotorPolicy[];
    match?: any;
    push?: any;
}

const MotorPoliciesContent: React.StatelessComponent<IMotorPoliciesContent> = (props) => {
    console.log(props.policies);
    return (
        <div className={props.className}>
            {props.policies && props.policies.map(p => (
                <PolicyButtonWithDescription
                    key={p.id}
                    circleImgUrl={p.avatar}
                    policyType="Motor Vehicle"
                    policyName={p.name}
                    policyStatus={'Add more details to complete this policy'}
                    onClick={() => props.push(`${props.match.url}/${p.id}/overview`)}
                />
            ))}
            <PolicyButtonWithDescription
                icon={<Add/>}
                circleBgColor={PINK}
                policyName="Add Policy"
                policyType="MOTOR VEHICLE"
                policyStatus="Answer 7 questions to add new policy"
                onClick={() => props.push(`${props.match.url}/add`)}
            />
        </div>
    );
}

const StyledMotorPoliciesContent = styled(MotorPoliciesContent)`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  align-self: stretch;
  padding: 56px 22px 146px 42px;
  flex-wrap: wrap;
  align-content: flex-start;
  & ${PolicyButtonWithDescription} {
    margin-right: 20px;
    margin-bottom: 5px;
  }
`;

const getMotorPolicies = getPolicies(MOTOR_POLICY);

const mapStateToProps = (state: IReduxState) => ({
    policies: getMotorPolicies(state),
});

const mapDispatchToProps = (dispatch: any): any => bindActionCreators({
    push,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StyledMotorPoliciesContent);