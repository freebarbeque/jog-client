// @flow

// https://firebase.google.com/docs/reference/js/firebase.User
export type User = {
  displayName: string | null,
  email: string | null,
  emailVerified: boolean,
  isAnonymous: boolean,
  photoURL: string | null,
  providerId: 'facebook.com' | 'google.com',
  refreshToken: string,
  uid: string,
}
