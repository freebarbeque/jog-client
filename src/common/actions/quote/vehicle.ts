import {
    REFRESH_VRM_REQUEST,
    REFRESH_VRM_STARTED,
    REFRESH_VRM_FINISHED,
    REFRESH_VRM_FAILED,
    SUBMIT_VEHICLE_REQUEST,
} from 'src/common/constants/quote/vehicle';

export function submitQuoteVehicleRequest(vehicle: any, submitDeferred: any) {
    return {
        type: SUBMIT_VEHICLE_REQUEST,
        vehicle,
        submitDeferred,
    }
}

export function refreshQuoteVrmRequest(vrm: string) {
    return {
        type: REFRESH_VRM_REQUEST,
        registrationNumber: vrm,
    }
}

export function refreshRegistrationStarted() {
    return {
        type: REFRESH_VRM_STARTED,
    }
}

export function refreshRegistrationFinished() {
    return {
        type: REFRESH_VRM_FINISHED,
    }
}

export function refreshRegistrationFailed(error: any) {
    return {
        type: REFRESH_VRM_FAILED,
        error,
    }
}
