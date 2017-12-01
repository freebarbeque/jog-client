import * as React from 'react';
import styledForm from '~/web/screens/UserDetails/components/styledForm';
import FieldTitle from '../FieldTitle';
import PrepopulatedField from '../PrepopulatedField';
import {connect} from 'react-redux';
import {IReduxState} from '~/common/interfaces/store';
import {IAddress} from '~/common/interfaces/userDetails';
import {getAddress} from '~/common/selectors/userDetils';

interface IAddressProps {
    className: string;
    address: IAddress;
}

const Address = (props: IAddressProps) => {
    const {
        address: {
            post_town,
            line_1,
            line_2,
        },
    } = props;

    return (
        <div className={props.className}>
            <FieldTitle>City</FieldTitle>
            <PrepopulatedField value={`${post_town.slice(0, 1)}${post_town.slice(1).toLocaleLowerCase()}`}/>
            <FieldTitle>Line 1</FieldTitle>
            <PrepopulatedField value={line_1}/>
            <FieldTitle>Line 2</FieldTitle>
            <PrepopulatedField value={line_2}/>
        </div>
    )
}

const mapStateToProps = (state: IReduxState): Partial<IAddressProps> => ({
    address: getAddress(state),
})

export default connect(mapStateToProps, null)(styledForm(Address));