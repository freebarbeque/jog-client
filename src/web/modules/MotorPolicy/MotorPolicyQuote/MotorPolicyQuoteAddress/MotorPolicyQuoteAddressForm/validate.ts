const validate = require('validate.js');

const postCodeValidator = (postcode) => {
    if (!isPostCode(postcode)) {
        return 'Please enter a valid post code';
    }
};

validate.validators.postCodeValidator = postCodeValidator;

const validationSchema = {
    postcode: {
        postCodeValidator,
    },
    line1: {
        presence: {
            message: '* Required Field',
            allowEmpty: false,
        },
    },
    city: {
        presence: {
            message: '* Required Field',
            allowEmpty: false,
        },
    },
    county: {
        presence: {
            message: '* Required Field',
            allowEmpty: false,
        },
    },
};

export const validateForm = (values: any) => {
    const errors = validate(values, validationSchema, {fullMessages: false});
    return errors;
};

export function isPostCode (postCode: string) {
    return postCode && !!postCode
            .toUpperCase()
            .match(
                /^(GIR[ ]?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}))|BFPO[ ]?\d{1,4})$/
            );
}