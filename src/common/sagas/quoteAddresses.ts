import {fork, put, select, take} from 'redux-saga/effects';
import {initialize} from 'redux-form';
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {getFormValues, stopSubmit} from 'redux-form';
import {SubmissionError} from 'redux-form';

import * as API from 'src/common/api/addresses';
import {lookupPostCode} from 'src/common/api/idealPostcodes';
import {getUser} from 'src/common/selectors/auth';
import {getQuoteAddresses} from 'src/common/selectors/quoteAddresses';
import {
    LOOKUP_POSTCODE,
    REMOVE_ADDRESS_REQUEST,
    ADD_ADDRESS_REQUEST,
    UPDATE_ADDRESS_REQUEST,
    MOTOR_POLICY_QUOTE_ADDRESS_DETAILS_FORM,
    SELECT_ADDRESS_REQUEST,
} from 'src/common/constants/quoteAddress';
import {updateAddressOnPolicyQuoteRequest} from 'src/common/actions/policyQuoteRequest';
import {setAddresses, addAddress, updateAddress, setLoadingState, removeAddress, setPossibleAddresses} from 'src/common/actions/quoteAddresses';

function* quoteSelectAddressWorker() {
    while (true) {
        const {address} = yield take(SELECT_ADDRESS_REQUEST);
        const currentFormValues = yield select(getFormValues(MOTOR_POLICY_QUOTE_ADDRESS_DETAILS_FORM));

        yield put(initialize(MOTOR_POLICY_QUOTE_ADDRESS_DETAILS_FORM, {...currentFormValues, ...address}));
    }
}

function* quoteGetAddressesWorker() {
    try {
        const storedAddresses = yield select(getQuoteAddresses);

        if (storedAddresses && storedAddresses.length) {
            return;
        }

        yield put(setLoadingState(true));

        let currentUser = yield select(getUser);
        const body = yield API.getAddresses(currentUser.id);

        if (body.addresses) {
            yield put(setAddresses(body.addresses));
        }
    } catch (error) {
        console.log('Log => quoteAddressWorker error: ', error);
    } finally {
        yield put(setLoadingState(false));
    }
}

function* quoteLookupPostcodeWorker() {
    while (true) {
        const {postCode} = yield take(LOOKUP_POSTCODE);

        try {
            const response = yield lookupPostCode(postCode);

            if (response && Array.isArray(response.result)) {
                const parsedResponse = response.result.map(address => ({
                    postcode: address.postcode,
                    city: address.post_town,
                    county: address.county,
                    line1: address.line_1,
                    line2: address.line_2,
                }));

                yield put(setPossibleAddresses(parsedResponse));
            }
        } catch (err) {
            console.log('Log => quoteLookupPostcodeWorker error: ', err);
        }
    }
}

function* quoteDeleteAddressWorker(currentUser: any) {
    while (true) {
        try {
            const {id} = yield take(REMOVE_ADDRESS_REQUEST);
            yield API.removeAddress(currentUser.id, id);
            yield put(removeAddress(id));
        } catch (err) {
            console.log('Log => quoteDeleteAddressWorker error: ', err);
        }
    }
}

function* quoteCreateAddressWorker(policyId: string|number, currentUser: any) {
    while (true) {
        try {
            const {address} = yield take(ADD_ADDRESS_REQUEST);

            const data = {
                nickname: address.nickname,
                city: address.city,
                line1: address.line1,
                line2: address.line2,
                county: address.county,
                postcode: address.postcode,
            };

            const { address: createdAddress, errors } = yield API.createAddress(currentUser.id, data);

            if (errors) {
                yield put(stopSubmit(MOTOR_POLICY_QUOTE_ADDRESS_DETAILS_FORM, { ...errors }));
            } else {
                yield put(addAddress(createdAddress));
                yield put(updateAddressOnPolicyQuoteRequest(policyId, createdAddress));
                yield put(push(`/app/dashboard/motor/${policyId}/quote`));
            }
        } catch (err) {
            console.log('Log => quoteCreateAddressWorker error: ', err);
        }
    }
}

function* quoteUpdateAddressWorker(policyId: string|number, currentUser: any) {
    while (true) {
        try {
            const {address, id: addressId, submitDeferred} = yield take(UPDATE_ADDRESS_REQUEST);

            const data = {
                nickname: address.nickname,
                city: address.city,
                line1: address.line1,
                line2: address.line2,
                county: address.county,
                postcode: address.postcode,
            };

            const { address: updatedAddress, errors } = yield API.updateAddress(currentUser.id, addressId, data);

            if (errors) {
                submitDeferred.reject({ validationErrors: errors });
                // yield put(stopSubmit(MOTOR_POLICY_QUOTE_ADDRESS_DETAILS_FORM, { ...errors }));
            } else {
                submitDeferred.resolve();

                yield put(updateAddress(addressId, updatedAddress));
                yield put(updateAddressOnPolicyQuoteRequest(policyId, address));
                yield put(push(`/app/dashboard/motor/${policyId}/quote`));
            }
        } catch (err) {
            console.log('Log => quoteUpdateAddressWorker error: ', err);
        }
    }
}

export function* quoteAddressWorker(policyId: number|string) {
    let currentUser = yield select(getUser);

    yield fork(quoteLookupPostcodeWorker);
    yield fork(quoteSelectAddressWorker);
    yield fork(quoteGetAddressesWorker);
    yield fork(quoteDeleteAddressWorker, currentUser);
    yield fork(quoteCreateAddressWorker, policyId, currentUser);
    yield fork(quoteUpdateAddressWorker, policyId, currentUser);
}
