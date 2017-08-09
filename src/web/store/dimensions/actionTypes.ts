export interface IUpdateDimensions {
  type: 'dimensions/UPDATE_DIMENSIONS'
  width: number
  height: number
}

export interface ISubscribeDimensions {
  type: 'dimensions/SUBSCRIBE_DIMENSIONS'
}

export type DimensionAction = IUpdateDimensions | ISubscribeDimensions
