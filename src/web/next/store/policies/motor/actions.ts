// import api, { API_CALL_ACTION } from 'src/web/next/api';
// import Schema from 'src/web/next/schema';
// import PolicyType from 'src/web/model/PolicyType';
//
// import {
//     POLICIES_FETCH_STARTED,
//     POLICIES_FETCH_FINISHED,
//     POLICIES_FETCH_FAILED,
// } from './constants';
//
// export function loadPolicies() {
//     return async (dispatch, getState) => {
//         const currentUser = getState().nextStore.auth.currentUser;
//
//         dispatch({
//             type: API_CALL_ACTION,
//             payload: {
//                 effects: [POLICIES_FETCH_STARTED, POLICIES_FETCH_FINISHED, POLICIES_FETCH_FAILED],
//                 executor: () => api.getPolicies(PolicyType.Motor, currentUser.id),
//                 schema: Schema.MOTOR_POLICY_ARRAY,
//             },
//         });
//     }
// }