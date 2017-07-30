import * as React from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Tabs, Tab } from 'material-ui/Tabs'

import PoliciesTab from './PoliciesTab'
import SettingsScreen from '../SettingsScreen'
import MarketsScreen from '../markets/MarketsScreen'

import { CREAM } from '../../../common/constants/palette'
import { min } from '../../media'
import { RouteComponentProps } from 'react-router'

const TABS = ['policies', 'markets', 'settings']

const SwipeableViews = require('react-swipeable-views')

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

// language=SCSS prefix=dummy{ suffix=}
const MobileTabs = styled(Tabs)`
  ${min.largeTablet`
    display: none;
  `}
`

interface ConnectedProps {}
interface Props extends ConnectedProps, RouteComponentProps<any> {}

class TabsScreen extends React.Component<Props> {
  handleChangeIndex = index => {
    const history = this.props.history
    history.push(`/app/tabs/${TABS[index]}`)
  }

  render() {
    const location = this.props.location
    const pathname = location.pathname

    const screen = pathname.split('/')[3]
    const index = TABS.indexOf(screen)

    return (
      <Container className="tabs-container">
        <MobileTabs value={screen}>
          <Tab
            value="policies"
            label="Policies"
            containerElement={<Link to="/app/tabs/policies" />}
          />

          <Tab
            value="markets"
            label="Markets"
            containerElement={<Link to="/app/tabs/markets" />}
          />

          <Tab
            value="settings"
            label="Settings"
            containerElement={<Link to="/app/tabs/settings" />}
          />
        </MobileTabs>
        <SwipeableViews
          className="color-blue m"
          index={index}
          onChangeIndex={this.handleChangeIndex}
          enableMouseEvents
          style={{ flex: 1 }}
        >
          <Route path="/app/tabs/policies" component={PoliciesTab} />
          <Route path="/app/tabs/markets" component={MarketsScreen} />
          <Route path="/app/tabs/settings" component={SettingsScreen} />
        </SwipeableViews>
      </Container>
    )
  }
}

const ConnectedTabsScreen: React.ComponentClass<ConnectedProps> = withRouter(
  TabsScreen,
)
export default ConnectedTabsScreen
