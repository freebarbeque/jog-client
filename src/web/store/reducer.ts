import { initReducer } from '../../common/store/reducer';
import { routerReducer } from 'react-router-redux';

export default initReducer({
    router: routerReducer,
});
