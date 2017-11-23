export function getQueryString(data: any) {
    const searchParams = new URLSearchParams(JSON.stringify(data));
    return searchParams.toString();
}