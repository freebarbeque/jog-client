import {
    REFRESH_VRM_STARTED,
    REFRESH_VRM_FINISHED,
    REFRESH_VRM_FAILED,
} from 'src/common/constants/quote/vehicle';

const initialState = {
    isFormUpdating: false,
    error: null,
};

export default function (state: any = initialState, action: any) {
    switch (action.type) {
        case REFRESH_VRM_STARTED:
            return {
                ...state,
                isFormUpdating: true,
            };

        case REFRESH_VRM_FINISHED:
            return {
                ...state,
                error: null,
                isFormUpdating: false,
            };

        case REFRESH_VRM_FAILED:
            return {
                ...state,
                error: action.error,
                isFormUpdating: false,
            };

        default:
            return state;
    }
}