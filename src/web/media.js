import { css } from 'styled-components'

// https://material.io/guidelines/layout/responsive-ui.html#responsive-ui-breakpoints
export const breakpoints = {
  smallHandset: 0,
  mediumHandset: 360,
  largeHandset: 400,
  extraLargeHandset: 480,
  smallTablet: 600,
  largeTablet: 720,
  extraLargeTablet: 840,
  smallDesktop: 960,
  mediumDesktop: 1024,
  largeDesktop: 1280,
  extraLargeDesktop: 1440,
  verylargeDesktop: 1600,
  hugeDesktop: 1920,
}

function buildMinMedia(breakpoint, args) {
  return css`
    @media (min-width: ${breakpoint}px) {
      ${css(...args)}
    }
  `
}

function buildMaxmedia(breakpoint, args) {
  return css`
    @media (max-width: ${breakpoint - 1}px) {
      ${css(...args)}
    }
  `
}

export const min = {
  // language=SCSS prefix=dummy{ suffix=}
  mediumHandset: (...args) => buildMinMedia(breakpoints.mediumHandset, args),
  largeHandset: (...args) => buildMinMedia(breakpoints.largeHandset, args),
  extraLargeHandset: (...args) =>
    buildMinMedia(breakpoints.extraLargeHandset, args),
  smallTablet: (...args) => buildMinMedia(breakpoints.smallTablet, args),
  largeTablet: (...args) => buildMinMedia(breakpoints.largeTablet, args),
  extraLargeTablet: (...args) =>
    buildMinMedia(breakpoints.extraLargeTablet, args),
  smallDesktop: (...args) => buildMinMedia(breakpoints.smallDesktop, args),
  mediumDesktop: (...args) => buildMinMedia(breakpoints.mediumDesktop, args),
  largeDesktop: (...args) => buildMinMedia(breakpoints.largeDesktop, args),
  extraLargeDesktop: (...args) =>
    buildMinMedia(breakpoints.extraLargeDesktop, args),
  verylargeDesktop: (...args) =>
    buildMinMedia(breakpoints.verylargeDesktop, args),
  hugeDesktop: (...args) => buildMinMedia(breakpoints.hugeDesktop, args),
}

export const max = {
  // language=SCSS prefix=dummy{ suffix=}
  mediumHandset: (...args) => buildMaxmedia(breakpoints.mediumHandset, args),
  largeHandset: (...args) => buildMaxmedia(breakpoints.largeHandset, args),
  extraLargeHandset: (...args) =>
    buildMaxmedia(breakpoints.extraLargeHandset, args),
  smallTablet: (...args) => buildMaxmedia(breakpoints.smallTablet, args),
  largeTablet: (...args) => buildMaxmedia(breakpoints.largeTablet, args),
  extraLargeTablet: (...args) =>
    buildMaxmedia(breakpoints.extraLargeTablet, args),
  smallDesktop: (...args) => buildMaxmedia(breakpoints.smallDesktop, args),
  mediumDesktop: (...args) => buildMaxmedia(breakpoints.mediumDesktop, args),
  largeDesktop: (...args) => buildMaxmedia(breakpoints.largeDesktop, args),
  extraLargeDesktop: (...args) =>
    buildMaxmedia(breakpoints.extraLargeDesktop, args),
  verylargeDesktop: (...args) =>
    buildMaxmedia(breakpoints.verylargeDesktop, args),
  hugeDesktop: (...args) => buildMaxmedia(breakpoints.hugeDesktop, args),
}

export function isHandset(width: number) {
  return width <= breakpoints.extraLargeHandset
}

export function isLargeTabletOrGreater(width: number) {
  return width > breakpoints.largeTablet
}
