const fragment = {
    isLoading: false,
    error: null,
};

export default function createFragment(name: string = 'data') {
    return {
        fetching: () => ({
            ...fragment,
            isLoading: true,
            [name]: null,
        }),
        fetched: elem => ({
            ...fragment,
            [name]: elem,
        }),
        failed: error => ({
            ...fragment,
            [name]: null,
            error,
        }),
    }
}