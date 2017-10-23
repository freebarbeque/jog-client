import * as React from 'react';
import { addNavigationHelpers } from 'react-navigation'
import { MainNavNavigator } from "./NavigationConfiguration"
import { connect } from 'react-redux';
import { compose } from 'recompose';


const mapStateToProps = (state) => {
    return {
        nav: state.mainNav,
    }
}

const MainNavComponent = ({dispatch, nav}) => <MainNavNavigator navigation={addNavigationHelpers({dispatch: dispatch, state: nav})}/>

export default compose(
    connect(mapStateToProps)
)(MainNavComponent);