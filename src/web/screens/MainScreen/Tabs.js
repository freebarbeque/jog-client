import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import styled from 'styled-components'
import { Tabs, Tab } from 'material-ui/Tabs'

import PoliciesTab from './PoliciesTab'
import SettingsTab from './SettingsTab'

import { CREAM } from '../../../common/constants/palette'

const TABS = ['policies', 'settings']

// language=SCSS prefix=dummy{ suffix=}
const Container = styled.div`
  background-color: ${CREAM};
  flex: 1;
  display: flex;
  flex-direction: column;
  
  .react-swipeable-view-container {
    height: 100%; 
  }
`

class TabsScreen extends Component {
  handleChangeIndex = index => {
    this.props.history.push(`/app/${TABS[index]}`)
  }

  render() {
    const pathname = this.props.location.pathname

    const screen = pathname.split('/')[2]
    const index = TABS.indexOf(screen)

    return (
      <Container className="tabs-container">
        <Tabs value={screen}>
          <Tab
            value="policies"
            label="Policies"
            containerElement={<Link to="/app/policies" />}
          />

          <Tab
            value="settings"
            label="Settings"
            containerElement={<Link to="/app/settings" />}
          />
        </Tabs>
        <SwipeableViews
          className="color-blue m"
          index={index}
          onChangeIndex={this.handleChangeIndex}
          enableMouseEvents
          style={{ flex: 1 }}
        >
          <PoliciesTab />
          <SettingsTab />
        </SwipeableViews>
      </Container>
    )
  }
}

export default withRouter(TabsScreen)
