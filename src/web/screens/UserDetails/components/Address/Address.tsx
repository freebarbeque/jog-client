import * as React from 'react';
import styledForm from '~/web/screens/UserDetails/components/styledForm';
import FieldTitle from '../FieldTitle';
import PrepopulatedField from '../PrepopulatedField';
import {connect} from 'react-redux';
import {IReduxState} from '~/common/interfaces/store';
import {IAddress} from '~/common/interfaces/userDetails';
import {getAddress} from '~/common/selectors/userDetils';
import styled from 'styled-components';
import RoundedButton from 'src/web/components/RoundedButton';

interface IAddressProps {
    className: string;
    address: IAddress;
}

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
`

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
            <ButtonsContainer>
                <RoundedButton
                    label="Back"
                    disabled={false}
                    style={{
                        marginRight: 20,
                        width: 200,
                    }}
                />
                <RoundedButton
                    label="Submit Address"
                    disabled={false}
                    style={{
                        width: 200,
                    }}
                />
            </ButtonsContainer>
        </div>
    )
}

const mapStateToProps = (state: IReduxState): Partial<IAddressProps> => ({
    address: getAddress(state),
})

export default connect(mapStateToProps, null)(styledForm(Address));