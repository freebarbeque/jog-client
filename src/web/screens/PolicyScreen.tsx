import { FlatButton } from 'material-ui'
import * as React from 'react'
import { connect, DispatchProp } from 'react-redux'
import { NavLink, Route, Switch } from 'react-router-dom'
import { push } from 'react-router-redux'
import styled from 'styled-components'

import { RouteComponentProps, withRouter } from 'react-router'
import { BLUE, DARK_GRAY, PINK } from '../../common/constants/palette'
import { Action, Dispatch } from '../../common/types'
import BackgroundHeader from '../components/BackgroundHeader'
import PolicyDetailsScreen from './PolicyDetailsScreen'
import PolicyDocumentsScreen from './PolicyDocumentsScreen'

// language=SCSS prefix=dummy{ suffix=}
const Menu = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 79px;
`

// language=SCSS prefix=dummy{ suffix=}
const MenuButton = styled(FlatButton).attrs({ className: 'MenuButton' })`
  flex: 1;
  height: 100% !important;
  color: ${DARK_GRAY} !important;
  
  >div {
    height: 100% !important;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  &.active {
    border-bottom-color: ${PINK} !important;
    border-bottom-width: 2px !important;
    border-bottom-style: solid !important;
    color: ${BLUE} !important;
    font-weight: 700 !important;
  }
`

class PolicyScreen extends React.Component<
  RouteComponentProps<any> & DispatchProp<Action>
> {
  public render() {
    const match = this.props.match
    const policyId = match.params.policyId
    return (
      <div>
        <BackgroundHeader
          headerText="Motor Policy"
          backText="Back to Policies"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }}
          onPress={() => this.props.dispatch(push('/app/tabs/policies'))}
        />
        <Menu>
          <MenuButton
            containerElement={
              <NavLink to={`/app/tabs/policies/${policyId}`} exact />
            }
          >
            Details
          </MenuButton>
          <MenuButton
            containerElement={
              <NavLink to={`/app/tabs/policies/${policyId}/documents`} />
            }
          >
            Documents
          </MenuButton>
        </Menu>
        <Switch>
          <Route
            path="/app/tabs/policies/:policyId"
            component={PolicyDetailsScreen}
            exact
          />
          <Route
            path="/app/tabs/policies/:policyId/documents"
            component={PolicyDocumentsScreen}
          />
        </Switch>
      </div>
    )
  }
}

export default connect()(withRouter(PolicyScreen))
