const validate = require('validate.js');

const validationSchema = {
    full_name: {
        presence: {
            message: 'Please enter your full name',
        },
        format: {
            pattern: `^[a-zA-Z]+[" "][a-zA-Z]+$`,
            message: 'Please enter first name and last name'
        }
    },
    email: {
        presence: {
            message: 'Please enter a valid email address',
        },
        email: {
            message: 'Please enter a valid email address',
        },
    },
    password: {
        presence: {
            message: 'Must be at least 8 characters long',
        },
        length: {
            minimum: 8,
            tooShort: 'Must be at least 8 characters long',
        },
    }
};

export const validateForm = values => validate(values, validationSchema, {fullMessages: false});
