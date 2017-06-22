import React, { Component } from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views'
import styled from 'styled-components'
import { Tabs, Tab } from 'material-ui/Tabs'

import PoliciesTab from './PoliciesTab'
import SettingsScreen from '../SettingsScreen'

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
    this.props.history.push(`/app/tabs/${TABS[index]}`)
  }

  render() {
    const pathname = this.props.location.pathname

    const screen = pathname.split('/')[3]
    const index = TABS.indexOf(screen)

    return (
      <Container className="tabs-container">
        <Tabs value={screen}>
          <Tab
            value="policies"
            label="Policies"
            containerElement={<Link to="/app/tabs/policies" />}
          />

          <Tab
            value="settings"
            label="Settings"
            containerElement={<Link to="/app/tabs/settings" />}
          />
        </Tabs>
        <SwipeableViews
          className="color-blue m"
          index={index}
          onChangeIndex={this.handleChangeIndex}
          enableMouseEvents
          style={{ flex: 1 }}
        >
          <Route path="/app/tabs/policies" component={PoliciesTab} />
          <Route path="/app/tabs/settings" component={SettingsScreen} />
        </SwipeableViews>
      </Container>
    )
  }
}

export default withRouter(TabsScreen)
