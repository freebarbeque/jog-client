import * as React from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';

import {styledComponentWithProps} from 'src/common/utils/types';
import {BLUE, DASHBOARD_INACTIVE_LINK_COLOR, PINK} from 'src/common/constants/palette';

class Tabs extends React.PureComponent<any, any> {
    getTabRoute = tab => `${this.props.baseLocation}/${tab.id}`;
    isActiveTab = tab => this.props.currentLocation.includes(this.getTabRoute(tab));

    render() {
        return (
            <TabsWrapper>
                {this.props.tabs.map(tab => (
                    <Tab key={tab.id} active={this.isActiveTab(tab)} onClick={() => this.props.push(this.getTabRoute(tab))}>
                        {tab.title}
                    </Tab>
                ))}
            </TabsWrapper>
        )
    }
}

const button = styledComponentWithProps<any, HTMLButtonElement>(styled.button);

const TabsWrapper = styled.div`
    display: flex;
    background-color: ${BLUE};
    padding: 0 43px;
    flex-shrink: 0;
`;

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
  cursor: ${props => props.disabled ? 'arrow' : 'pointer'};
  color: ${DASHBOARD_INACTIVE_LINK_COLOR};
  transition: border-color 0.3s ease-in-out; 
`;

const mapDispatchToProps = (dispatch: any): any => bindActionCreators({
    push,
}, dispatch);

export default connect(null, mapDispatchToProps)(Tabs) as any;
