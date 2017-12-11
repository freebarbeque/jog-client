import * as React from 'react';
import styledForm from '~/web/screens/UserDetails/components/styledForm';
import FieldTitle from '../FieldTitle';
import PrepopulatedField from '../PrepopulatedField';
import {connect} from 'react-redux';
import {IReduxState} from '~/common/interfaces/store';
import {IAddress} from '~/common/interfaces/userDetails';
import {getAddress, getIsLoading, getAddressSubmitError} from '~/common/selectors/userDetils';
import styled from 'styled-components';
import RoundedButton from 'src/web/components/RoundedButton';
import {submitAddress, cancelSubmitAddress} from 'src/common/actions/userDetails';
import {Action, ActionCreator, bindActionCreators} from 'redux';
import ErrorText from '~/web/components/Forms/ErrorText'
import { getFormError } from '~/common/selectors/form';

interface IAddressProps {
    className: string;
    address: IAddress|null;
    cancelSubmitAddress: ActionCreator<Action>;
    submitAddress: ActionCreator<Action>;
    isLoading: boolean;
    addressSubmitError: string|null;
}

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
`

const Address = (props: IAddressProps) => {
    const {
        address
    } = props;

    return (
        <div className={props.className}>
            <FieldTitle>City</FieldTitle>
            <PrepopulatedField value={`${address && address.post_town.slice(0, 1)}${address && address.post_town.slice(1).toLocaleLowerCase()}`}/>
            <FieldTitle>Line 1</FieldTitle>
            <PrepopulatedField value={address && address.line_1}/>
            <FieldTitle>Line 2</FieldTitle>
            <PrepopulatedField value={address && address.line_2}/>
            <ErrorText>{props.addressSubmitError}</ErrorText>
            <ButtonsContainer>
                <RoundedButton
                    label="Back"
                    disabled={props.isLoading}
                    style={{
                        marginRight: 20,
                        width: 200,
                    }}
                    onClick={() => props.cancelSubmitAddress()}
                />
                <RoundedButton
                    label="Submit Address"
                    disabled={props.isLoading}
                    style={{
                        width: 200,
                    }}
                    onClick={() => props.submitAddress()}
                />
            </ButtonsContainer>
        </div>
    )
}

const mapStateToProps = (state: IReduxState): Partial<IAddressProps> => ({
    address: getAddress(state),
    addressSubmitError: getAddressSubmitError(state),
    isLoading: getIsLoading(state),
})

const mapDispatchToProps = (dispatch: any): Partial<IAddressProps> => bindActionCreators({
    cancelSubmitAddress,
    submitAddress,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(styledForm(Address)); //styledForm(Address));