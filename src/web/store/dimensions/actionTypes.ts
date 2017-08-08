export interface UpdateDimensions {
  type: 'dimensions/UPDATE_DIMENSIONS'
  width: number
  height: number
}

export interface SubscribeDimensions {
  type: 'dimensions/SUBSCRIBE_DIMENSIONS'
}

export type DimensionAction = UpdateDimensions | SubscribeDimensions
