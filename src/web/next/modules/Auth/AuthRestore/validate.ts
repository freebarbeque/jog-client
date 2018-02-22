const validate = require('validate.js');

const validationSchema = {
    email: {
        presence: {
            message: 'Please enter a valid email address',
        },
        email: {
            message: 'Please enter a valid email address',
        },
    },
};

export const validateForm = values => validate(values, validationSchema, {fullMessages: false});
