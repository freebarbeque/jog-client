export function* lookupPostCode(postCode: string) {
    const response = yield fetch(`${process.env.IDEAL_POST_CODES_API}postcodes/${postCode}?api_key=${process.env.IDEAL_POST_CODES_API_KEY}`);
    const body = yield response.json();
    return body;
}