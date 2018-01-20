import * as React from 'react';
import styled from 'styled-components';
import PolicyButton from './PolicyButton';
import {PolicyMail, PolicyManual, PolicyPhoto} from 'src/web/images';
import {push} from 'react-router-redux';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import {connect} from 'react-redux';

interface IAddPolicyContentProps {
  className?: string;
  push: ActionCreator<Action>;
}

const AddPolicyContent: React.StatelessComponent<IAddPolicyContentProps> = (props: IAddPolicyContentProps) => (
  <div className={props.className}>
    <PolicyButton
      title="Email the policy"
      icon={<PolicyMail />}
      onClick={() => location.href = 'mailto:documents@jog.insure?subject=Jog%20-%20Insurance%20Policy%20Documents'}
    />
    <PolicyButton
      notification="Recommended"
      title="Manual"
      icon={<PolicyManual />}
      onClick={() => props.push('/app/motor/add/manual')}
    />
    <PolicyButton
      title="Upload or Drag and Drop a file"
      icon={<PolicyPhoto />}
      onClick={() => props.push('/app/motor/add/upload')}
    />
  </div>
);

const StyledAddPolicy = styled(AddPolicyContent)`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  align-self: stretch;
  width: 70%;
  margin: 0 auto;
  padding: 56px 22px 146px 42px;
  flex-wrap: wrap;
  align-content: flex-start;
  & ${PolicyButton} {
    margin-right: 20px;
    margin-bottom: 5px;
  }
`;

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    push,
}, dispatch);

export default connect(null, mapDispatchToProps)(StyledAddPolicy);