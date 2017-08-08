// Base
export type Gender = 'male' | 'female'
export type QuoteRequestStatus = 'complete' | 'incomplete' | 'pending'
export type HandDrive = 'right' | 'left'
export type Alarm = 'none' | 'cat1' | 'cat2' | 'other'
export interface VehicleModification {
  category: string
  subcategory: string
}
export type Owner =
  | 'company-director'
  | 'employee'
  | 'employer'
  | 'garage'
  | 'other'
  | 'other-family-member'
  | 'partner'
  | 'civil-partner'
  | 'partner-common-law'
  | 'you'
  | 'son-or-daughter'
  | 'spouse'
  | 'lease-company'
export type IDrivingQualification = 'pass-plus' | 'advanced-driving'
export type DrivingRestriction =
  | 'aware-no-restrictions'
  | 'aware-1-year-restriction'
  | 'aware-2-year-restriction'
  | 'aware-3-year-restriction'
  | 'not-aware'
  | 'advised-not-to-drive-by-doctor'

// Models
export interface Car {
  id: string
  registration: string
  model: string
  make: string
  value: number
  dateRegistered?: string
  imported: boolean
  drive: HandDrive
  numSeats: number
  trackingDevice: boolean
  alarm: Alarm
  modifications: VehicleModification[]
  purchasedDate: Date | null
  owner: Owner
  registeredKeeper: Owner
}

export const MotoringIncidentTypes = {
  accident: 'Accident',
  theft: 'Theft',
  windscreen: 'Windscreen/Glass',
  misc: 'Misc/Unknown',
  water: 'Storm/Flood Damage',
  vandalism: 'Vandalism',
}

export interface MotoringIncident {
  date: string
  type: keyof typeof MotoringIncidentTypes
  noClaimsDamage: boolean
}

export interface MotoringConviction {
  date: string
  dvlaOffenceCode: string
  points: number
  finePaid: number | null
  bannedMonths: number | null
}

export interface Person {
  id: string
  firstName: string
  lastName: string
  gender: Gender
  dob: string
  motoring?: {
    convictions?: MotoringConviction[]
    incidents?: MotoringIncident[]
    licenseNumber?: string
    car?: {
      noClaims?: number
      yearsDriving?: number
    }
    motorcycle?: {
      noClaims?: number
      yearsDriving?: number
    }
  }
  address?: Address
}

export interface Address {
  id: string
  name: string
  firstLine: string
  secondLine?: string
  city: string
  province: string
  postCode: string
  houseType?: 'semi-detached' | 'detached' | 'terrace'
  floors?: number
  numBedrooms?: number
  /* ... */
}

// Questions

export interface BaseQuestionDescriptor<T> {
  id: string
  type: any
  questionText: string
  hint?: string
  validate?: (answer: T) => string | null
  defaultValue?: T | (() => T)
  required?: boolean
}

export interface NullableBaseQuestionDescriptor<T>
  extends BaseQuestionDescriptor<T | null> {}

export interface TextQuestionDescriptor extends BaseQuestionDescriptor<string> {
  type: 'text'
  minLength?: number
  maxLength?: number
}

export interface NullableTextQuestionDescriptor
  extends NullableBaseQuestionDescriptor<string> {
  type: 'nullable-text'
  minLength?: number
  maxLength?: number
}

export interface DateQuestionDescriptor extends BaseQuestionDescriptor<Date> {
  type: 'date'
}

export interface NullableDateQuestionDescriptor
  extends NullableBaseQuestionDescriptor<Date> {
  type: 'nullable-date'
}

export interface NumericQuestionDescriptor
  extends BaseQuestionDescriptor<number> {
  type: 'numeric'
}

export interface SelectQuestionDescriptor<T> extends BaseQuestionDescriptor<T> {
  type: 'select'
  options: Array<{ label: string; value: T }>
}

export interface NullableSelectQuestionDescriptor<T>
  extends NullableBaseQuestionDescriptor<T> {
  type: 'nullable-select'
  options: Array<{ label: string; value: T }>
}

export interface MultiSelectQuestionDescriptor<T>
  extends BaseQuestionDescriptor<T[]> {
  type: 'multiselect'
  options: Array<{ label: string; value: T }>
}

export interface BooleanDependentQuestionDescriptor<
  T extends BaseQuestionDescriptor<any>
> extends BaseQuestionDescriptor<boolean> {
  type: 'boolean-dependent'
  dependentQuestions: T[]
  reverse?: boolean
}

export interface IBooleanQuestionDescriptor
  extends BaseQuestionDescriptor<boolean> {
  type: 'boolean'
}

export interface INullableBooleanQuestionDescriptor
  extends NullableBaseQuestionDescriptor<boolean> {
  type: 'nullable-boolean'
}

export type BasicQuestion =
  | TextQuestionDescriptor
  | NullableTextQuestionDescriptor
  | NumericQuestionDescriptor
  | IBooleanQuestionDescriptor
  | INullableBooleanQuestionDescriptor

// Firebase

export interface IAnswer {
  questionId: string
  answer: any
  dateAnswered: string
}

export interface IQuoteRequest {
  id?: string
  vehicle?: string
  mainDriver?: string
  yearsHeld?: number
  whereLicenseIssued?: string
  transmission?: string
  qualifications?: IDrivingQualification[]
  dvlaAwareMedicalConditions?: DrivingRestriction | null
  otherCars?: string[]
  motoringConvictions?: MotoringConviction[]
  motoringIncidents?: MotoringIncident[]
  noClaimsDiscount?: number
  startDate?: Date
  status?: 'incomplete' | 'pending' | 'complete'
}

export interface IValidationErrors {
  nonField: string[]
  field: { [questionId: string]: string }
  hasError: boolean
}
