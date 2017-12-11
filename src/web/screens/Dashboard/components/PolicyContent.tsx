import * as React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import {push} from 'react-router-redux';
import PolicyButton from './PolicyButton';
import {PolicyCar, PolicyHome, PolicyTravel, PolicyWarranties} from 'src/web/images';

interface IPolicyContent {
  className?: string;
  push: ActionCreator<Action>;
  match: any;
}

const PolicyContent = (props: IPolicyContent) => (
  <div className={props.className}>
    <PolicyButton icon={<PolicyCar />} title="Motor" onClick={() => props.push(`${props.match.url}/motor`)}/>
    <PolicyButton icon={<PolicyHome />} disabled title="Home & Contents" />
    <PolicyButton icon={<PolicyTravel />} disabled title="Travel" />
    <PolicyButton icon={<PolicyWarranties />} disabled title="Warranties" />
  </div>
);

const StyledPolicyContent = styled(PolicyContent)`
  display: flex;
  flex-wrap: wrap;
  align-self: stretch;
  align-content: flex-start;
  flex: 1;
  width: 70%;
  margin: 0 auto;
  padding: 56px 22px 146px 42px;
  & ${PolicyButton} {
    margin-right: 20px;
    margin-bottom: 5px;
  }
`;

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  push,
}, dispatch);

export default connect(null, mapDispatchToProps)(StyledPolicyContent);