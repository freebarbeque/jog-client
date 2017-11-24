import {IPageReduxState} from '~/web/interfaces/store';
import {IAction} from '~/common/interfaces/action';
import {CLOSE_MODAL, OPEN_MODAL} from '~/web/constants/page';

const defaultState = {
    modals: [],
}

export default (state: IPageReduxState = defaultState, action: IAction) => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                ...state,
                modals: state.modals.find(m => m === action.modal) ? state.modals : state.modals.concat(action.modal),
            }
        }

        case CLOSE_MODAL: {
            return {
                ...state,
                modals: state.modals.filter(m => m !== action.modal),
            }
        }

        default: {
            return state;
        }
    }
}