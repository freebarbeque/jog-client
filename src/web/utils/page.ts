import {IAction} from '../../common/interfaces/action';
import {GO_TO_NEXT_STEP, GO_TO_PREV_STEP} from '../constants/page';

export const isChangeStepAction = (action: IAction) => action.type === GO_TO_NEXT_STEP || action.type === GO_TO_PREV_STEP;