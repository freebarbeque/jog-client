import TabNavigation from './components/TabNavigation';

const initialState = {
    index: 0,
    routes: [
        { key: 'InitA', routeName: 'Overview' },
        { key: 'InitB', routeName: 'Documents' },
        { key: 'InitC', routeName: 'Quote' },
    ],
};

export default (state = initialState, action: any = {}) => {
    
    switch (action.type) {
        default:
            return Object.assign({}, TabNavigation.router.getStateForAction(action, state))
    }
};