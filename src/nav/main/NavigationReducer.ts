import { MainNavNavigator } from "./NavigationConfiguration"
import { NavigationActions } from 'react-navigation';

export default (state, action) => {
    let nextState;

    switch (action.type) {

        case "GO":
            nextState = MainNavNavigator.router.getStateForAction(NavigationActions.navigate({routeName:'Home'}), state);
            break;

        default:
            nextState = MainNavNavigator.router.getStateForAction(action, state);
            break;
    }

    return nextState || state;
};