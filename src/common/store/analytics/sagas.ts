import { call, takeEvery } from 'redux-saga/effects'
import { trackInMixPanel } from '~/common/mixpanel'

function* routerLocationChange(action) {
  yield call(() => trackInMixPanel(action.payload.pathname, action.payload))
}

export default function* saga() {
  yield takeEvery('@@router/LOCATION_CHANGE', routerLocationChange)
}
