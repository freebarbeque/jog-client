function authToken() {
    const identifier = 'auth_token';

    return {
        set: token => localStorage.setItem(identifier, token),
        get: () => localStorage.getItem(identifier),
        clean: () => localStorage.removeItem(identifier),
    }
}

export default authToken();
