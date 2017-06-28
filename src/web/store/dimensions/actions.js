export function updateDimensions(width: number, height: number) {
  return {
    width,
    height,
    type: 'dimensions/UPDATE_DIMENSIONS',
  }
}

export function subscribeDimensions() {
  return {
    type: 'dimensions/SUBSCRIBE_DIMENSIONS',
  }
}
