export function isSecureRoute(url: string) {
    return /app/.test(url);
}

export function isUnsecureRoute(url: string) {
    return !isSecureRoute(url);
}