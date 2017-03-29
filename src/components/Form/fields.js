/*
Common form fields used throughout the jog app.
Fields encapsulate text input properties and validation.

@flow
 */

import type { FormField } from 'jog/src/types'

import { emailValidator } from 'jog/src/screens/validators'

export const emailField : FormField = {
  inputProps: {
    autoCapitalize: 'none',
    autoCorrect: false,
    blurOnSubmit: true,
    keyboardType: 'email-address',
  },
  label: 'email',
  key: 'email',
  validate: emailValidator
}

export const passwordField : FormField = {
  inputProps: {
    secureTextEntry: true,
    blurOnSubmit: true,
  },
  label: 'password',
  key: 'password',
  validate: (p) => {
    if (!p || !p.length) {
      return 'Please enter a valid password'
    }
    return null
  }
}

export const validatedPasswordField = {
  ...passwordField,
  validate: (password: string) => password && password.length >= 8 ? null : 'Must be at least 8 characters long'
}

export const nameField : FormField = {
  inputProps: {
    autoCapitalize: 'none',
    autoCorrect: false,
    blurOnSubmit: true
  },
  label: 'full name',
  key: 'name',
  validate: (name: string) => name ? null : 'Please enter your name'
}
