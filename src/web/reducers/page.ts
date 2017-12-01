import {IPageReduxState} from '~/web/interfaces/store';
import {IAction} from '~/common/interfaces/action';
import {
    CLOSE_MODAL,
    OPEN_MODAL,
    GO_TO_NEXT_STEP,
    GO_TO_PREV_STEP,
    CLEAR_STEP, SET_STEPS,
} from '~/web/constants/page';

const defaultState = {
    modals: [],
    steps: [],
    currentStep: 1,
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

        case GO_TO_NEXT_STEP: {
            return {
                ...state,
                currentStep: state.currentStep + 1,
            }
        }

        case GO_TO_PREV_STEP: {
            return {
                ...state,
                currentStep: state.currentStep - 1,
            }
        }

        case CLEAR_STEP: {
            return {
                ...state,
                currentStep: 1,
            }
        }

        case SET_STEPS: {
            return {
                ...state,
                steps: action.steps,
            }
        }

        default: {
            return state;
        }
    }
}