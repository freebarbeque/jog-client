import * as React from 'react';
import styledForm from '~/web/screens/UserDetails/components/styledForm';
import FieldTitle from '../FieldTitle';
import PrepopulatedField from '../PrepopulatedField';

interface IAddressProps {
    className: string;
}

const Address = (props: IAddressProps) => {
    return (
        <div className={props.className}>
            <FieldTitle>City</FieldTitle>
            <PrepopulatedField value={1}/>
        </div>
    )
}

export default styledForm(Address);