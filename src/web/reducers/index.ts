import { initReducer } from '../../common/store/reducer';
import { routerReducer } from 'react-router-redux';
import page from './page';

export default initReducer({
    router: routerReducer,
    page,
});
