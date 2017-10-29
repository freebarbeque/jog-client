import TabNavigation from './components/YourQuotesTabs';

export default (state: any, action: {type: string, payload?:any}) => {

    switch (action.type) {
        default:
            return TabNavigation.router.getStateForAction(action, state);
    }
};