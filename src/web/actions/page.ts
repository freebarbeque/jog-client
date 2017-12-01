import {
    CLOSE_MODAL,
    OPEN_MODAL,
    GO_TO_NEXT_STEP,
    GO_TO_PREV_STEP,
    CLEAR_STEP,
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

export function goToPrevStep() {
    return {
        type: GO_TO_PREV_STEP,
    }
}

export function clearStep() {
    return {
        type: CLEAR_STEP,
    }
}