import {ISignUpFormValues} from '../interfaces/user';

export function mapSignUpFormValuesToUser(values: ISignUpFormValues) {
    const {name, ...user} = values;
    const names = name.split(' ');
    const firstName = names[0];
    const lastName = names.slice(1).join(' ');
    return {
        ...user,
        first_name: firstName,
        last_name: lastName,
    }
}