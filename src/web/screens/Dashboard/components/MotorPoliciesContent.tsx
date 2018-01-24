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
import {injectSaga} from '~/common/utils/saga';
import {motorPoliciesContentFlow} from '~/common/sagas/policies';

interface IMotorPoliciesContent {
    className?: string;
    policies: IMotorPolicy[];
    match?: any;
    push?: any;
}

class MotorPoliciesContent extends React.Component<IMotorPoliciesContent, {}> {
    componentWillMount() {
        injectSaga(motorPoliciesContentFlow);
    }

    render () {
        return (
            <div className={this.props.className}>
                {this.props.policies && this.props.policies.map(p => (
                    <PolicyButtonWithDescription
                        key={p.id}
                        policyName={`Policy ${p.policy_number}`}
                        circleImgUrl={p.avatar}
                        policyType="Motor Vehicle"
                        policyStatus={'Add more details to complete this policy'}
                        onClick={() => this.props.push(`${this.props.match.url}/${p.id}/overview`)}
                    />
                ))}
                <PolicyButtonWithDescription
                    icon={<Add/>}
                    policyName="Add Policy"
                    circleBgColor={PINK}
                    policyType="MOTOR VEHICLE"
                    policyStatus="Answer 7 questions to add new policy"
                    onClick={() => this.props.push(`${this.props.match.url}/add`)}
                />
            </div>
        );
    }

}

const StyledMotorPoliciesContent = styled(MotorPoliciesContent)`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  align-self: center;
  padding: 55px 20px 120px 40px;
  flex-wrap: wrap;
  width: 70%;
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