import {
    FIELD_DEFAULT_COLOR,
    FIELD_VALID_COLOR,
    FIELD_INVALID_COLOR,
} from 'src/common/constants/palette';

export function getValidationColor(isValid: boolean, isInvalid: boolean, defaultColor?: string) {
    if (isValid) {
        return getValidColor();
    } else if (isInvalid) {
        return getInvalidColor();
    }

    return defaultColor || FIELD_DEFAULT_COLOR;
}

export function getInvalidColor() {
    return FIELD_INVALID_COLOR;
}

export function getValidColor() {
    return FIELD_VALID_COLOR;
}
