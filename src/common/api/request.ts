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

interface IApiError extends Error {
    status?: number;
}

function* handleErrors (response: any, parseBody: boolean = true) {
    console.log(response.headers.get('Authorization'));

    if (response.status === 200) {
        if (parseBody) {
            return yield response.json();
        } else {
            return null;
        }
    } else {
        let error = yield response.text();
        if (error[0] === '{') {
            error = JSON.parse(error).errors[0].body;
        }

        const err: IApiError = new Error(error);
        err.status = response.status;
        throw err;
    }
}

export function* post(endpoint: string, parseBody: boolean = true) {
    const response = yield fetch(
        `${process.env.BASE_API}${endpoint}`,
        {
            method: 'POST',
        }
    )

    const body = yield handleErrors(response, parseBody);
    return body;
}