import * as React from 'react';
import styledForm from '~/web/screens/UserDetails/components/styledForm';

interface IAddressProps {
    className: string;
}

const Address = (props: IAddressProps) => {
    return (
        <div className={props.className}>111</div>
    )
}

export default styledForm(Address);