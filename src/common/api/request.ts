export function* post(endpoint, data) {
    const response = yield fetch(
        `${process.env.BASE_API}${endpoint}`,
        {
            method: 'post',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        },
    );

    return response;
}