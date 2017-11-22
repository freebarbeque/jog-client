export function onlyNumber (value: string) {
    console.log(value);
    return !/\D/.test(value);
}