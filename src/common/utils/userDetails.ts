import {IDriverDetailsFormValues} from '../interfaces/drivers';
import {IVehicle, IVehicleDetailsFormValues} from '../interfaces/vehicles';
const moment = require('moment');
const uuidv1 = require('uuid/v1');
const attributesNames = ['postcode', 'line_1', 'line_2', 'district'];
const city = 'city';
const line1 = 'line1';
const line2 = 'line2';

export function mapAddressBeforeCreateRequest (addressObj: object) {
    let attributes = {};
    attributesNames.map((item) => {
        for (let key in addressObj) {
            if (item === key) {
                switch (key) {
                    case 'district':
                        attributes[city] = addressObj[key];
                        break;

                    case 'line_1':
                        attributes[line1] = addressObj[key];
                        break;

                    case 'line_2':
                        attributes[line2] = addressObj[key];
                        break;

                    default:
                        attributes[key] = addressObj[key];
                }
            }
        }
    })
    return attributes;
}

export function isPostCode (postCode: string) {
    return postCode && postCode
        .toUpperCase()
        .match(
            /^(GIR[ ]?0AA|((AB|AL|B|BA|BB|BD|BH|BL|BN|BR|BS|BT|CA|CB|CF|CH|CM|CO|CR|CT|CV|CW|DA|DD|DE|DG|DH|DL|DN|DT|DY|E|EC|EH|EN|EX|FK|FY|G|GL|GY|GU|HA|HD|HG|HP|HR|HS|HU|HX|IG|IM|IP|IV|JE|KA|KT|KW|KY|L|LA|LD|LE|LL|LN|LS|LU|M|ME|MK|ML|N|NE|NG|NN|NP|NR|NW|OL|OX|PA|PE|PH|PL|PO|PR|RG|RH|RM|S|SA|SE|SG|SK|SL|SM|SN|SO|SP|SR|SS|ST|SW|SY|TA|TD|TF|TN|TQ|TR|TS|TW|UB|W|WA|WC|WD|WF|WN|WR|WS|WV|YO|ZE)(\d[\dA-Z]?[ ]?\d[ABD-HJLN-UW-Z]{2}))|BFPO[ ]?\d{1,4})$/
        ) ? null : 'Please enter a valid post code';
}

export function mapDriverToFormValues(driver: IDriverDetailsFormValues) {
    const {
        ...values,
    } = driver;

    values.date_of_birth = moment(driver.date_of_birth);
    values.uk_resident_since = driver.uk_resident_since ? moment(driver.uk_resident_since) : null;
    values.incidents_claims = !!driver.motoring_incidents_attributes;
    values.motoring_convictions = !!driver.motoring_convictions_attributes;

    return values;
}

export function mapVehicleDetailsFormValues(values: IVehicleDetailsFormValues) {
    const vehicle: IVehicle = {
        id: uuidv1(),
        ...values
    }

    return vehicle;
}