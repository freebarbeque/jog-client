// Base
export type Gender = 'male' | 'female'
export type QuoteRequestStatus = 'complete' | 'incomplete' | 'pending'
export type HandDrive = 'right' | 'left'
export type Alarm = 'none' | 'cat1' | 'cat2' | 'other'

export interface IVehicleModification {
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
export interface ICar {
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
  modifications: IVehicleModification[]
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

export interface IMotoringIncident {
  date: string
  type: keyof typeof MotoringIncidentTypes
  noClaimsDamage: boolean
}

export interface IMotoringConviction {
  date: string
  dvlaOffenceCode: string
  points: number
  finePaid: number | null
  bannedMonths: number | null
}

export interface IPerson {
  id: string
  firstName: string
  lastName: string
  gender: Gender
  dob: string
  motoring?: {
    convictions?: IMotoringConviction[]
    incidents?: IMotoringIncident[]
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
  address?: IAddress
}

export interface IAddress {
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

export interface IBaseQuestionDescriptor<T> {
  id: string
  type: any
  questionText: string
  hint?: string
  validate?: (answer: T) => string | null
  defaultValue?: T | (() => T)
  required?: boolean
}

// tslint:disable-next-line:no-empty-interface
export interface INullableBaseQuestionDescriptor<T>
  extends IBaseQuestionDescriptor<T | null> {}

export interface ITextQuestionDescriptor
  extends IBaseQuestionDescriptor<string> {
  type: 'text'
  minLength?: number
  maxLength?: number
}

export interface INullableTextQuestionDescriptor
  extends INullableBaseQuestionDescriptor<string> {
  type: 'nullable-text'
  minLength?: number
  maxLength?: number
}

export interface IDateQuestionDescriptor extends IBaseQuestionDescriptor<Date> {
  type: 'date'
}

export interface INullableDateQuestionDescriptor
  extends INullableBaseQuestionDescriptor<Date> {
  type: 'nullable-date'
}

export interface INumericQuestionDescriptor
  extends IBaseQuestionDescriptor<number> {
  type: 'numeric'
}

export interface ISelectQuestionDescriptor<T>
  extends IBaseQuestionDescriptor<T> {
  type: 'select'
  options: Array<{ label: string; value: T }>
}

export interface INullableSelectQuestionDescriptor<T>
  extends INullableBaseQuestionDescriptor<T> {
  type: 'nullable-select'
  options: Array<{ label: string; value: T }>
}

export interface IMultiSelectQuestionDescriptor<T>
  extends IBaseQuestionDescriptor<T[]> {
  type: 'multiselect'
  options: Array<{ label: string; value: T }>
}

export interface IBooleanDependentQuestionDescriptor<
  T extends IBaseQuestionDescriptor<any>
> extends IBaseQuestionDescriptor<boolean> {
  type: 'boolean-dependent'
  dependentQuestions: T[]
  reverse?: boolean
}

export interface IBooleanQuestionDescriptor
  extends IBaseQuestionDescriptor<boolean> {
  type: 'boolean'
}

export interface INullableBooleanQuestionDescriptor
  extends INullableBaseQuestionDescriptor<boolean> {
  type: 'nullable-boolean'
}

export type BasicQuestion =
  | ITextQuestionDescriptor
  | INullableTextQuestionDescriptor
  | INumericQuestionDescriptor
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
  motoringConvictions?: IMotoringConviction[]
  motoringIncidents?: IMotoringIncident[]
  noClaimsDiscount?: number
  startDate?: Date
  status?: 'incomplete' | 'pending' | 'complete'
}

export interface IValidationErrors {
  nonField: string[]
  field: { [questionId: string]: string }
  hasError: boolean
}
