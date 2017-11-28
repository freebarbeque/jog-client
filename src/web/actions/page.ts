import {CLOSE_MODAL, OPEN_MODAL} from '../constants/page';

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