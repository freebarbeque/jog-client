import {
    CLOSE_MODAL,
    OPEN_MODAL,
    GO_TO_NEXT_STEP,
} from '../constants/page';

export function openModal(modal: string) {
    return {
        type: OPEN_MODAL,
        modal,
    }
}

export function closeModal(modal: string) {
    return {
        type: CLOSE_MODAL,
        modal,
    }
}

export function goToNextStep() {
    return {
        type: GO_TO_NEXT_STEP,
    }
}