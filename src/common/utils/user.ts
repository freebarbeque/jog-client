import {ISignUpFormValues} from "~/common/interfaces/user";

export function mapSignUpFormValuesToUser(values: ISignUpFormValues) {
    const {name, ...user} = values;
    const names = name.split(' ');
    const first_name = names[0];
    const last_name = names.slice(1).join(' ');
    return {
        ...user,
        first_name,
        last_name,
    }
}