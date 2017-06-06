import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class FadeRoute extends Component {
  render() {
    return (
      <Route
        render={({ location }) =>
          <ReactCSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={this.props.transitionEnterTimeout}
            transitionLeaveTimeout={this.props.transitionLeaveTimeout}
          >
            <Route location={location} key={location.key} {...this.props} />
          </ReactCSSTransitionGroup>}
      />
    )
  }
}

FadeRoute.propTypes = {
  ...Route.propTypes,
  transitionEnterTimeout: PropTypes.number,
  transitionLeaveTimeout: PropTypes.number,
}

FadeRoute.defaultProps = {
  ...Route.defaultProps,
  transitionEnterTimeout: 300,
  transitionLeaveTimeout: 300,
}

export default FadeRoute
