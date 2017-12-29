export function onlyNumber (value: string) {
    return !/\D/.test(value);
}

export function onlyDecimal (value: string) {
    return /^$|^[0-9]+(\.([0-9]{1,2})?)?$/.test(value);
}
