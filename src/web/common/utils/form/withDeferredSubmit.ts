import {SubmissionError} from 'redux-form';

class Deferred {
    public promise;
    public reject;
    public resolve;

    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.reject = reject;
            this.resolve = resolve;
        })
    }
}

export const withDeferredSubmit = async (fn, ...args) => {
    const deferred = new Deferred();

    try {
        fn.apply(null, [...args, deferred]);
        await deferred.promise;
    } catch (error) {
        if (error.validationErrors) {
            throw new SubmissionError({ ...error.validationErrors });
        }
    }
};