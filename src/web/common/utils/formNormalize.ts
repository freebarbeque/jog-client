export function onlyNumber (value: string, previousValue: string) {
    return !/\D/.test(value) ? value : previousValue;
}

export function onlyDecimal (value: string, previousValue: string) {
    return /^$|^[0-9]+(\.([0-9]{1,2})?)?$/.test(value) ? value : previousValue;
}
