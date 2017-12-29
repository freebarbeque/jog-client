import {mapAddressBeforeCreateRequest} from '../../utils/userDetails';

const {cancel, fork, put, race, select, take} = require('redux-saga/effects');
import {getCurrentStep} from '../../../web/selectors/page';
import {LOCATION_CHANGE, push} from 'react-router-redux';
import {
    LOOKUP_POSTCODE, POSTCODE_FORM, SUBMIT_ADDRESS, CANCEL_SUBMIT_ADDRESS, SET_ADDRESS_SUBMIT_ERROR,
    CREATE_ADDRESS
} from '../../constants/userDetails';
import {lookupPostCode} from '../../api/idealPostcodes';
import {stopSubmit} from 'redux-form';
import {setAddress, setIsLoading, setAddressSubmitError, deletePostCode} from '../../actions/userDetails';
import {setAddressToPolicyQuote} from '../../actions/quotePolicy';
import {clearStep, goToNextStep, goToPrevStep, setSteps} from '../../../web/actions/page';
import {isChangeStepAction} from '../../../web/utils/page';
import {createAddress} from '../../api/address';
import {getUser, getUserAddressId} from '../../selectors/auth';
import {getAddress, getPostCode, getAddressSubmitError} from '../../selectors/userDetils';
import {getPolicyQuote} from '../../selectors/policyQoute';

function* postcodeFlow() {
    while (true) {
        const {postCode} = yield take(LOOKUP_POSTCODE);

        yield put(setIsLoading(true));
        try {
            const address = yield lookupPostCode(postCode);
            if (address.code === 2000) {
                yield put(setAddress(address.result[0]));
                yield put(goToNextStep());
            } else {
                const err: any = new Error('Ideal postcodes responded with an error');
                err.code = address.code;
                throw err;
            }
        } catch (err) {
            yield put(stopSubmit(POSTCODE_FORM, {_error: err.message}));
            yield put(setIsLoading(false));
        }
    }
}

function* addressFlow(policyId: string) {
    let currentUser = yield select(getUser);

    while (true) {
        const {cancelSubmit, submit} = yield race({
            cancelSubmit: take(CANCEL_SUBMIT_ADDRESS),
            submit: take(SUBMIT_ADDRESS),
        })

        if (cancelSubmit) {
            yield put(goToPrevStep());
            return;
        } else if (submit) {
            yield put(setIsLoading(true));
            try {
                const address = yield select(getAddress);
                const addressId = yield select(getUserAddressId);
                console.log(addressId);
                const body = mapAddressBeforeCreateRequest(address);
                const { user } = yield createAddress(currentUser.id, CREATE_ADDRESS, Object.assign({}, body, {id: addressId}));

                if (user && user.addresses.length) {
                    yield put(setAddressToPolicyQuote(policyId, user.addresses[0]));
                }
            } catch (err) {
                yield put(setAddressSubmitError(err.message));  
                yield put(setIsLoading(false));
                continue;
            }
            yield put(setIsLoading(false));
            yield put(setAddressSubmitError(null));       
            yield put(push(`/app/dashboard/motor/${policyId}/quote`))
        }
    }
}

function* addressStepsWorker(policyId: number) {
    while (true) {
        const currentStep = yield select(getCurrentStep);
        const workers: any[] = [];

        switch (currentStep) {
            case 1: {
                const worker = yield fork(postcodeFlow);
                workers.push(worker);
                break;
            }
            case 2: {
                const worker = yield fork(addressFlow, policyId);
                workers.push(worker);
                break;
            }
            default:
                break;
        }

        yield take(isChangeStepAction);
        yield put(setIsLoading(false));
        yield workers.map(w => cancel(w));
    }
}

export function* addressStepsFlow(policyId: number) {
    yield put(setSteps([1, 2]));

    const currentStep = yield select(getCurrentStep);
    const policyQuote = yield select(getPolicyQuote, policyId );

    if (policyQuote && policyQuote.address && currentStep === 1) {
        yield put(setIsLoading(true));

        const address = yield lookupPostCode(policyQuote.address.postcode);

        if (address.code === 2000) {
            yield put(setAddress(address.result[0]));
            yield put(goToNextStep());
        }

        yield put(setIsLoading(false));
    }

    const worker = yield fork(addressStepsWorker, policyId);
    yield take(LOCATION_CHANGE);
    yield put(clearStep());
    yield put(deletePostCode());
    yield put(setIsLoading(false));
    yield cancel(worker);
}