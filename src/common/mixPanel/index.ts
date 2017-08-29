import { Buffer } from 'buffer'

// Mixpanel Service Constants
const MIXPANEL_BASE_ENDPOINT = 'https://api.mixpanel.com'
const MIXPANEL_TRACK_ENDPOINT = '/track'
const MIXPANEL_ENGAGE_ENDPOINT = '/engage'

let token
let distinctId

const sendMixpanelRequest = (endpoint, data) => {
  const requestDataString = JSON.stringify(data)
  const requestDataBase64String = new Buffer(requestDataString).toString(
    'base64',
  )

  const requestUrl = `${MIXPANEL_BASE_ENDPOINT}${endpoint}?ip=1`
  return fetch(`${requestUrl}&data=${requestDataBase64String}`, {
    method: 'GET',
  })
}

export const trackInMixPanel = (event, properties) => {
  if (!token) {
    throw new Error('token not set')
  }
  return sendMixpanelRequest(MIXPANEL_TRACK_ENDPOINT, {
    event,
    properties: { distinct_id: distinctId, ...properties, token },
  })
}

export const addUserInfoInMixPanel = properties => {
  if (!token) {
    throw new Error('token not set')
  }
  return sendMixpanelRequest(MIXPANEL_ENGAGE_ENDPOINT, {
    $token: token,
    $distinct_id: distinctId,
    ...properties,
  })
}

export const setMixPanelToken = mixPanelToken => {
  token = mixPanelToken
}

export const setDistinctId = id => {
  distinctId = id
}
