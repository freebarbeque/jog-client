export function isSecureRoute(url: string) {
    return /app/.test(url);
}

export function isNotSecureRoute(url: string) {
    return !isSecureRoute(url);
}