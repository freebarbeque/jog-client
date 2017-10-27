import { MainNavNavigator } from "./NavigationConfiguration"
import { NavigationActions } from 'react-navigation';

export default (state, action) => {
    let nextState;

    switch (action.type) {

        default:
            nextState = MainNavNavigator.router.getStateForAction(action, state);
            break;
    }

    return nextState || state;
};