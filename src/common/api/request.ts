/*export function* post(endpoint, data) {
    const response = yield fetch(
        `${process.env.BASE_API}${endpoint}`,
        {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/json',
            }),
            body: JSON.stringify(data),
            mode: 'no-cors',
        },
    );

    return response;
}*/

export function* post(endpoint) {
    const response = yield fetch(
        `${process.env.BASE_API}${endpoint}`,
        {
            method: 'POST',
        }
    )

    const body = yield response.json();
    return body;
}