import { NavigationActions } from 'react-navigation';

import { MainNavNavigator } from "./NavigationConfiguration";
import { CAR_QUESTIONS_ROUTE } from './routes';
import { GOTO_ACTION } from '../../cfg/actions';

export default (state, action) => {
    switch (action.type) {
        case GOTO_ACTION:
            return MainNavNavigator.router.getStateForAction(NavigationActions.navigate({routeName: CAR_QUESTIONS_ROUTE}), state);
        default:
            return MainNavNavigator.router.getStateForAction(action, state); 
    }
};