// @flow

// Base

export type Gender = 'male' | 'female'
export type QuoteRequestStatus = 'complete' | 'incomplete' | 'pending'

// Models

export type Car = {
  registration: string,
  model: string,
  make: string,
  value: number,
  dateRegistered?: string,
  imported: boolean,
}

export const MotoringIncidentTypes = {
  accident: 'Accident',
  theft: 'Theft',
  windscreen: 'Windscreen/Glass',
  misc: 'Misc/Unknown',
  water: 'Storm/Flood Damage',
  vandalism: 'Vandalism',
}

export type MotoringIncident = {
  date: string,
  type: $Keys<typeof MotoringIncidentTypes>,
  noClaimsDamage: boolean,
}

export type MotoringConviction = {
  date: string,
  dvlaOffenceCode: string,
  points: number,
  finePaid: number | null,
  bannedMonths: number | null,
}

export type Person = {
  id: string,
  firstName: string,
  middleNames?: string,
  lastName: string,
  gender: Gender,
  dob: string,
  motoring?: {
    convictions?: MotoringConviction[],
    incidents?: MotoringIncident[],
    licenseNumber?: string,
    car?: {
      noClaims?: number,
      yearsDriving?: number,
    },
    motorcycle?: {
      noClaims?: number,
      yearsDriving?: number,
    },
  },
  address: Address,
}

export interface Address {
  id: string,
  name: string,
  firstLine: string,
  city: string,
  postCode: string,
  houseType?: 'semi-detached' | 'detached' | 'terrace',
  floors?: number,
  numBedrooms?: number,
  /* ... */
}

// Questions

export interface BaseQuestionDescriptor<T> {
  id: string,
  type: *,
  questionText: string,
  validate?: (answer: T) => string | null,
  defaultValue?: () => T,
  required?: boolean,
}

export interface NullableBaseQuestionDescriptor<T>
  extends BaseQuestionDescriptor<T | null> {}

export interface TextQuestionDescriptor extends BaseQuestionDescriptor<string> {
  type: 'text',
  minLength?: number,
  maxLength?: number,
}

export interface NullableTextQuestionDescriptor
  extends NullableBaseQuestionDescriptor<string> {
  type: 'nullable-text',
  minLength?: number,
  maxLength?: number,
}

export interface DateQuestionDescriptor extends BaseQuestionDescriptor<Date> {
  type: 'date',
}

export interface NullableDateQuestionDescriptor
  extends NullableBaseQuestionDescriptor<Date> {
  type: 'nullable-date',
}

export interface NumericQuestionDescriptor
  extends BaseQuestionDescriptor<number> {
  type: 'numeric',
}

export interface SelectQuestionDescriptor<T> extends BaseQuestionDescriptor<T> {
  type: 'select',
  options: { label: string, value: T }[],
}

export interface NullableSelectQuestionDescriptor<T>
  extends NullableBaseQuestionDescriptor<T> {
  type: 'nullable-select',
  options: { label: string, value: T }[],
}

export interface MultiSelectQuestionDescriptor<T>
  extends BaseQuestionDescriptor<T[]> {
  type: 'multiselect',
  options: { label: string, value: T }[],
}

export interface BooleanQuestionDescriptor
  extends BaseQuestionDescriptor<boolean> {
  type: 'boolean',
  dependentQuestions?: BaseQuestionDescriptor<any>[],
}

export interface NullableBooleanQuestionDescriptor
  extends NullableBaseQuestionDescriptor<boolean> {
  type: 'nullable-boolean',
}

// Firebase

export type Answer = {
  questionId: string,
  answer: mixed,
  dateAnswered: string,
}

export interface QuoteRequest {
  id: string,
  date: string,
  type: *,
  answers: { [questionId: string]: Answer },
}

export interface MotorQuoteRequest extends QuoteRequest {
  type: 'car',
  // Rather than using a relation reference to drivers & addresses we set them in stone so as not to break old quotes if the address or driver changes.
  mainDriver: Person,
  drivers: Person[],
  address: Address,
  status: QuoteRequestStatus,
  /* ... */
}

export type ValidationErrors = {
  nonField: string[],
  field: { [questionId: string]: string },
  hasError: boolean,
}
