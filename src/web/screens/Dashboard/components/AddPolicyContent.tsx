import * as React from 'react';
import styled from 'styled-components';
import PolicyButton from './PolicyButton';
import {PolicyMail, PolicyManual, PolicyPhoto} from 'src/web/images';

interface IAddPolicyContentProps {
  className?: string;
}

const AddPolicyContent: React.StatelessComponent<IAddPolicyContentProps> = (props) => (
  <div className={props.className}>
    <PolicyButton
      notification="Recommended"
      title="Email the policy"
      icon={<PolicyMail />}
    />
    <PolicyButton
      title="Manual"
      icon={<PolicyManual />}
    />
    <PolicyButton
      title="Upload or Drag and Drop a file"
      icon={<PolicyPhoto />}
    />
  </div>
);

const StyledAddPolicy = styled(AddPolicyContent)`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  align-self: stretch;
  padding: 56px 22px 146px 42px;
  flex-wrap: wrap;
  align-content: flex-start;
  & ${PolicyButton} {
    margin-right: 20px;
    margin-bottom: 5px;
  }
`;

export default StyledAddPolicy;