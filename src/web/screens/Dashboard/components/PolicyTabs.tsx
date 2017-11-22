import * as React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {bindActionCreators, ActionCreator, Action} from 'redux';
import {push} from 'react-router-redux';
import {BLUE, DASHBOARD_INACTIVE_LINK_COLOR, PINK} from 'src/common/constants/palette';
import {styledComponentWithProps} from 'src/common/utils/types';
import {tabs} from 'src/common/constants/dashboard';
import {getLastPathName, getBaseUrlForTabs} from 'src/common/selectors/dashboard';

interface IPolicyTabsProps {
  className?: string;
  lastPath?: string;
  baseUrl?: string;
  push?: any;
}

interface ITabProps {
  active?: boolean;
  onClick?: any;
}

const PolicyTabs: React.StatelessComponent<IPolicyTabsProps> = (props) => (
  <div className={props.className}>
    {tabs.map((t, i) => (
      <Tab
        active={props.lastPath === t.link}
        onClick={() => props.push(`${props.baseUrl}${t.link}`)}
        key={i}
      >
        {t.title}
      </Tab>
    ))}
  </div>
);

const StyledPolicyTabs = styled(PolicyTabs)`
  display: flex;
  background-color: ${BLUE};
  padding: 0 43px;
  flex-shrink: 0;
`;

const button = styledComponentWithProps<ITabProps, HTMLButtonElement>(styled.button);

const Tab = button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: transparent;
  border: none;
  border-radius: 0;
  border-bottom: 4px solid ${props => props.active ? PINK : 'transparent'};
  outline: none;
  height: 57px;
  font-size: 16px;
  line-height: 17px;
  cursor: pointer;
  color: ${DASHBOARD_INACTIVE_LINK_COLOR};
  transition: border-color 0.3s ease-in-out; 
`;

const mapStateToProps = (state: any): any => ({
  lastPath: getLastPathName(state),
  baseUrl: getBaseUrlForTabs(state),
});

const mapDispatchToProps = (dispatch: any): any => bindActionCreators({
  push,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StyledPolicyTabs);