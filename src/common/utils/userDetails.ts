import {IDriverDetailsFormValues, IStoredDriver} from '../interfaces/drivers';
const moment = require('moment');
const uuidv1 = require('uuid/v1');

export function isPostCode (postCode: string) {
    return postCode && postCode
        .toUpperCase()
        .match(
            /^(GIR[ ]?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}))|BFPO[ ]?\d{1,4})$/
        ) ? null : 'Please enter a valid post code';
}

export function mapDriverDetailsFormValues(values: IDriverDetailsFormValues) {
    const {
        driver_selected,
        ...driverValues,
    } = values;

    driverValues.id = uuidv1(); // todo: remove when integrated with the API

    return driverValues;
}

export function mapDriverToFormValues(driver: IStoredDriver) {
    const {
        id,
        ...values,
    } = driver;

    values.date_of_birth = moment(driver.date_of_birth);
    values.uk_resident_since = moment(driver.uk_resident_since);
    values.incident_date = moment(driver.incident_date);
    values.conviction_date = moment(driver.incident_date);

    return values;
}